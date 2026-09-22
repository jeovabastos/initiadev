import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "JBastosDev",
  EMAIL: "jbastos.im@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Astro Nano is a minimal and lightweight blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const STUDY: Metadata = {
  TITLE: "Study",
  DESCRIPTION: "Where I study and what I do."
}

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/jeovabastos"
  }
  // ,
  // { 
  //   NAME: "linkedin",
  //   HREF: "https://www.linkedin.com/in/markhorn-dev",
  // }
];
