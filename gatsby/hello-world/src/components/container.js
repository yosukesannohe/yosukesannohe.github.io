import React from 'react'
import styles from '../styles/container.module.css'
console.log(styles)
export default ({ children }) => (
  <div className={styles.container}>
    {children}
    <div className={styles.inner}>Inner~!!!!</div>
  </div>
)