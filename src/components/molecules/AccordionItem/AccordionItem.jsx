/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react';
import styles from './accordionItem.module.css';

export function AccordionItem({ accordionItem }) {
  const [isActive, setIsActive] = useState(false);

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
      {isActive && (
        <div className={styles.accordionContent}>
          <div className={styles.containerText}>{accordionItem.content.description}</div>
          <div className={styles.containerVideo}>
            <video src={accordionItem.content.video} controls />
          </div>
        </div>
      )}

    </div>
  );
}
