import { useState, useEffect } from 'react'

const ListUsers = ({ socket }) => {

    const [users, setUsers] = useState({})

    useEffect(() => {

        const usersListener = (users) => {
            setUsers(users);
        }

        const userListener = (user) => {
            setUsers((prevUsers) => {
                const newUsers = { ...prevUsers }
                newUsers[user.id] = user
                return newUsers
            })
        }

        socket.on('users', usersListener)
        socket.on('user', userListener)
        socket.emit('getUsers')
        
    }, [socket])

    return (
        <div className="flex flex-col items-end">
            {[...Object.values(users)]
                .sort((a, b) => b.name - a.name)
                .map((user) => (
                    <div key={user.id} className="py-3 border-b">
                        {user.name}
                    </div>
                ))
            }
        </div>
    )
}

export default ListUsers
