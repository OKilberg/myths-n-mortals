import HexTile, { HexRow } from "../hex/HexTile"
import { useAtom } from "jotai"
import { gameStateAtom, selectedActorAtom, tileSizeAtom, viewAtom } from "../atoms"
import { IoMdExit } from "react-icons/io";
import { Actor, Hero } from "../../game-state-model/models/Actor";
import { useState } from "react";

type Props = {}

export default function Play({ }: Props) {
    const [view, setView] = useAtom(viewAtom)
    const [gameState] = useAtom(gameStateAtom)
    const [tileSize] = useAtom(tileSizeAtom)
    const [selectedActor, selectActor] = useAtom(selectedActorAtom)

    function renderHexTiles(){
        if(!gameState) return;
        const tiles = gameState.gameStateData.hexGrid.toArray();
        const width = 8
        const height = 8
        const rows = []
        for (let i = 0; i < height; i++){
            const row = []
            while (row.length < width && tiles.length > 0){
                const tile = tiles.shift()
                if(tile) row.push(<HexTile tile={tile} size={tileSize}/>)
            }
            rows.push(<HexRow offset={i % 2 ? true : false} size={tileSize}>{row}</HexRow>)
        }
        return rows
    }

    return (
        <main className="h-screen w-screen flex flex-col items-center  gap-4 p-4">
            <header className="bg-zinc-700 flex items-center w-full min-h-[40px] px-2">
                <button onClick={()=>setView('setup')} className="flex items-center gap-1 text-lg hover:opacity-75 cursor-pointer"><IoMdExit size={24} className="rotate-180 text-red-400"/> Exit</button>
            </header>
            <section className="grid grid-cols-12 w-full h-full max-h-full">
                <div className="outline outline-green-600 w-full h-full flex flex-col items-center col-span-1 px-2">
                    <h2 className="flex border-b-2">Players</h2>
                    {gameState.getHeroes().map(actor=><UnitContainer actor={actor}/>)}
                </div>
                <div className="col-span-10 flex w-full items-start justify-center">
                    <div className="scale-100">
                        {
                            renderHexTiles()
                        }
                    </div>
                    
                </div>
                <div className="outline outline-red-600 w-full h-full flex flex-col items-center col-span-1 px-2">
                    <h2 className="flex border-b-2">Enemies</h2>
                    {gameState.getEnemies().map(actor=><UnitContainer actor={actor}/>)}
                </div>
            </section>
            <section className="w-full">
                <div className="bg-zinc-700 flex items-center w-full min-h-[40px]">Action Bar</div>
            </section>
        </main>
    )
}

function UnitContainer({actor}: {actor: Actor}){
    const {id, name, health, maxHealth, moves, maxMoves} = actor
    const {hero} = actor as Hero
    const [selectedActor, selectActor] = useAtom(selectedActorAtom)

    const selectedStyle = "bg-blue-500"
    const defaultStyle = `outline outline-grey-300 w-full min-h-[125px] ${selectedActor?.id === id && selectedStyle}`
    return (
        <div onClick={()=>selectActor(actor)} className={defaultStyle}>
            {
                hero ? <p>{hero} ({name})</p> : <p>{name} (Enemy{id})</p>
            }
            <p>{health}/{maxHealth}HP</p>
            <p>Moves Left: {maxMoves-moves}</p>
        </div>
    )
}

function mapToArray(map: Map<any,any>) {
    return Array.from(map.entries()).map(([key, value]) => {
        return value;
    });
}