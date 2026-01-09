export type TimelineKind = "work" | "education";

export type TimelineItem = {
  kind: TimelineKind;
  title: string;
  org: string;
  date: string;
  bullets: string[];
};

export const TIMELINE: TimelineItem[] = [
  {
    kind: "work",
    title: "Graduate Assistant",
    org: "University of Connecticut",
    date: "September 2025 - Present",
    bullets: [
      "Conducting research on **quantum communication** and multi-basis qubit **measurement analysis**",
      "Supporting 150 students with boolean logic, combinational and sequential circuits",
    ],
  },
  {
    kind: "education",
    title: "M.S. Computer Science",
    org: "University of Connecticut",
    date: "Aug 2025 - present",
    bullets: [
    ],
  },
  {
    kind: "work",
    title: "Junior Developer",
    org: "Transaction Solutions LLC",
    date: "June 2025 - Present",
    bullets: [
      "Developed software in **C#** to process and validate financial statements across **10+ payment processors**",
      "Implemented normalization and verification logic to **standardize data** from a **dozen statement formats**",
      "Used **SQL** databases to store, query, and aggregate **1k+ structured financial records**"
    ],
  },
  {
    kind: "education",
    title: "B.S. Computer Science and Engineering",
    org: "University of Connecticut",
    date: "May 2025",
    bullets: [
      "Minor in Mathematics",
    ],
  },
  {
    kind: "work",
    title: "Undergraduate Teaching Assistant",
    org: "University of Connecticut",
    date: "August 2023 - May 2025",
    bullets: [
      "Supported 200+ students in core CS topics including OOP, data structures, and algorithmic complexity",
    ],
  },
];
