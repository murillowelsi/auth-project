import { verify } from "jsonwebtoken";
import { next } from "sucrase/dist/parser/tokenizer";
import jwt from "../config/jwt"

export default async function(req, res, next) {
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).json({error:'Token is missing'})
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await verify(token, jwt.secret);

    const id = decoded.sub;

    req.user = id;

    return next();

  } catch (error) {
    return res.status(401).json({error:'Invalid JWT Token'})
  }
}