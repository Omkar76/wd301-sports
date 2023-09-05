import { useState } from "react";
import { Article, Sport, Team } from "../api/types";
import { useArticles } from "../hooks/useArticle";
import { usePreferences } from "../hooks/usePreferences";
import { useSports } from "../hooks/useSports"
import { useTeams } from "../hooks/useTeams"
import { Link } from "react-router-dom";

export default function Favorates() {
    const { data: sports, } = useSports()
    const { data: teams } = useTeams();
    const { data: article } = useArticles();
    const { data: preferences } = usePreferences();

    const shouldShowSport = (sport : Sport) => {
        if(preferences?.hasPreferences){
            return preferences.favorateSports.some(({id: sportId}) =>  sport.id === sportId);
        }
        return true;
    }
    const shouldShowTeam = (team : Team) => {
        if(preferences?.hasPreferences){
            return preferences.favorateTeams.some(({id : teamId})=>team.id === teamId)
            && team.plays == selectedSport?.name;    
        }
        return team.plays == selectedSport?.name;
    }
    
    const [selectedSport, setSelectedSport] =  useState<Sport>();
    const [selectedTeam, setSelectedTeam] =  useState<Team>();
 
    
    const shouldShowArticle = (article : Article) =>{
        return article.teams.some(({id : teamId}) => selectedTeam?.id === teamId)
                && article.sport.id == selectedSport?.id; 
    }

    return (
        <div className="sticky top-5 w-80 h-auto self-start bg-gray-100 max-h-screen p-2 gap-2 pt-0 bottom-0 overflow-scroll">
            <div className="flex flex-col sticky top-0 bg-inherit pb-2 mx-2">
                <h2 className="text-lg p-2 text-bold shrink-0">Favorates</h2>
                <div className="flex flex-col gap-3">
                    <select name="sports" 
                            className="p-2" 
                            onChange={(e)=>{
                                const sport: Sport = JSON.parse(e.target.value);
                                setSelectedSport(sport);
                                setSelectedTeam(teams?.find((team)=>team.plays == sport.name));
                            }}
                            value={JSON.stringify(selectedSport)}>
                    <option value="" disabled selected>Select Sport</option>
                        {
                            sports?.filter(shouldShowSport).map(sport => {
                                return <option key={sport.id} value={JSON.stringify(sport)} >{sport.name}</option>
                            })
                        }
                    </select>

                    <select name="teams" 
                            className="p-2" 
                            onChange={(e)=>setSelectedTeam(JSON.parse(e.target.value))}
                            value={JSON.stringify(selectedTeam)}>
                    <option value="" disabled selected>Select Team</option>
                        {
                            teams?.filter(shouldShowTeam).map(team => {
                                return <option key={team.id} value={JSON.stringify(team)} selected={team.id ==selectedTeam?.id}>{team.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>

                {article?.filter(shouldShowArticle).map(article => {
                    return <div className="border p-2">
                        <h3 className="text-lg font-bold">{article.title}</h3>
                        <p className="line-clamp-2">{article.summary}</p>
                        <Link to={`/articles/${article.id}`} className="text-center block w-full border border-green-500 text-green-500 p-2">READ MORE</Link>
                    </div>
                })}
        </div>
    )
}
