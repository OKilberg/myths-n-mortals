import { ReactNode, useEffect, useState } from 'react'
import '../tile.scss'
import { useAtom } from 'jotai'
import { actorsAtom, movementControllerAtom, selectedActorAtom } from '../atoms'
import { useGameSessionStore } from '../../game-state-model/stores/gameSessionStore'

type Tile = { q: number, r: number }

type Props = {
    tile: Tile,
    size?: string
}

export default function HexTile({ tile, size }: Props) {
    const [mC] = useAtom(movementControllerAtom)
    const [actor, setActor] = useState(mC.getTileActor(tile))
    const [selectedActor, selectActor] = useAtom(selectedActorAtom)
    const [actors] = useAtom(actorsAtom)
    const {round, turn} = useGameSessionStore((state)=>state.gameSession)

    useEffect(() => {
        const fn = () => setActor(mC.getTileActor(tile));
        mC.subscribe(fn)
        return () => mC.unsubscribe(fn)
    }, [])

    function onTileClick() { // Move this logic to controller?
        if (selectedActor && !selectedActor.tile && !actor) {
            const spawn = mC.spawn(selectedActor, tile, round, turn)
            selectActor(null)
            setActor(mC.getTileActor(tile))
        }
        else if (!selectedActor && actor) {
            const tileActor = actors.get(actor)
            if (tileActor) selectActor(tileActor)
        }
        else if (selectedActor) {
            const move = mC.move(selectedActor, tile, round, turn)
            selectActor(null)
            setActor(mC.getTileActor(tile))
        }
    }

    //const activeStyle = 'bg-blue-500'
    function activeStyle() {
        if (actor && selectedActor && actor === selectedActor.id) {
            return 'selected'
        }
    }
    const hexSize = size ? `-${size}` : ''

    return (
        <div className={`hex-tile${hexSize} ${activeStyle()}`} onClick={() => onTileClick()} >
            <div className='image' >
                {
                    actor && <img src={actors.get(actor)?.img} />
                }
                {
                    //unit && <img src={unit.image} />
                }
            </div>
            <div className='hex-content'>{coordinatesToString(tile)}</div>
            <div className='upper-triangle'></div>
            <div className='square'>
            </div>
            <div className='lower-triangle'></div>
        </div>
    )
}

export function HexRow({ children, offset, size }: { children: ReactNode[], offset?: boolean, size?: string }) {
    const ml = size ? getRowMl(size) : 'ml-[106px]'
    const offsetStyle = offset ? ml : ''
    const hexSize = size ? `-${size}` : ''
    return (
        <div className={`hex-row${hexSize} ${offsetStyle}`}>{children}</div>

    )
}

function coordinatesToString(tile: Tile | undefined) {
    if (tile === undefined) return ''
    else return (
        `${tile.q},${tile.r}`
    )
}

function getRowMl(size: string){
    switch(size){
        case 'small': return 'ml-[53px]'
        case 'medium': return 'ml-[106px]'
    }
}