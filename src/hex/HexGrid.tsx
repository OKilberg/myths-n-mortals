import { Tile } from '../../game-state-model/types/types'
import { TileSize } from '../atoms'
import HexTile, { HexRow } from './HexTile'
//import { TileSize } from '../atoms'

type Props = {
    tiles: Tile[],
    tileSize: TileSize
}

// For some reason this is bugged and does not render any tiles?

export default function HexGrid({ tiles, tileSize }: Props) {
    
    console.log(tiles,tiles.length)
    function renderHexTiles() {
        //if (!gameState) return;
        //const tiles = hexTiles.toArray();
        if(!tiles) return
        const width = 8
        const height = 8
        const rows = []
        for (let i = 0; i < height; i++) {
            const row = []
            while (row.length < width && tiles.length > 0) {
                const tile = tiles.shift()
                if (tile) row.push(<HexTile key={JSON.stringify(tile)} tile={tile} size={tileSize} />)
            }
            rows.push(<HexRow key={i} offset={i % 2 ? true : false} size={tileSize}>{row}</HexRow>)
        }
        return rows
    }

    if(tiles)return (
        <div className="scale-100">
            {
                renderHexTiles()
            }
        </div>
    )
    else return <></>
}

