import Error from "./common/Error";
import Loading from "./common/Loading";
import ReactDOM from "react-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useArticle } from "../hooks/useArticle";
import { Article } from "../api/types";
import usePreventScroll from "../hooks/usePreventScroll";

export default function ArticleModal() {
    const placeholderArticle = useLocation().state as Article;
    const {articleId} = useParams();
    const { data: article, isLoading, isError } = useArticle(parseInt(articleId!), placeholderArticle);
    const navigate = useNavigate();
    usePreventScroll();

    if (isError) {
        return <Error />;
    }

    if (isLoading) {
        return <Loading />;
    }

  
    return ReactDOM.createPortal(
        <div
            className="flex justify-center fixed z-10 top-0 bottom-0 left-0 right-0 overflow-scroll"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="rounded text-md relative flex flex-col bg-white max-w-lg m-auto p-5">
                <div className="flex justify-center border-b pb-2">
                    <h2 className="text-2xl font-bold">{placeholderArticle?.title}</h2>
                    <button
                        className="p-2 border ml-auto border-red-500 text-red-500 rounded"
                        onClick={() => navigate("/")}
                    >
                        Close
                    </button>
                </div>
                
                <img src={article?.thumbnail} />
                <p className="mb-2 border-b text-md">{article?.summary}</p>
                <p>{article?.content}</p>
            </div>
        </div>,
        document.getElementById("modal")!
    );
}
