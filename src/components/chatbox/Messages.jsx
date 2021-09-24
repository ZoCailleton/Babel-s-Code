import { useState, useEffect, useRef } from 'react';
import Message from '../message/Message'
import { decrypt } from 'react-crypt-gsm'
import './messages.scss'

const Messages = ({ socket, mode, fnHurtMe }) => {

    const box = useRef(0);

    const messagesEndRef = useRef(null)

    const [messages, setMessages] = useState({})

    const [destruction] = useState(new Audio('/assets/audio/destruction.mp3'))
    const [hurt] = useState(new Audio('/assets/audio/hurt-villager.mp3'))

    const fnHurt = () => (
        hurt.play()
    )

    const fnDestruction = () => {
        destruction.play()
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {

        const messagesListener = (messages) => {
            const clearedMessages = messages.filter(message => typeof(message.value) === 'string')
            setMessages(clearedMessages)
        }

        const messageListener = (message) => {
            if(typeof(message.value) === 'string') {
                setMessages((prevMessages) => {
                    const newMessages = {...prevMessages}
                    newMessages[message.id] = message
                    return newMessages
                })
            }
        }
        
        socket.on('messages', messagesListener)
        socket.on('message', messageListener)
        socket.emit('getMessages')

    }, [socket]);

    useEffect(scrollToBottom, [messages])

    return (
        <div style={{ maxHeight: '80vh' }} className={`chatbox m-auto pr-4 overflow-x-hidden overflow-y-auto`}>
            {[...Object.values(messages)]
                .sort((a, b) => a.time - b.time)
                .filter((message) => {
                    return message.value.length < 500
                })
                .map((message) => (
                <Message
                    key={message.id}
                    value={message.value}
                    auteur={message.user.name}
                    date={new Date(message.time).toLocaleTimeString()}
                    fromClient={message.user.id === socket.id}
                    mode={mode}
                    fnHurt={() => {message.user.id === socket.id ? fnHurtMe() : fnHurt()}}
                    fnDestruction={fnDestruction}
                />
                ))
            }
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Messages
