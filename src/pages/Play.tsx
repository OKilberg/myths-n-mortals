import HexTile, { HexRow } from "../hex/HexTile"
import { defaultGameState } from "../../game-state-model/state/state"
import { useAtom } from "jotai"
import { viewAtom } from "../atoms"
import { IoMdExit } from "react-icons/io";

type Props = {}

export default function Play({ }: Props) {
    const [view, setView] = useAtom(viewAtom)
    const gameState = defaultGameState

    function renderHexTiles(){
        const tiles = gameState.hexGrid.toArray();
        const width = 8
        const height = 8
        const rows = []
        for (let i = 0; i < height; i++){
            const row = []
            while (row.length < width && tiles.length > 0){
                row.push(<HexTile tile={tiles.shift()}/>)
            }
            rows.push(<HexRow offset={i % 2 ? true : false}>{row}</HexRow>)
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
                    {mapToArray(gameState.playerActors).map(actor=><UnitContainer name={actor.hero} hp={14} maxHp={15}/>)}
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
                    {mapToArray(gameState.enemyActors).map(actor=><UnitContainer name={actor.name} hp={22} maxHp={24}/>)}
                </div>
            </section>
            <section className="w-full">
                <div className="bg-zinc-700 flex items-center w-full min-h-[40px]">Action Bar</div>
            </section>
        </main>
    )
}

function UnitContainer({name, hp, maxHp}:{name:string, hp: number, maxHp: number}){
    return (
        <div className="outline outline-grey-300 w-full min-h-[125px]">
            <p>{name}</p>
            <p>{hp}/{maxHp}HP</p>
        </div>
    )
}

function mapToArray(map: Map<any,any>) {
    return Array.from(map.entries()).map(([key, value]) => {
        return value;
    });
}