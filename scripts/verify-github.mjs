const REPOS_URL = process.env.GITHUB_REPOS_URL ?? "https://api.github.com/users/assis402/repos?per_page=100";
const TOPIC_NAME = process.env.GITHUB_TOPIC_NAME ?? "mypage";
const RAW_BASE_URL = process.env.GITHUB_RAW_BASE_URL ?? "https://raw.githubusercontent.com/";
const CUSTOM_PROPERTIES_PATH = process.env.GITHUB_CUSTOM_PROPERTIES_PATH ?? "/master/mypage-props.json";

function headers() {
  const result = {
    Accept: "application/vnd.github+json",
    "User-Agent": "MyPageUI",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    result.Authorization =
      token.startsWith("Basic ") || token.startsWith("Bearer ") || token.startsWith("token ")
        ? token
        : `Bearer ${token}`;
  }

  return result;
}

async function main() {
  const reposResponse = await fetch(REPOS_URL, { headers: headers() });
  if (!reposResponse.ok) {
    throw new Error(`GitHub repos request failed: ${reposResponse.status}`);
  }

  const repos = await reposResponse.json();
  if (!Array.isArray(repos)) {
    throw new Error("GitHub repos response was not a list");
  }

  const portfolio = repos
    .filter((repo) => (repo.topics ?? []).includes(TOPIC_NAME))
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

  if (portfolio.length === 0) {
    throw new Error("No repositories found with the mypage topic");
  }

  const sample = portfolio[0];
  const propsUrl = `${RAW_BASE_URL}${sample.full_name}${CUSTOM_PROPERTIES_PATH}`;
  const propsResponse = await fetch(propsUrl, { headers: headers() });
  if (!propsResponse.ok) {
    throw new Error(`mypage-props.json missing for ${sample.full_name}: ${propsResponse.status}`);
  }

  const propsText = (await propsResponse.text()).replace(/,\s*([}\]])/g, "$1");
  const props = JSON.parse(propsText);
  const dictionary = props.descriptionDictonary ?? props.DescriptionDictonary;

  if (!dictionary || (!dictionary.EN_US && !dictionary["en-US"])) {
    throw new Error("descriptionDictonary is missing English copy");
  }

  console.log(
    JSON.stringify(
      {
        repoCount: repos.length,
        portfolioCount: portfolio.length,
        sample: {
          name: sample.name,
          html_url: sample.html_url,
          created_at: sample.created_at,
          tags: props.tags ?? props.Tags ?? [],
          hasEn: Boolean(dictionary.EN_US ?? dictionary["en-US"]),
          hasPt: Boolean(dictionary.PT_BR ?? dictionary["pt-BR"]),
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
