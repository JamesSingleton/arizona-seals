import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { facility } from "./facility";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { page } from "./page";
import { program } from "./program";
import { settings } from "./settings";
import { sponsor } from "./sponsor";
import { sponsorLevel } from "./sponsor-level";
import { staff } from "./staff";

export const singletons = [homePage, blogIndex, settings, footer, navbar];

export const documents = [
  blog,
  page,
  faq,
  staff,
  program,
  sponsor,
  sponsorLevel,
  facility,
  ...singletons,
];
