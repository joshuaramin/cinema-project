import slugify from "slugify";

export const Slugify = (text: string) => {
  return slugify.default(text.replace(/:/g, "-"), { lower: true, trim: true });
};
