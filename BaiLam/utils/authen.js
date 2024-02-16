import jwt from "jsonwebtoken";

export const authen = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};
