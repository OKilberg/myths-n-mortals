import { atom } from "jotai";
import { Enemy, Hero } from "../game-state-model/models/Actor";
import { GameState, newGameState } from "../game-state-model/models/GameState";
import { HexGridShapes } from "../game-state-model/models/HexGrid";

type View = 'setup' | 'play'

export const viewAtom = atom<View>('setup')

export const mapAtom = atom<HexGridShapes>('rectangle')
export const modeAtom = atom('standard')
export const heroesAtom = atom<Hero[]>([])
export const enemiesAtom = atom<Enemy[]>([])
export const gameStateAtom = atom<GameState>(newGameState())