import React from 'react'
import styles from './Input.module.css'


const Input = React.forwardRef((props, ref) => {
    return <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} />                   {/* Spreading props allows the addition of attributes automatically with React */}
    </div>
})

export default Input