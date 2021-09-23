const BandeauName = ({ usernameGL }) => {

    return (
        <div className="bg-black p-4 flex justify-between items-center text-white">
            <p>Connecté en tant que <span className="font-semibold">{usernameGL === '' ? 'Anonymous' : usernameGL}</span></p>
        </div>
    )
}

export default BandeauName
