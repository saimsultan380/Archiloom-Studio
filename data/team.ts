export type TeamMember = {
  id: string;
  name: string;
  designation?: string;
  education?: string;
  experience?: string;
  image: string;
};

/** Names and portraits on file. Designation, education and experience stay empty until the studio sends them. */
export const team: TeamMember[] = [
  { id: "zahid", name: "Zahid Naveed", image: "/team/zahid%20naveed.png" },
  { id: "umair", name: "Umair Akram", image: "/team/umair%20akram.png" },
  { id: "hamza", name: "Hamza", image: "/team/hamza.png" },
];
