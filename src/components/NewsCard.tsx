import { Link } from "react-router-dom";
import { Article } from "../api/types";

export default function NewsCard(props: Article) {
  return (
    <div className="flex gap-5 my-5 rounded">
      <img
        className="grow-0 shrink-0 object-cover h-40 w-40"
        src={props.thumbnail}
        alt={props.title}
      />

      <div className="flex flex-col w-full">
        <span className="text-bold p-1 self-start rounded  border">
          {props.sport.name}
        </span>
        <h3 className="text-lg font-bold">{props.title}</h3>
        <p>{props.summary}</p>
        <div className="mt-auto flex">
          <time className="text-bold p-1 mt-auto self-start font-bold italic">
            {new Date(props.date).toLocaleString()}
          </time>
          <Link to={`/articles/${props.id}`} state={props} className="ml-auto">Read more</Link>
        </div>
      </div>
    </div>
  );
}
