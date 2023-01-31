
import styles from './Input.module.css'


const Input = props => {
    return <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} />                   {/* Spreading props allows the addition of attributes automatically with React */}
    </div>
}

export default Input