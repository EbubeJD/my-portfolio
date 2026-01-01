import { isMailto } from "../utils/links";

export default function ExternalLink({ href, label }: { href: string; label: string }) {
  const mail = isMailto(href);

  return (
    <a
      className="p-link"
      href={href}
      target={mail ? undefined : "_blank"}
      rel={mail ? undefined : "noreferrer"}
      aria-label={label}
    >
      {label}
    </a>
  );
}
