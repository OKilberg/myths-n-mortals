import './App.scss'
import { useAtom } from 'jotai'
import { gameStateAtom, viewAtom } from './atoms'
import Setup from './pages/Setup'
import Play from './pages/Play'
import { GameStateData, newGameState } from '../game-state-model/models/GameState'

function App() {
  const [view, setView] = useAtom(viewAtom)
  const [gameState, setGameState] = useAtom(gameStateAtom)

  function configureGameState(gameStateData: GameStateData){
    setGameState(newGameState(gameStateData))
    setView('play')
  }


  return (
    <>
      {view === 'setup' ? <Setup configureGameState={configureGameState}/> : null}
      {view === 'play' ? <Play/> : null}
    </>
  )
}

export default App
