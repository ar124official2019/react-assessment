import { createContext } from "react";

export const GithubContext = createContext({
  baseURI: "https://api.github.com",
  apiVersion: "2022-11-28",
  perPage: 50,
});