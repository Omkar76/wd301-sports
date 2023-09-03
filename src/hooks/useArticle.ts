import { useQuery } from "react-query";
import { articlesFetcher, articleFetcher } from "../api/articles";
import { Article, ArticleDetail } from "../api/types";

export const useArticles = () => useQuery(["articles"], articlesFetcher);

export const useArticle = (articleId : Article['id'], placeholderArticleData : Article) =>{
    return useQuery(["articles", articleId], () => articleFetcher(articleId),
    {
        placeholderData : placeholderArticleData as ArticleDetail
    });
}