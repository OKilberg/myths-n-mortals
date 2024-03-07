import { atom } from "jotai";
import { EnemyActor, PlayerActor } from "../game-state-model/actors/actors";

export const viewAtom = atom('setup')

export const mapAtom = atom('rectangle')
export const modeAtom = atom('standard')
export const heroesAtom = atom<PlayerActor[]>([])
export const enemiesAtom = atom<EnemyActor[]>([])