import Register from '../../components/register/Register'

const Login = ({ socket, username, setUsername }) => {
    
    return (
        <div className="h-screen px-6 flex flex-col justify-center items-center">
            <img style={{ maxWidth: 1000 }} className="w-full" src="/assets/logo.svg" alt="Babel's Code" />
            <h1 className="heading-login mt-12 text-white">Type your pseudo</h1>
            <Register socket={socket} setUsernameGL={setUsername} />
        </div>
    )
}

export default Login
