// Single source of truth for the campuses CampusLine covers. Add a campus
// here (and its NOTIFY_EMAIL_* env var, see .env.example) and it shows up
// in the form and gets routed automatically — no other file needs to change.

export type Campus = "Ikeja" | "Ojo" | "Epe";

export const CAMPUSES: { value: Campus; label: string; envVar: string }[] = [
  { value: "Ojo", label: "Ojo (Main Campus)", envVar: "NOTIFY_EMAIL_OJO" },
  { value: "Ikeja", label: "Ikeja", envVar: "NOTIFY_EMAIL_IKEJA" },
  { value: "Epe", label: "Epe", envVar: "NOTIFY_EMAIL_EPE" },
];
