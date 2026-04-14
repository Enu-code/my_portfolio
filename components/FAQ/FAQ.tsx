'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQ.module.scss'

interface FAQProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

/**
 * FAQ Accordion Component
 * Uses Framer Motion for smooth height expand/collapse.
 * Plus icon rotates to an 'X' when open.
 */
export default function FAQ({ question, answer, isOpen, onClick }: FAQProps) {
  return (
    <div className={styles.faq}>
      <button
        className={styles.questionBtn}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={styles.question}>{question}</span>
        <div className={`${styles.iconWrap} ${isOpen ? styles.open : ''}`} aria-hidden="true">
          <div className={styles.iconLineHoriz} />
          <div className={styles.iconLineVert} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={styles.answerWrap}
          >
            <div className={styles.answerInner}>
              <p className={styles.answer}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
