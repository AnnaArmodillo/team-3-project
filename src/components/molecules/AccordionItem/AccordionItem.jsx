/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './accordionItem.module.css';

export function AccordionItem({ accordionItem }) {
  const [isActive, setIsActive] = useState(false);

  const accordionContent = () => (
    <motion.div
      className={styles.accordionContent}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div
        className={styles.containerText}
      >
        {accordionItem.content.description}
      </div>
      <div
        className={styles.containerVideo}
      >
        <video src={accordionItem.content.video} controls />
      </div>
    </motion.div>
  );

  return (
    <div className={styles.accordionItem}>
      <div
        className={styles.accordionTitle}
        onClick={() => setIsActive(!isActive)}
      >
        <h4 className={isActive ? styles.titleActive : styles.titleNotActive}>
          {accordionItem.title}
        </h4>
        <div className={isActive ? styles.iconActive : styles.iconNotActive}>
          {isActive ? (
            <i className="fa-solid fa-chevron-up" />
          ) : (
            <i className="fa-solid fa-chevron-down" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {isActive && accordionContent()}
      </AnimatePresence>
    </div>
  );
}
