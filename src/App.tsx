import './App.css'
import { useAtom } from 'jotai'
import { viewAtom } from './atoms'
import Setup from './pages/Setup'

function App() {
  const [view, setView] = useAtom(viewAtom)

  return (
    <>
      {view === 'setup' ? <Setup/> : null}
    </>
  )
}

export default App
