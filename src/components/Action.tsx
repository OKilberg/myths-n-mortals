import { useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import { Icon } from '@iconify/react';
import { useAtom } from 'jotai';
import { selectedActionAtom } from '../atoms';
import { Ability } from '../../game-state-model/models/Ability';

export type Action = {
    icon: string,
    name: string
}

type Props = {
    action: Ability | Action,
    //onClick: (arg0: any)=>any,
}

export default function Action({ action }: Props) {
    const {icon, name} = action
    const hoverRef = useRef(null)
    const hovering = useHover(hoverRef)
    //const [selected, select] = useState(false)
    const [selectedAction, selectAction] = useAtom(selectedActionAtom)
    const isSelected = ()=> selectedAction?.name === name

    return (
        <div ref={hoverRef} onClick={()=>selectAction(action)} className={`action cursor-pointer rounded-lg  bg-gray-500 h-full w-[80px] flex flex-col justify-center items-center ${isSelected() ? 'border-2 ' : ''}`}>
            <div className='relative'>
                {
                    hovering && <ActionTooltip name={name} description={action.name} />
                }
            </div>
            <Icon className={`${isSelected() ? 'text-black' : ''}`} icon={`game-icons:${icon}`} style={{ fontSize: '48px' }}/>
        </div>
    )
}

type ActionTooltip = {
    name: string,
    description: string
}

function ActionTooltip({name, description}: ActionTooltip) {
    return (
        <div className='action-tooltip absolute -translate-y-[20px] bottom-0 w-[300px] h-[200px] border-4 border-gray-600 bg-opacity-80 bg-[#3f3f46] z-[1000]'>
            <h3 className='font-semibold'>{name}</h3>
            <p>{description}</p>
        </div>
    )

}