import './GodMode.scss'

const GodMode = ({ setGodMode, fnAudioChaos }) => {

    const handleClick = () => {
        setGodMode(false)
        fnAudioChaos()
    }

    return (
        <div className="w-full h-screen bg-black bg-opacity-75 flex justify-center items-center fixed left-0 top-0 z-50">
            <div className="godMode w-full max-w-xl">
                <p className="message">Congrats ! You have unlocked <span>the chaos mode</span></p>
                <div className="btn-chaos-mode" onClick={handleClick}>&!$%£+/</div></div>
        </div>
    )
}

export default GodMode
