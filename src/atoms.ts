import { atom } from "jotai";
import { Actor, Enemy, Hero } from "../game-state-model/models/Actor";
import { GameState, TileActorMap, newGameState } from "../game-state-model/models/GameState";
import { HexGridShapes } from "../game-state-model/models/HexGrid";
import {MovementController, newMovementController} from '../game-state-model/controllers/MovementController'

type View = 'setup' | 'play'

export const viewAtom = atom<View>('setup')

export const mapAtom = atom<HexGridShapes>('rectangle')
export const modeAtom = atom('standard')
export const heroesAtom = atom<Hero[]>([])
export const enemiesAtom = atom<Enemy[]>([])
export const gameStateAtom = atom<GameState>(newGameState())
//export const tileActorMapAtom = atom<TileActorMap>((get)=>get(gameStateAtom).gameStateData.tileActorMap)
export const movementControllerAtom = atom<MovementController>((get)=>newMovementController(get(gameStateAtom)))
export const selectedActorAtom = atom<Actor | null>(null)
export const actorsAtom = atom((get)=>get(gameStateAtom).gameStateData.actors)