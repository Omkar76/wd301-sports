import { Outlet } from "react-router-dom";
import Articles from "./Articles";
import { LiveGames } from "./LiveGames/LiveGames";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl">Live Matches</h2>
      <LiveGames />
      <h2 className="text-2xl">Trending news</h2>
      <Articles />
      <Outlet />
    </div>
  );
}
