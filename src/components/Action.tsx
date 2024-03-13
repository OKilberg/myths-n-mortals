import { useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import { Icon } from '@iconify/react';

type Props = {}

export default function Action({ }: Props) {
    const hoverRef = useRef(null)
    const hovering = useHover(hoverRef)
    const [selected, select] = useState(false)

    return (
        <div ref={hoverRef} onClick={()=>select(!selected)} className={`action rounded-lg border-2 border-gray-500 h-full w-[80px] flex flex-col justify-center items-center ${selected ? 'bg-gray-500' : ''}`}>
            <div className='relative'>
                {
                    hovering && <ActionTooltip/>
                }
            </div>
            <Icon className={`${selected ? 'text-black' : ''}`} icon={'game-icons:surrounded-shield'} style={{ fontSize: '48px' }}/>
        </div>
    )
}

function ActionTooltip() {
    return (
        <div className='action-tooltip absolute -translate-y-[20px] bottom-0 w-[300px] h-[200px] border-4 border-gray-600 bg-opacity-80 bg-[#3f3f46] z-[1000]'>
            <h3 className='font-semibold'>Action Name</h3>
            <p>Action Description: This is an action.</p>
        </div>
    )

}