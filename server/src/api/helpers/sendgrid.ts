import SG from "@sendgrid/mail";
import { SendGrid } from "../schema/types/index.js";

SG.setApiKey(process.env.SENDGRID_API_KEY);

export const SGMail = async ({
  from,
  html,
  subject,
  to,
  bcc,
  cc,
}: SendGrid) => {
  try {
    await SG.send({
      to,
      from,
      bcc,
      cc,
      subject,
      html,
    });
  } catch (err) {
    console.error(err);
  }
};
