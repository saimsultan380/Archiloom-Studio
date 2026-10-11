/** PLACEHOLDER wordmarks — not confirmed Archiloom clients. */

export type ClientMark = {
  id: string;
  name: string;
  placeholder: true;
};

export const clients: ClientMark[] = [
  { id: "northline", name: "Northline", placeholder: true },
  { id: "harbor", name: "Harbor & Co", placeholder: true },
  { id: "fieldwork", name: "Fieldwork", placeholder: true },
  { id: "meridian", name: "Meridian", placeholder: true },
  { id: "cedar", name: "Cedar Group", placeholder: true },
  { id: "atelier", name: "Atelier No.", placeholder: true },
  { id: "glassline", name: "Glassline", placeholder: true },
  { id: "westform", name: "Westform", placeholder: true },
  { id: "halden", name: "Halden", placeholder: true },
  { id: "orbit", name: "Orbit AEC", placeholder: true },
  { id: "sable", name: "Sable", placeholder: true },
  { id: "kinship", name: "Kinship", placeholder: true },
];

export const marqueeClients = clients.slice(0, 8);
