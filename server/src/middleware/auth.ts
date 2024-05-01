import jwt from "jsonwebtoken";

const auth = (req: any, res:any, next:any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    //@ts-ignore
    req.locals = verifyToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default auth;