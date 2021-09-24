import { useState } from 'react'
import { motion } from 'framer-motion'
import './message.scss'

interface Props {
    value: string,
    auteur: string,
    date: Date,
    fromClient?: boolean,
    mode: string,
    fnHurt: () => void,
    fnDestruction: () => void
}

const Message = ({value, auteur, fromClient, mode, fnHurt, fnDestruction}: Props): JSX.Element => {

    const [lifepoints, setLifepoints] = useState(3)
    const [animHurt, setAnimHurt] = useState(false)

    const hit = () => {
        if(mode === 'Destruction') {
            if(lifepoints >= 1) {
                setLifepoints(lp =>  {
                    return lp -= 1
                })
            }
            if(lifepoints === 1) {
                fnDestruction()
            } else {
                fnHurt()
                setAnimHurt(true)
                setTimeout(() => {
                    setAnimHurt(false)
                }, 1000)
            }
        }
    }

    return (
        <motion.div onClick={hit} drag={mode === 'Chaos'} className={`box-message ${lifepoints === 0 ? 'disabled' : ''} ${fromClient ? 'fromClient' : ''} ${animHurt ? 'hit' : ''}`}>
            <img className="glitch" src="/assets/glitch-message.svg" alt=""/>
            <div className={`flex flex-col ${fromClient ? 'items-end' : 'items-start'}`}>
                <div className="box-auteur-message">
                    <p>{auteur} :</p>
                    <div className="px-4 flex items-center gap-2">
                        {lifepoints >= 1 ? <img src="/assets/heart-full.svg" alt="" /> : <img src="/assets/heart-empty.svg" alt="" />}
                        {lifepoints >= 2 ? <img src="/assets/heart-full.svg" alt="" /> : <img src="/assets/heart-empty.svg" alt="" />}
                        {lifepoints === 3 ? <img src="/assets/heart-full.svg" alt="" /> : <img src="/assets/heart-empty.svg" alt="" />}
                    </div>
                </div>
                <p className="box-content-message">{value}</p>
                {fromClient && <div>
                    <div className="eye"></div>
                </div>}
            </div>
        </motion.div>
    )
}

Message.defaultProps = {
    fromClient: true
}

export default Message
