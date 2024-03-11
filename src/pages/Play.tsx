import HexTile, { HexRow } from "../hex/HexTile"
import { useAtom } from "jotai"
import { cursorStyleAtom, gameSessionControllerAtom, gameStateAtom, selectedActorAtom, tileSizeAtom, viewAtom } from "../atoms"
import { IoMdExit } from "react-icons/io";
import { IoPlaySkipForwardCircle } from "react-icons/io5";
import { Actor, Hero } from "../../game-state-model/models/Actor";
import { useGameSessionStore} from '../../game-state-model/stores/gameSessionStore'
import { useLogStore } from "../../game-state-model/stores/logStore";
import { Toaster } from 'react-hot-toast';

type Props = {}

export default function Play({ }: Props) {
    const [view, setView] = useAtom(viewAtom)
    const [gameState] = useAtom(gameStateAtom)
    const [tileSize] = useAtom(tileSizeAtom)
    //const [gSC] = useAtom(gameSessionControllerAtom)
    //const [gameSession] = useAtom(gameSessionAtom)
    const round = useGameSessionStore((state)=>state.gameSession.round)
    const turn = useGameSessionStore((state)=>state.gameSession.turn)
    const endRound = useGameSessionStore((state)=>state.endRound)
    //const [selectedActor, selectActor] = useAtom(selectedActorAtom)
    const logs = useLogStore((state)=>state.logs)
    const [cursor] = useAtom(cursorStyleAtom)

    function renderHexTiles() {
        if (!gameState) return;
        const tiles = gameState.gameStateData.hexGrid.toArray();
        const width = 8
        const height = 8
        const rows = []
        for (let i = 0; i < height; i++) {
            const row = []
            while (row.length < width && tiles.length > 0) {
                const tile = tiles.shift()
                if (tile) row.push(<HexTile tile={tile} size={tileSize} />)
            }
            rows.push(<HexRow offset={i % 2 ? true : false} size={tileSize}>{row}</HexRow>)
        }
        return rows
    }
    const toastOptions = {success: {
        style: {
          background: 'green',
        },
      },
      error: {
        style: {
          background: 'red',
        },
      },
      duration: 5000,
    }

    const mainStyle = "h-screen w-screen flex flex-col items-center  gap-4 p-4"
    const cursorStyle = getCursorStyle(cursor)

    return (
        <main className={`${mainStyle} ${cursorStyle}`}>
            <header className="bg-zinc-700 flex items-center justify-between w-full min-h-[40px] px-2">
                <Toaster position="bottom-right" toastOptions={toastOptions}/>
                <button onClick={() => setView('setup')} className="flex items-center gap-1 text-lg hover:opacity-75 cursor-pointer">
                    <IoMdExit size={24} className="rotate-180 text-red-400" />
                    Exit
                </button>
                <div className="flex gap-4 items-center">
                    <h2 className="text-lg">Round: {round}</h2>
                    <h2 className="text-lg"><b>Turn: {turn}</b></h2>
                    <button className="bg-orange-500 p-1 rounded-md flex items-center px-2 gap-1" onClick={()=>endRound()}>End Round <IoPlaySkipForwardCircle size={24}/> </button>
                </div>
                <div>

                </div>

            </header>
            <section className="grid grid-cols-12 w-full h-full max-h-full">
                <div className="outline outline-green-600 w-full h-full flex flex-col items-center col-span-1 px-2">
                    <h2 className="flex border-b-2">Players</h2>
                    {gameState.getHeroes().map(actor => <UnitContainer actor={actor} />)}
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
                    {gameState.getEnemies().map(actor => <UnitContainer actor={actor} />)}
                </div>
            </section>
            <section className="w-full">
                <div className="bg-zinc-700 flex items-center w-full min-h-[40px]">Action Bar</div>
            </section>
        </main>
    )
}

function UnitContainer({ actor }: { actor: Actor }) {
    const { id, name, health, maxHealth, moves, maxMoves } = actor
    const { hero } = actor as Hero
    const [selectedActor, selectActor] = useAtom(selectedActorAtom)

    const selectedStyle = "bg-blue-500"
    const defaultStyle = `outline outline-grey-300 w-full min-h-[125px] ${selectedActor?.id === id && selectedStyle}`
    return (
        <div onClick={() => selectActor(actor)} className={defaultStyle}>
            {
                hero ? <p>{hero} ({name})</p> : <p>{name} (Enemy{id})</p>
            }
            <p>{health}/{maxHealth}HP</p>
            <p>Moves Left: {maxMoves - moves}</p>
        </div>
    )
}

function getCursorStyle(cursor: string){
    switch(cursor){
        case 'default': return ''
        case 'attack': return 'cursor-attack'
        case 'move': return 'cursor-move'
        case 'spawn': return 'cursor-spawn'
    }
}

function mapToArray(map: Map<any, any>) {
    return Array.from(map.entries()).map(([key, value]) => {
        return value;
    });
}