import { motion } from 'framer-motion';
import styles from './buttonPurple.module.css';

export function ButtonPurple({
  children, type, onClick, disabled,
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <motion.button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
