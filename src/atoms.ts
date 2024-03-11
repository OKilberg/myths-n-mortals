import { atom } from "jotai";
import { Actor, Enemy, Hero } from "../game-state-model/models/Actor";
import { GameState, newGameState } from "../game-state-model/models/GameState";
import { HexGridShapes } from "../game-state-model/models/HexGrid";
import {MovementController, newMovementController} from '../game-state-model/controllers/MovementController'
import { newGameSessionController } from "../game-state-model/controllers/GameSessionController";
import { SingletonLog } from "../game-state-model/models/Log";
import { focusAtom } from "jotai-optics";
import { useLogStore } from "../game-state-model/stores/logStore";

type View = 'setup' | 'play'
export type TileSize = 'small' | 'medium'
export type Cursor = 'standard' | 'default' | 'attack' | 'move' | 'spawn'
let gameState = newGameState()
const gSController = newGameSessionController(gameState.gameStateData.gameSession)
const log = SingletonLog(gSController.getGameSession)

export const cursorStyleAtom = atom<Cursor>('standard')
export const viewAtom = atom<View>('setup')
export const mapAtom = atom<HexGridShapes>('rectangle')
export const tileSizeAtom = atom<TileSize>('medium')
export const modeAtom = atom('standard')
export const heroesAtom = atom<Hero[]>([])
export const enemiesAtom = atom<Enemy[]>([])
export const gameStateAtom = atom<GameState>(gameState)
export const gameSessionControllerAtom = atom(gSController)
export const gameSessionAtom = focusAtom(gameStateAtom, (optic)=>optic.prop('gameStateData').prop('gameSession'))
//export const sessionListenerAtom = atomWithListeners(gSController)
export const logAtom = atom(log)
//export const tileActorMapAtom = atom<TileActorMap>((get)=>get(gameStateAtom).gameStateData.tileActorMap)
//const addActionToLog = useLogStore((state)=>state.addActionToLog)
const {addActionToLog} = useLogStore.getState()
export const movementControllerAtom = atom<MovementController>((get)=>newMovementController(get(gameStateAtom)))
export const selectedActorAtom = atom<Actor | null>(null)
export const actorsAtom = atom((get)=>get(gameStateAtom).gameStateData.actors)