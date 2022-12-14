import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const PRIVATE_KEY = process.env.SECRET_KEY!;

function validateToken(req: Request, res: Response, next: NextFunction) {
  const [, token] = req?.headers?.authorization?.split(" ") || [" ", " "];

  if (!token) {
    return res.status(401).send({
      message: "Acesso negado! Nenhum token fornecido.",
    });
  }

  const payload = jsonwebtoken.verify(token, PRIVATE_KEY);

  const userIdFromToken = typeof payload !== "string" && payload.user;

  if (!userIdFromToken) {
    return res.status(401).send({
      message: "Acesso negado! Token inválido.",
    });
  }

  // req.headers["user"] = userIdFromToken;

  return next();
}

export { validateToken, PRIVATE_KEY };
