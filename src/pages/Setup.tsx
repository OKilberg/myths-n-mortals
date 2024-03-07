import { useAtom } from "jotai"
import { mapAtom, modeAtom } from "../atoms"

type Props = {}

export default function Setup({ }: Props) {
    const [map, setMap] = useAtom(mapAtom)
    const [mode, setMode] = useAtom(modeAtom)
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
                    <div className="h-[400px] w-[400px] border-2 p-2">
                        <MenuButton label={'+Add Hero'}/>
                    </div>
                </div>

                <div>
                    <h4>Enemies</h4>
                    <div className="h-[400px] w-[400px] border-2 p-2">
                    <MenuButton label={'+Add Enemy'}/>
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

function MenuButton({label, onClick}:{label: string, onClick?: any}){
    return <button onClick={()=>onClick()} className="min-h-[28px] p-2 w-full border-2 hover:bg-zinc-900">{label}</button>
}