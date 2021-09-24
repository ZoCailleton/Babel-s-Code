import { useEffect, useState } from 'react'
import ListUsers from '../../components/users/ListUsers.jsx'
import Messages from '../../components/chatbox/Messages.jsx'
import Send from '../../components/chatbox/Send'
import Glitch from '../../components/glitch/Glitch.jsx'
import GodMode from '../../components/godMode/GodMode.jsx'
import Hitmarker from '../../components/hitmarker/Hitmarker.jsx'
import BandeauName from '../../components/bandeauName/BandeauName'
import Toolbox from '../../components/toolbox/Toolbox.jsx'
import './home.scss'

const Home = ({ socket, username, setUsername, fnToggleAudio, audioState, fnAudioChaos }) => {
    
    const [glitch, setGlitch] = useState(false)
    const [hitmarker, setHitmarker] = useState(false)
    const [mode, setMode] = useState('Normal')
    const [menuOpen, setMenuOpen] = useState(false)
    const [godMode, setGodMode] = useState(true)

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
        <div className={`${mode === 'Destruction' && 'cursor-sword'} ${mode === 'Chaos' && 'cursor-chaos'} wrapper m-auto px-10 flex`}>

            { socket ? (
                <>
                {glitch && <Glitch />}
                {hitmarker && <Hitmarker />}
                {(mode === 'Chaos' && godMode) && <GodMode setGodMode={setGodMode} fnAudioChaos={fnAudioChaos} />}
                <div className="w-full h-screen flex relative">
                    <div className={`menu-side ${menuOpen ? 'active' : ''} w-4/5 h-screen md:w-1/3 lg:w-1/4 bg-black md:bg-transparent pr-6 pt-10`}>
                        <div className="flex justify-between">
                            {audioState ? <img className="toggleAudio" onClick={fnToggleAudio} src="/assets/audio.svg" alt="Couper l'audio" />:<img className="toggleAudio" onClick={fnToggleAudio} src="/assets/audio-off.svg" alt="Rétablir l'audio" />}
                            <img className="icon-burger hidden" onClick={() => setMenuOpen(false)} src="/assets/burger-menu.svg" alt="" />
                        </div>
                        <ListUsers socket={socket} usernameGL={username} mode={mode} />
                        <Toolbox mode={mode} setMode={setMode} />
                    </div>
                    <div className="w-full md:w-2/3 lg:w-3/4 pt-10">
                            <img className="icon-burger h-6 hidden mb-8" onClick={() => setMenuOpen(true)} src="/assets/burger-menu-close.svg" alt="" />
                        <Messages socket={socket} mode={mode} fnHurtMe={hitmarkerAppear} />
                        <Send glitchAppear={glitchAppear} socket={socket} mode={mode} setMode={setMode} />
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
