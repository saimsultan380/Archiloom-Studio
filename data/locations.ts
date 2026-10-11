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
    name: "North America",
    lon: -100,
    lat: 40,
    note: "Residential & Commercial",
  },
  {
    id: "uk",
    name: "United Kingdom",
    lon: -2,
    lat: 54,
    note: "Residential & Commercial",
  },
  {
    id: "me",
    name: "Middle East",
    lon: 45,
    lat: 24,
    note: "Residential & Commercial",
  },
  {
    id: "au",
    name: "Australia",
    lon: 134,
    lat: -25,
    note: "Residential & Commercial",
  },
];

export const routes: Array<[string, string]> = [
  ["na", "uk"],
  ["uk", "me"],
  ["me", "au"],
  ["na", "au"],
];
