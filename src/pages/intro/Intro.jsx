import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, TimelineLite } from 'gsap/all'
import Glitch from '../../components/glitch/Glitch'
import './intro.scss'

const Intro = ({ username, fnAudio }) => {

    const [glitchAudio] = useState(new Audio('/assets/audio/destruction.mp3'))
    const [glitch, setGlitch] = useState(false)

    const spanRef = useRef()

    useEffect(() => {
        
        glitchAudio.play()

        setGlitch(true)
        setTimeout(() => {
            setGlitch(false)
        }, 100)
        
        setInterval(() => {
            setGlitch(true)
            setTimeout(() => {
                setGlitch(false)
            }, 100)
        }, 8000)

        fnAudio()

    }, [])

    return (
        <>
            {glitch && <Glitch />}
            <div className="h-screen px-10 flex flex-col justify-center items-center text-white">
                <img style={{ maxWidth: 1000 }} className="w-full" src="/assets/logo.svg" alt="Babel's Code" />
                <h1 className="heading-intro">Welcome <span ref={spanRef}>{username}</span></h1>
                <p className="sentence-intro flex items-center gap-4"><img className="h-4" src="/assets/terminal.svg" alt="" /> It's time to unlock the universe's secret...</p>
                <p className="sentence-intro flex items-center gap-4"><img className="h-4" src="/assets/terminal.svg" alt="" /> Don't be afraid to lose your mind...</p>
                <Link className="btn-intro" to="/general"><img src="/assets/user.svg" alt=""/> Got it</Link>
            </div>
        </>
    )
}

export default Intro
