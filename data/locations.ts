export type StudioLocation = {
  id: string;
  name: string;
  lon: number;
  lat: number;
  note: string;
};

export const locations: StudioLocation[] = [
  {
    id: "na",
    name: "USA & CANADA",
    lon: -115,
    lat: 48,
    note: "",
  },
  {
    id: "uk",
    name: "UK & EUROPE",
    lon: 5,
    lat: 54,
    note: "",
  },
  {
    id: "me",
    name: "MIDDLE EAST",
    lon: 48,
    lat: 25,
    note: "",
  },
  {
    id: "au",
    name: "AUSTRALIA",
    lon: 145,
    lat: -20,
    note: "",
  },
];

export const routes: Array<[string, string]> = [
  ["na", "uk"],
  ["uk", "me"],
  ["me", "au"],
  ["na", "au"],
];
