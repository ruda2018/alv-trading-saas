import { motion } from 'framer-motion'

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: i => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: i => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: i => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
  },
}

export default function Reveal({ children, variant = 'fadeUp', delay = 0, style }) {
  return (
    <motion.div
      custom={delay}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={style}
    >
      {children}
    </motion.div>
  )
}
