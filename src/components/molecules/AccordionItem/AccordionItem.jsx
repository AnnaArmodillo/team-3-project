/* eslint-disable jsx-a11y/media-has-caption */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './accordionItem.module.css';

export function AccordionItem({ accordionItem }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      className={styles.accordionItem}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={styles.accordionTitle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <h4>
          {accordionItem.title}
          {!!accordionItem.link && isHover && (
            <Link to={accordionItem.link}>
              <span className={styles.link}>#</span>
            </Link>
          )}
        </h4>
      </div>
      <div className={styles.accordionContent}>
        <div className={styles.containerText}>
          {accordionItem.content.description}
        </div>
        <div className={styles.containerVideo}>
          <video src={accordionItem.content.video} controls />
        </div>
      </div>
    </motion.div>
  );
}
