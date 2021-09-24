import { useState } from 'react'
import { useHistory } from "react-router-dom"
import './register.scss'

const Register = ({ socket, setUsernameGL }) => {

    const [typing] = useState(new Audio('/assets/audio/typing_key_2.mp3'))

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [goValid, setGoValid] = useState(false)

    const handleRegister = () => {
        if(username !== null & username !== '') {
            socket.emit('setUsername', username)
            socket.emit('getUsers')
            setUsernameGL(username)
            setUsername('')
            history.push('/intro')
        }
    }

    const handleChange = e => {
        e.target.value.length > 0 ? setGoValid(true) : setGoValid(false)
        setUsername(e.target.value)
    }

    const handleWrite = e => {
        if(e.key === 'Enter') {
            handleRegister()
        }
        typing.play()
    }

    return (
        <div>
            <input className="input-login w-full bg-gray-100 px-4 py-3" onChange={handleChange} onKeyDown={handleWrite} value={username} type="text" placeholder="Entrez votre nom..." />
            <input onClick={handleRegister} className={`btn-login ${goValid ? 'active' : ''}`} type="submit" value="Let's go" />
        </div>
    )
}

export default Register
