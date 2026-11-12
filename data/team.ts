export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  education?: string;
  experience?: string;
  image?: string;
};

export const team: TeamMember[] = [
  {
    id: "zahid",
    name: "Zahid Naveed",
    designation: "Founder / Design Director",
    education: "Architect & Interior Designer",
    experience: "Middle East Region Lead",
    image: "/team/zahid-naveed.webp",
  },
  {
    id: "umair",
    name: "Umair Akram",
    designation: "Architectural Production Lead",
    education: "Architect, Masters — University of the West of Scotland, UK",
    image: "/team/umair-akram.webp",
  },
  {
    id: "zaigham",
    name: "Zaigham Ali",
    designation: "UK Operations Lead & Revit Team Manager",
    education: "Architect (RIBA Part 2), Masters — Coventry University, UK",
    image: "/team/zaigham-ali.webp",
  },
  {
    id: "hamza",
    name: "Hamza Ali",
    designation: "USA Operations Lead & Revit Team Manager",
    education: "Architect, Masters — University of the West of Scotland, UK",
    image: "/team/hamza-ali.webp",
  },
  {
    id: "adeel",
    name: "Sardar Adeel Faisal",
    designation: "CTO & Digital Operations Lead",
  },
  {
    id: "mubashir",
    name: "Mubashir Hassan",
    designation: "Visualization Team Lead",
    education: "Senior Product Designer / Visualization Specialist",
    experience: "3D, visualization and animation",
  },
  {
    id: "aqeel",
    name: "Aqeel Faisal Kiani",
    designation: "Executive Architectural Designer",
    education: "Architect",
    image: "/team/aqeel-faisal.webp",
  },
];
