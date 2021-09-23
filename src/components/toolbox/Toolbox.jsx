const Toolbox = ({setMode}) => {
    return (
        <div className="mt-6 pr-12 flex justify-end gap-6">
            <div onClick={() => setMode('Destruction')}>
                <img className="h-12" src="/assets/sword.svg" alt="" />
            </div>
            <div onClick={() => setMode('Light')}>
                <img className="h-12" src="/assets/light.svg" alt="" />
            </div>
        </div>
    )
}

export default Toolbox
