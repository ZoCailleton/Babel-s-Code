import './user.scss'

const User = ({ id, name }) => {
    return (
        <div key={id} className="box-user">
            <p>{name}</p>
        </div>
    )
}

export default User
