import { ReactNode, useEffect, useState } from 'react'
import '../tile.scss'
import { useAtom } from 'jotai'
import { actorsAtom, movementControllerAtom, selectedActorAtom } from '../atoms'

type Tile = {q: number, r: number}

type Props = {
    tile: Tile
}

export default function HexTile({tile}: Props) {
    const [mC] = useAtom(movementControllerAtom)
    const [actor, setActor] = useState(mC.getTileActor(tile))
    const [selectedActor, selectActor] = useAtom(selectedActorAtom)
    const [actors] = useAtom(actorsAtom)

    useEffect(()=>{
        const fn = ()=>setActor(mC.getTileActor(tile));
        mC.subscribe(fn)
        return ()=> mC.unsubscribe(fn)
    },[])

    function onTileClick(){
        if(selectedActor && !selectedActor.tile && !actor){
            console.log(selectedActor, tile)
            const spawn = mC.spawn(selectedActor, tile)
            if(spawn) console.log("Spawning ",selectedActor.name," at ",tile)
            else console.log("Spawn failed.")
            console.log("This tile's actor is: ",actor)
            selectActor(null)
            setActor(mC.getTileActor(tile))
        }
        else if(!selectedActor && actor){
            const tileActor = actors.get(actor)
            if(tileActor) selectActor(tileActor)
        }
        else if(selectedActor){
            console.log("Clicked ",tile)
            const move = mC.move(selectedActor, tile)
            if(move) console.log("Moving ",selectedActor.name," to ",tile)
            selectActor(null)
            setActor(mC.getTileActor(tile))
        }
    }

    //const activeStyle = 'bg-blue-500'
    function activeStyle (){
        if(actor && selectedActor && actor === selectedActor.id){
            return 'selected'
        }
    }
  return (
    <div className={`hex-tile ${activeStyle()}`} onClick={()=>onTileClick()} >
            <div className='image' >
                {
                    actor && <img src={'/vite.svg'} />
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

export function HexRow({children, offset}:{children: ReactNode[], offset?: boolean}){
    const offsetStyle = offset ? 'ml-[106px]' : ''
    return (
        <div className={`hex-row ${offsetStyle}`}>{children}</div>
        
    )
}

function coordinatesToString(tile: Tile | undefined){
    if(tile === undefined) return ''
    else return (
        `${tile.q},${tile.r}`
    )
}