import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import Intro from './pages/intro/Intro.jsx'
import './App.css'

function App() {

  const [intro] = useState(new Audio('/assets/audio/intro.mp3'))
  const [audioGodMode] = useState(new Audio('/assets/audio/waspdance.mp3'))
  const [audioState, setAudioState] = useState(true)

  const [socket, setSocket] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
      //const newSocket = io(`http://localhost:8080`)
      const newSocket = io(`https://whispering-chamber-09886.herokuapp.com`)
      setSocket(newSocket)
      return () => newSocket.close()
  }, [setSocket])
  
  const startAudio = () => {
    intro.play()
  }

  const toggleAudio = () => {
    audioState ? intro.pause() : intro.play()
    setAudioState(!audioState)
  }

  const toggleAudioGodMode = () => {
    intro.pause()
    audioGodMode.play()
  }

  return (
    <Router>
      <Switch>
        <Route path="/general">
          <Home fnToggleAudio={toggleAudio} audioState={audioState} socket={socket} username={username} setUsername={setUsername} fnAudioChaos={toggleAudioGodMode} />
        </Route>
        <Route path="/intro">
          <Intro fnAudio={startAudio} username={username} />
        </Route>
        <Route exact path="/">
          <Login socket={socket} username={username} setUsername={setUsername} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
