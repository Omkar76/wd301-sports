import { Outlet } from "react-router-dom";
import Articles from "./Articles";
import { LiveGames } from "./LiveGames/LiveGames";
import Favorates from "./Favorates";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <h2 className="text-2xl">Live Matches</h2>
        <LiveGames />
      </section>

      <div>
        <h2 className="text-2xl mb-2">Trending news</h2>
        <section className="flex gap-4">
          <Articles />
          <Favorates />
        </section>
      </div>
      <Outlet />
    </div>
  );
}
