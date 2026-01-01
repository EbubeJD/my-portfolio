import type { TimelineKind } from "../data/timeline";

export function kindIcon(kind: TimelineKind) {
  return kind === "work" ? "/icons/line-work.svg" : "/icons/line-school.svg";
}
