const CONTENT = "/content";
const ROOT = "/";

const SPECIALIZATIONS = `${CONTENT}/specializations`;
const COURSES = `${CONTENT}/courses`;

export const ROUTES = {
  ROOT: { title: "Огляд", url: ROOT },
  CONTENT: { title: "Каталог", url: CONTENT },
  SPECIALIZATIONS: { title: "Спеціалізації", url: SPECIALIZATIONS },
  COURSES: { title: "Курси", url: COURSES },
} as const;
