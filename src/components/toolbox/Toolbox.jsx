import { motion } from 'framer-motion'

const Toolbox = ({ mode, setMode }) => {
    return (
        <motion.div drag={mode === 'Chaos'} className="mt-6 pr-12 flex justify-end gap-6">
            <div onClick={() => setMode('Destruction')}>
                <img className="h-12" src="/assets/sword.svg" alt="" />
            </div>
        </motion.div>
    )
}

export default Toolbox
