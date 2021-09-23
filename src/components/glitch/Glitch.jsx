import './glitch.scss'
import { useEffect } from 'react'
import { useState } from 'react'

const Glitch = () => {

    const [rand, setRand] = useState(1)

    useEffect(() => {
        setRand(Math.floor(Math.random() * 1) + 1)
    }, [])

    return (
        <div className="glitch">
            <img src={`/assets/glitch${rand}.png`} alt="Glitch" />
        </div>
    )
}

export default Glitch
