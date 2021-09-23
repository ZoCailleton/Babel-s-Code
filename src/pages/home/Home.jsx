import { useState } from 'react'
import ListUsers from '../../components/users/ListUsers.jsx'
import Messages from '../../components/chatbox/Messages.jsx'
import Send from '../../components/chatbox/Send'
import Glitch from '../../components/glitch/Glitch.jsx'
import Hitmarker from '../../components/hitmarker/Hitmarker.jsx'
import BandeauName from '../../components/bandeauName/BandeauName'
import Toolbox from '../../components/toolbox/Toolbox.jsx'

const Home = ({ socket, username, setUsername }) => {
    
    const [glitch, setGlitch] = useState(false)
    const [hitmarker, setHitmarker] = useState(false)
    const [mode, setMode] = useState('Normal')

    const [hurt] = useState(new Audio('/assets/audio/hurt-villager.mp3'))

    const glitchAppear = () => {
        setGlitch(true)
        setTimeout(() => {
            setGlitch(false)
        }, 200)
    }

    const hitmarkerAppear = () => {
        hurt.play()
        setHitmarker(true)
        setTimeout(() => {
            setHitmarker(false)
        }, 200)
    }

    return (
        <div className={`${mode === 'Destruction' && 'cursor-sword'} wrapper m-auto px-10 flex`}>

            { socket ? (
                <>
                {glitch && <Glitch />}
                {hitmarker && <Hitmarker />}
                <div className="w-full h-screen pt-10 flex">
                    <div className="hidden md:block md:w-1/2 lg:w-1/4 pr-6">
                        <ListUsers socket={socket} usernameGL={username} />
                        <Toolbox setMode={setMode} />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-3/4">
                        <Messages socket={socket} mode={mode} fnHurtMe={hitmarkerAppear} />
                        <Send glitchAppear={glitchAppear} socket={socket} />
                    </div>
                </div>
                </>
            ) : (
                <div>Not Connected</div>
            )}
        
        </div>
    )
}

export default Home
