/** PLACEHOLDER — names and portraits until the client supplies photography. */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  variant: 0 | 1 | 2 | 3;
  placeholder: true;
};

export const team: TeamMember[] = [
  { id: "m1", name: "Avery Cole", role: "Design Director", image: "/team/team-avery.jpg", variant: 0, placeholder: true },
  { id: "m2", name: "Noor Rahman", role: "Project Architect", image: "/team/team-noor.jpg", variant: 1, placeholder: true },
  { id: "m3", name: "Elena Voss", role: "Interior Lead", image: "/team/team-elena.jpg", variant: 2, placeholder: true },
  { id: "m4", name: "Jonas Park", role: "Visualization Lead", image: "/team/team-jonas.jpg", variant: 3, placeholder: true },
];
