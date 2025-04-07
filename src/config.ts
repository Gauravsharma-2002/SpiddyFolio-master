import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "spiderMonk",
  subtitle: "वृद्धौ शिक्षस्व",
  lang: "en-HI",
  themeColor: {
    hue: 250,
    fixed: false,
  },
  banner: {
    enable: true,
    src: "assets/images/banner.png",
    position: "center",
    credit: {
      enable: true,
      text: "राष्ट्रीय राजधानी क्षेत्र / NEW DELHI",
      // url: 'https://www.pixiv.net/en/artworks/111024784' // url to be edited
    },
  },
  toc: {
    enable: true,
    depth: 3,
  },
  favicon: [
    {
      src: "/favicon/favicon.svg",
      theme: "light",
      // sizes: '32x32',
    },
  ],
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    LinkPreset.Friends,
    {
      name: "GitHub",
      url: "https://github.com/Gauravsharma-2002", //
      external: true,
    },
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.png",
  name: "Gaurav Sharma",
  bio: "心之所向，一苇以航。",
  links: [
    {
      name: "GitHub",
      // Visit https://icones.js.org/ for icon codes
      // You will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      icon: "tabler:brand-github",
      url: "https://github.com/Gauravsharma-2002",
    },
    {
      name: "Email",
      icon: "material-symbols:alternate-email",
      url: "https://mail.google.com/mail/?view=cm&to=2140137@sliet.ac.in&su=Say+hi+to+me&body=Whats+on+your+mind",
    },
    {
      name: "Resume Drive",
      icon: "line-md:file-document-minus",
      url: "https://drive.google.com/file/d/1MGxT5GwieXYq40fI9z57gyORgdehfySJ/view", // edit this with  drive link of resume
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  themes: ["catppuccin-latte", "catppuccin-macchiato"],
};
