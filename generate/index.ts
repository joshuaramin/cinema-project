import crypto from "node:crypto";

function generateRandomString(length: number) {
  const test = crypto.randomBytes(length).toString("hex");

  console.log(test);
}

generateRandomString(16);
