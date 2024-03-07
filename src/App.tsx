import './App.scss'
import { useAtom } from 'jotai'
import { viewAtom } from './atoms'
import Setup from './pages/Setup'
import Play from './pages/Play'

function App() {
  const [view, setView] = useAtom(viewAtom)

  return (
    <>
      {view === 'setup' ? <Setup/> : null}
      {view === 'play' ? <Play/> : null}
    </>
  )
}

export default App
