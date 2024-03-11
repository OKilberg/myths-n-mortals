import { ReactNode, useEffect, useRef, useState } from 'react'
import '../tile.scss'
import { useAtom } from 'jotai'
import { actorsAtom, cursorStyleAtom, movementControllerAtom, selectedActorAtom } from '../atoms'
import { useHover } from 'usehooks-ts'
import { AttackResult, enemyAttack, playerAttack } from '../../game-state-model/actions/action'
import { Enemy, Hero } from '../../game-state-model/models/Actor'
import toast from 'react-hot-toast'

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
    const hoverRef = useRef(null)
    const [cursor, setCursor] = useAtom(cursorStyleAtom)
    const hovering = useHover(hoverRef)

    useEffect(() => {
        const fn = () => setActor(mC.getTileActor(tile));
        mC.subscribe(fn)
        return () => mC.unsubscribe(fn)
    }, [])

    useEffect(()=>{
        if(hovering){
            setActionCursor()
        }
    },[hovering, selectedActor, actor])

    function onTileClick() { // Move this logic to controller?
        if (selectedActor && !selectedActor.tile && !actor) { // Spawn
            const spawn = mC.spawn(selectedActor, tile)
            selectActor(null)
            setActor(mC.getTileActor(tile))
        }
        else if (!selectedActor && actor) { // Select
            const tileActor = actors.get(actor)
            if (tileActor) selectActor(tileActor)
        }
        else if(selectedActor && actor){
            const tileActor = actors.get(actor)
            if(selectedActor?.team !== tileActor?.team){ // Enemy
                if('hero' in selectedActor){
                    const attackResult = playerAttack((selectedActor as Hero), (tileActor as Enemy), (selectedActor as Hero).weapon)
                    //console.log(attackResult.message)
                    attackToast(attackResult)
                    
                    
                }
                else {
                    const attackResult = enemyAttack((selectedActor as Enemy),(tileActor as Hero))
                    //console.log(attackResult.message)
                    attackToast(attackResult)
                }
                
            }
            selectActor(null)
        }
        else if (selectedActor) { // Move
            const move = mC.move(selectedActor, tile)
            selectActor(null)
            setActor(mC.getTileActor(tile))
        }
        setCursor('default')
    }

    function setActionCursor(){
        if(actor){
            const tileActor = actors.get(actor)
            if(selectedActor && selectedActor?.team !== tileActor?.team){
                setCursor('attack')
            }
            else if(selectedActor && selectedActor?.team === tileActor?.team){
                setCursor('default')
            }
            
        }
        else {
            if(selectedActor?.tile){
                setCursor('move')
            }
            else if(selectedActor) {
                setCursor('spawn')
            }
            else {
                setCursor('default')
            }
        }
        
    }

    //const activeStyle = 'bg-blue-500'
    function activeStyle() {
        if (actor && selectedActor && actor === selectedActor.id) {
            return 'selected'
        }
    }
    const hexSize = size ? `-${size}` : ''
    const cursorStyle = getCursorStyle(cursor)


    return (
        <div ref={hoverRef} className={`hex-tile${hexSize} ${activeStyle()} ${cursorStyle}`} onClick={() => onTileClick()} >
            <div className='image' >
                {
                    actor && <img src={actors.get(actor)?.img} />
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

function getCursorStyle(cursor: string){
    switch(cursor){
        case 'default': return ''
        case 'attack': return 'cursor-attack'
        case 'move': return 'cursor-move'
        case 'spawn': return 'cursor-spawn'
    }
}

function attackToast(attackResult: AttackResult){
    if(attackResult.crit){
        toast.success(attackResult.message, {style: {background: 'gold', color: 'black',}})
    }
    else if(attackResult.hit){
        toast.success(attackResult.message, {style: {background: 'green', color: 'black'}})
    }
    else if(attackResult.critMiss){
        toast.error(attackResult.message, {style: {background: 'red', color: 'black'}})
    }
    else {
        toast.error(attackResult.message, {style: {background: 'orangered', color: 'black'}})
    }
}