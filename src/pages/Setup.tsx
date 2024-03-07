import { useAtom } from "jotai"
import { enemiesAtom, heroesAtom, mapAtom, modeAtom } from "../atoms"
import { EnemyActor, NewEnemyActor, NewPlayerActor, PlayerActor } from "../../game-state-model/actors/actors"

type Props = {}

export default function Setup({ }: Props) {
    const [map, setMap] = useAtom(mapAtom)
    const [mode, setMode] = useAtom(modeAtom)
    const [heroes, setHeroes] = useAtom(heroesAtom)
    const [enemies, setEnemies] = useAtom(enemiesAtom)

    function addHero() {
        const newHero = NewPlayerActor('Myrmidon', 'Player' + (heroes.length + 1))
        setHeroes([...heroes, newHero])
    }

    function addEnemy() {
        const newEnemy = NewEnemyActor('Enemy' + (enemies.length + 1))
        setEnemies([...enemies, newEnemy])
    }

    function removeActorById(id: number, actorArray: PlayerActor[] | EnemyActor[], setActorArray: any) {
        const updatedArray = actorArray.filter(actor => actor.id !== id);
        setActorArray(updatedArray);
    }

    function removeHeroById(id: number) {
        removeActorById(id, heroes, setHeroes);
    }

    function removeEnemyById(id: number) {
        removeActorById(id, enemies, setEnemies);
    }

    return (
        <main className="flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-3xl">Myths & Mortals</h1>
            <h1 className="text-2xl">Setup</h1>
            <section className="flex gap-4 items-center">
                <h3 className="text-xl">Map</h3>
                <RadioButton onChange={setMap} value='rectangle' state={map} />
                <RadioButton onChange={setMap} value='circle' state={map} />
            </section>
            <section className="flex gap-4 items-center">
                <h3 className="text-xl">Mode</h3>
                <RadioButton onChange={setMode} value='standard' state={mode} />
                <RadioButton onChange={setMode} value='freeDraw' state={mode} />
            </section>
            <section className="flex w-1/2 justify-center gap-10">
                <div>
                    <h4>Heroes</h4>
                    <div className="h-[400px] w-[400px] flex flex-col border-2 p-2 gap-2">
                        {heroes.map(hero => <MenuItem label={hero.name} onClick={() => removeHeroById(hero.id)} className="border-green-600" />)}
                        <MenuButton label={'+Add Hero'} onClick={addHero} />
                    </div>
                </div>
                <div>
                    <h4>Enemies</h4>
                    <div className="h-[400px] w-[400px] flex flex-col border-2 p-2 gap-2">
                        {enemies.map(enemy => <MenuItem label={enemy.name} onClick={() => removeEnemyById(enemy.id)} className="border-red-600" />)}
                        <MenuButton label={'+Add Enemy'} onClick={addEnemy} />

                    </div>
                </div>
            </section>
        </main>
    )
}

type RadioButton = {
    onChange: any, value: string, state: string
}

function RadioButton({ onChange, value, state }: RadioButton) {
    return (
        <label>
            {value.toUpperCase()}
            <input onChange={() => onChange(value)} checked={value === state} value={value} type="radio" />
        </label>)
}

const itemBaseStyle = "min-h-[28px] p-2 w-full border-2 hover:bg-zinc-900"

function MenuButton({ label, onClick, className }: { label: string, onClick?: any, className?: string }) {
    const style = [itemBaseStyle, className].join(' ')
    return <button onClick={() => onClick()} className={style}>{label}</button>
}

function MenuItem({ label, onClick, className }: { label: string, onClick?: any, className?: string }) {
    const style = [itemBaseStyle, className].join(' ')
    return <button onClick={() => onClick()} className={style}>{label}</button>
}