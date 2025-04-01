import { randomBytes } from "node:crypto";

export const GenerateRandomCrypto = () => {
  return randomBytes(300).toString("hex").slice(0, 300);
};
