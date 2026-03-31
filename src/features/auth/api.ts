import axios from "axios";
import { LoginRequest, User } from "./types";

export const loginUser = async (request: LoginRequest): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (request.username === "admin" && request.password === "parole123") {
    return {
      id: 1,
      username: request.username,
      token: "fake-jwt-token-123",
    };
  }
  throw new Error("Nepareizs lietotājvārds vai parole!");
};
