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

  const [socket, setSocket] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
      //const newSocket = io(`http://localhost:8080`)
      const newSocket = io(`https://whispering-chamber-09886.herokuapp.com`)
      setSocket(newSocket)
      return () => newSocket.close()
  }, [setSocket])

  return (
    <Router>
      <Switch>
        <Route path="/general">
          <Home socket={socket} username={username} setUsername={setUsername} />
        </Route>
        <Route path="/intro">
          <Intro username={username} />
        </Route>
        <Route exact path="/">
          <Login socket={socket} username={username} setUsername={setUsername} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
