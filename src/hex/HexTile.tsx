import { ReactNode } from 'react'
import '../tile.scss'

type Tile = {q: number, r: number}

type Props = {
    tile: Tile | undefined
}

export default function HexTile({tile}: Props) {
  return (
    <div className={'hex-tile'} >
            <div className='image' >
                
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