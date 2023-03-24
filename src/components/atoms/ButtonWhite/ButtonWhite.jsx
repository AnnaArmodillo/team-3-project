import { motion } from 'framer-motion';
import styles from './buttonWhite.module.css';

export function ButtonWhite({ children, type, onClick }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <motion.button
      type={type}
      className={styles.button}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
