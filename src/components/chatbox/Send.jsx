import { useState } from 'react'
import { motion } from 'framer-motion'
import { encrypt } from 'react-crypt-gsm'
import './Send.scss'

const Send = ({ glitchAppear, socket, mode, setMode }) => {

    const [message, setMessage] = useState('')

    const [typing] = useState(new Audio('/assets/audio/typing_key_2.mp3'))
    const [send] = useState(new Audio('/assets/audio/send-message.mp3'))
    
    const [nbClick, setNbClick] = useState(0)

    const handleWrite = e => {
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleKeyPress = () => {
        typing.play()
    }

    const handleSubmit = () => {
        if(message !== null && message !== '') {
            socket.emit('message', message)
            //socket.emit('message', encrypt(message).content)
            setMessage('')
            glitchAppear()
            send.play()
        } else {
            if(nbClick === 10) {
                setNbClick(0)
                setMode('Chaos')
            } else {
                setNbClick(nbClick + 1)
            }
        }
    }

    return (
        <motion.div drag={mode === 'Chaos'} dragConstraints={{ left: -700, right: 300, top: -800, bottom: 100 }} className="send-container mt-4">
            <div className="flex">
                <input onChange={e => setMessage(e.target.value)} onKeyPress={handleKeyPress} onKeyDown={handleWrite} className="w-full p-4 border-l border-t border-b" type="text" value={message} placeholder="Votre message..." />
                <input onClick={handleSubmit} className={`${mode === 'Chaos' ? 'active' : ''} btn-send p-4 border cursor-pointer`} type="submit" value=" " />
            </div>
        </motion.div>
    )
}

export default Send
