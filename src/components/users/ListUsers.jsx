import { useState, useEffect } from 'react'
import User from './User'
import './listUsers.scss'

const ListUsers = ({ socket, usernameGL }) => {

    const [users, setUsers] = useState([])
    const [nbAno, setNbAno] = useState(0)

    useEffect(() => {

        const usersListener = (users) => {

            setNbAno(users.filter(function(user) {
                return user.name === 'Anonymous'
            }).length)

            setUsers(users);

        }
        
        const userListener = (user) => {
            if(user.name === 'Anonymous') {
                setNbAno(ano =>  {
                    return ano += 1
                })
            }
            setUsers((prevUsers) => [...prevUsers, user])
        }

        const updateUsername = (newUser) => {
            setUsers((prevUsers) => {
              return prevUsers.map((user) => {
                return user.id === newUser.id ? newUser : user;
              })
            })
        };

        const deleteUserListener = (user) => {
            setUsers((prevUsers) => {
                return prevUsers.filter((currentUser) => currentUser.id !== user.id)
            })
        }

        socket.on('users', usersListener)
        socket.on('updateUsername', updateUsername)

        socket.on('userConnection', userListener)
        socket.on('userDisconnection', deleteUserListener)

        socket.emit('getUsers')
        
    }, [])

    return (
        <>
            <img src="/assets/audio.svg" alt="" />
            <div className="global-username mt-10 flex gap-3">
                <img src="/assets/user.svg" alt=""/> {usernameGL}
            </div>
            <p className="mt-6 heading-list-users">Users online :</p>
            <div className="list-users mt-4">
                <div className="flex flex-col items-end">
                    {users
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter(function(user) {
                            return user.name !== 'Anonymous'
                        })
                        .map((user) => (
                            <User key={user.id} name={user.name} />
                        ))
                    }
                    {nbAno !== 0 && <User name={`Anonymous x${nbAno}`} />}
                </div>
            </div>
        </>
    )
}

export default ListUsers
