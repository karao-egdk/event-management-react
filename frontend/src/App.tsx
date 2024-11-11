import './App.css'
import { EventProvider } from './context/EventContext'
import EventManagement from './pages/EventManagement'


function App() {

  return (
    <EventProvider>
      <EventManagement />
    </EventProvider>
  )
}

export default App
