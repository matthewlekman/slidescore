import { motion } from "framer-motion";

const Floaters = ({ delay, x, y, duration }) => {
    return (
    <motion.div
        className="floating-slide"
        initial={{ y: 0}}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
        }}
        transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        style={{
            position: 'absolute',
            left: x,
            top: y,
            opacity: 0.15,
            zIndex: 1
        }}
    >
        <svg width="60" height="45" viewBox="0 0 16 12" fill="white">
            <rect width="16" height="12" rx="1.5" fill="currentColor" />
        </svg>
    </motion.div>
    );
};

export default Floaters;