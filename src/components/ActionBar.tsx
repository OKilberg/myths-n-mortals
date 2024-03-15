import { useAtom } from "jotai"
import Action from "./Action"
import { selectedActorAtom } from "../atoms"

type Props = {}

export default function ActionBar({}: Props) {
    const [selectedActor] = useAtom(selectedActorAtom)

  return (
    <div className="action-bar bg-zinc-700 flex flex-row items-center justify-center w-full min-h-[80px] h-[80px] divide-x divide-solid divide-slate-400">
        <div className="standard-actions flex h-full gap-1 pr-1">
             <Action action={{icon:'gladius', name:'Attack'}}/>
             <Action action={{icon:'wingfoot', name:'Move'}}/>
        </div>
        <div className="standard-actions flex h-full gap-1 pl-1">
            {
                selectedActor?.abilityDeck && selectedActor?.abilityDeck.map(ability =><Action action={ability}/>)
            }
        </div>
    </div>
  )
}