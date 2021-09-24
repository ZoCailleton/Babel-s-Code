import { motion } from 'framer-motion'
import './user.scss'

const User = ({ id, name, mode }) => {
    return (
        <motion.div drag={mode === 'Chaos'} key={id} className="box-user">
            <p>{name}</p>
        </motion.div>
    )
}

export default User
