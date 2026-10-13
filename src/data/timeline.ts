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
    title: "Analyst Developer",
    org: "Transaction Solutions LLC",
    date: "May 2025 - Present",
    bullets: [
      "Built a rule-based **C#** pipeline to clean and normalize merchant statement data for **SQL Server**, cutting manual prep time by **60%**",
      "Built a client-facing **ASP.NET** dashboard with **Chart.js** visualizations across **4+ report pages**, backed by **T-SQL** stored procedures",
      "Automated multi-sheet Excel reporting with **C#** and **NPOI**, reducing formatting and data-entry errors by **80%**"
    ],
  },
  {
    kind: "education",
    title: "M.S. Computer Science",
    org: "University of Connecticut",
    date: "May 2026",
    bullets: [
    ],
  },
  {
    kind: "work",
    title: "Graduate Assistant",
    org: "University of Connecticut",
    date: "September 2025 - May 2026",
    bullets: [
      "Conducted research on **quantum communication** and multi-basis qubit **measurement analysis**",
      "Supported 150 students with boolean logic, combinational and sequential circuits",
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
    title: "Undergraduate TA",
    org: "University of Connecticut",
    date: "August 2023 - May 2025",
    bullets: [
      "Supported 200+ students in core CS topics including OOP, data structures, and algorithmic complexity",
    ],
  },
];
