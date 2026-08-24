import Image from "next/image";

type CertificationsProps = {
  title: string;
};

export function Certifications({ title }: CertificationsProps) {
  return (
    <div className="about-body-internal-container">
      <div className="mini-sub-title">{title}</div>
      <div className="about-certifications">
        <a
          href="https://www.credly.com/earner/earned/badge/5cbc2b5a-1af3-4063-bcd3-daac3ec79ede"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            Azure Fundamentals
            <br />
            (AZ-900)
          </p>
          <Image src="/images/az900.webp" alt="az900" width={150} height={150} />
        </a>
        <a
          href="https://www.credly.com/earner/earned/badge/c72e321b-57ff-456d-98f0-143ed07bb575"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            Azure Developer Associate
            <br />
            (AZ-204)
          </p>
          <Image src="/images/az204.webp" alt="az204" width={150} height={150} />
        </a>
      </div>
    </div>
  );
}
