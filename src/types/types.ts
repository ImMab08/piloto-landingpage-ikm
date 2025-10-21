// Header
export type HeaderLinks = { href: string; text: string };
export type HeaderContact = {
  icon: "email" | "phone" | "location";
  title: string;
  text: string;
};

// Consulting section
export type StatRaw = {
  icon: "exp" | "money" | "engineers" | "exp2";
  value: string;
  label: string;
};

// Client section
export type Review = {
  text: string;
  author: string;
  location: string;
  stars: number;
};
export type Titles = { text1: string; text2: string };
export type Aria = { prev: string; next: string };

// Página de servicios
// Skills section
export type Card = {
  text: string;
  title: string;
  description: string;
  image?: string;
  gradient?: string;
};


// Página de equipo
// Members
export type Member = {
  name: string;
  role: string;
  image?: string;
};