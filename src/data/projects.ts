export type ProjectLink = {
  github?: string;
  live?: string;
  demo?: string;
  table?: string;
  dataset?: string;
};

export type ProjectImage = {
  src: string; 
  alt: string;
};

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  links?: ProjectLink;
  images?: ProjectImage[];
};

export const PROJECTS: Project[] = [
  {
    title: "Breast Cancer Dashboard",
    subtitle: "Data Visualization Dashboard",
    description: "Interactive **data visualization dashboard** built on the **METABRIC** breast cancer dataset, exploring clinical and genomic features across **~2,000 patient** samples.\nDesigned to support exploratory analysis, pattern discovery, and survival trend investigation.",
    longDescription:
      "",
    tech: ["Python", "Dash", "Plotly", "Data Visualization"],
    links: { github: "https://github.com/EbubeJD/breast-cancer-dashboard", live: "https://breast-cancer-dashboard.up.railway.app/", dataset: "https://www.kaggle.com/datasets/raghadalharbi/breast-cancer-gene-expression-profiles-metabric"},
    images: [
      {
        src: "/images/METABRIC/cover.webp",
        alt: "Breast Cancer Dashboard interface",
      }
    ]
  },
  {
    title: "Cressi",
    subtitle: "AI Research Assistant",
    description: "An **AI research assistant** for ingesting, organizing, and querying PDFs using **retrieval-augmented generation**. Developed with a team as part of an **IBM research challenge** focused on scalable document intelligence and knowledge retrieval systems.",
    longDescription:
      "",
    tech: ["Python","LangChain","Pinecone","Watsonx","RAG"],
    links: { github: "https://github.com/EbubeJD/Cressi", demo:"https://drive.google.com/file/d/1XC_Yn-yg3qY0R6ymKhG8wC082fblWLMB/view?usp=sharing"},
    images: [
      {
        src: "/images/Cressi/Cressi.webp",
        alt: "Cressi AI Research Assistant interface",
      }
    ]
  },
  {
    title: "Reinforcement Learning Traffic Light Manager",
    subtitle: "Traffic Signal Control System",
    description: "Real-time traffic monitoring in **CARLA** using **YOLO** detections and lane mapping to produce lane-level traffic metrics from **simulated intersection scenarios**, informing an **RL-driven traffic light controller** for adaptive signal control.",
    longDescription:
      "",
    tech: ["Python","Carla", "YOLO", "PyTorch", "Reinforcement Learning"],
    links: { github: "https://github.com/EbubeJD/CARLA-Traffic-Lights-Data-Simulation" },
    images: [
      {
        src: "/images/Carla/Carla_map.webp",
        alt: "CARLA simulation map with traffic light intersection",
      },
      {
        src: "/images/Carla/Traffic_View.webp",
        alt: "Traffic view from CARLA simulation",
      },
      {
        src: "/images/Carla/Model.webp",
        alt: "Reinforcement learning model architecture for traffic light control",
      },
    ]
  },
  {
    title: "RC Car Conversion to Web Wi-Fi Control",
    subtitle: "IoT RC Car Project",
    description: "Converted a standard RC car into a Wi-Fi controlled system using a **Raspberry Pi**, with a real-time **web interface** and low-latency command streaming. Implemented a **Flask + SocketIO** backend to support responsive control and client communication.",
    longDescription:
      "",
    tech: ["Python","Flask","SocketIO","Raspberry Pi"],
    links: { github: "https://github.com/EbubeJD/RC-Car-Remodeling" },
    images: [
      {
        src: "/images/Car-Remodeling/Hardware.webp",
        alt: "Hardware components for the RC car conversion",
      },
      {
        src: "/images/Car-Remodeling/Wiring.webp",
        alt: "Wiring diagram for the RC car conversion",
      },
      {
        src: "/images/Car-Remodeling/Processes.webp",
        alt: "Processes diagram for the RC car conversion",
      },
    ]
  },
  {
    title: "Music Spectrogram Genre Classifier",
    subtitle: "Audio Classification System",
    description: "Music genre classification system built by generating **Mel spectrograms** from audio and training a **hybrid model** combining a **CNN** on spectrograms with an **MLP** on extracted audio features.",
    longDescription:
      "",
    tech: ["Python","Tensorflow","Librosa", "Deep Learning"],
    links: { github: "https://github.com/EbubeJD/Music-Classifier"},
    images: [
      {
        src: "/images/Music-Classifier/model.webp",
        alt: "Mel spectrograms of different music genres",
      },
    ]
  },
  {
    title: "Content-Based Anime Recommender",
    subtitle: "Anime Recommendation System",
    description: "Content-based anime recommender built on metadata scraped from **MyAnimeList**, with exploratory data analysis in **Tableau** and a similarity-based recommendation pipeline using **K-means clustering** on anime features.",
    longDescription:
      "",
    tech: ["Python","Tableau","Streamlit","Web Scraping"],
    links: { table: "https://public.tableau.com/views/AnimeAnalysis_17039241146960/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" },
    images: [
      {
        src: "/images/Anime-Recommender/homepage.webp",
        alt: "Content-Based Anime Recommender homepage",
      },
    ]
  },
];
