const INTEGRATION_URL =
  process.env.MEDIUM_INTEGRATION_URL?.trim() || "https://medium-posts.assis402.workers.dev/";

function asRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value;
}

function readValue(record, names) {
  const entries = Object.entries(record);
  for (const name of names) {
    const match = entries.find(([key]) => key.toLowerCase() === name.toLowerCase());
    if (match) return match[1];
  }
  return undefined;
}

function readString(record, names) {
  const value = readValue(record, names);
  return typeof value === "string" ? value : "";
}

function parseCreatedAt(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    const ms = value < 1e12 ? value * 1000 : value;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  if (typeof value === "string" && value.trim()) {
    if (/^\d+$/.test(value.trim())) return parseCreatedAt(Number(value.trim()));
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  return "";
}

function mapPublication(value) {
  const record = asRecord(value);
  if (!record) return null;

  const url = readString(record, ["url", "link"]);
  const title = readString(record, ["title"]);
  if (!url || !title) return null;

  return {
    id: readString(record, ["id"]) || url,
    title,
    description: readString(record, ["description"]),
    imageUrl: readString(record, ["imageUrl", "image_url"]),
    url,
    createdAt: parseCreatedAt(readValue(record, ["createdAt", "created_at"])),
  };
}

function parsePublications(payload) {
  const root = asRecord(payload);
  if (!root) return [];

  const data = asRecord(readValue(root, ["data"])) ?? root;
  const posts = readValue(data, ["posts"]);
  if (!Array.isArray(posts)) return [];

  return posts
    .map(mapPublication)
    .filter(Boolean)
    .sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0))
    .slice(0, 10);
}

function formatPublicationDate(createdAt, locale = "en-US") {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";
  const formatted = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function verifyFixture() {
  const newest = Date.UTC(2024, 7, 15);
  const posts = Array.from({ length: 12 }, (_, index) => ({
    id: `post-${index}`,
    title: `Post ${index}`,
    description: `Description ${index}`,
    imageUrl: `https://example.com/${index}.png`,
    url: `https://medium.com/@assis4002/${index}`,
    createdAt: newest - index * 86_400_000,
  }));

  posts.push({
    Id: "pascal",
    Title: "Pascal Case Post",
    Description: "Legacy serializer shape",
    ImageUrl: "https://example.com/pascal.png",
    Url: "https://medium.com/@assis4002/pascal",
    CreatedAt: newest + 86_400_000,
  });

  const publications = parsePublications({ data: { posts } });
  assert(publications.length === 10, `expected 10 publications, got ${publications.length}`);
  assert(publications[0].id === "pascal", "expected newest post first");
  assert(publications[0].title === "Pascal Case Post", "expected PascalCase fields to map");
  assert(formatPublicationDate(publications[0].createdAt, "en-US") === "August 2024", "expected YearMonth date");
  assert(formatPublicationDate("2024-01-15T00:00:00.000Z", "pt-BR").startsWith("Janeiro"), "expected capitalized pt-BR month");
}

async function verifyLiveFetch() {
  let publications = [];
  let status = 0;

  try {
    const response = await fetch(INTEGRATION_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent": "MyPageUI",
      },
    });
    status = response.status;
    if (response.ok) {
      publications = parsePublications(await response.json());
    }
  } catch {
    publications = [];
  }

  assert(Array.isArray(publications), "live fetch must resolve to an array");
  return { status, count: publications.length, sample: publications[0] ?? null };
}

async function main() {
  verifyFixture();
  const live = await verifyLiveFetch();

  console.log(
    JSON.stringify(
      {
        fixture: "ok",
        live: {
          url: INTEGRATION_URL,
          status: live.status,
          count: live.count,
          sample: live.sample
            ? {
                title: live.sample.title,
                url: live.sample.url,
                createdAt: live.sample.createdAt,
                hasImage: Boolean(live.sample.imageUrl),
              }
            : null,
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
