import jsonwebtoken from "jsonwebtoken";

const { verify } = jsonwebtoken;

const Authorization = (ctx) => {
  const valid = verify(ctx.req.cookies["access_token"], "CMS_TEMPLATE");
  if (valid && ctx.req.headers["x-api-key"] === process.env.X_API_KEY) {
    return true;
  }
};

export default Authorization;
