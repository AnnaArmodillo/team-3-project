import { motion } from 'framer-motion';
import styles from './buttonGrey.module.css';

export function ButtonGrey({
  children, type, onClick, disabled, title,
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <motion.button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      title={title}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
