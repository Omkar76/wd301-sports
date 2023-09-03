import { Article, ArticleDetail } from "./types";
import { API_ENDPOINT } from "../constants";

export const articlesFetcher = async () => {
  const res = await fetch(`${API_ENDPOINT}/articles`);
  return (await res.json()) as Article[];
};

export const articleFetcher = async (articleId: Article["id"] = 1) => {
  const res = await fetch(`${API_ENDPOINT}/articles/${articleId}`);
  return (await res.json()) as ArticleDetail;
};
