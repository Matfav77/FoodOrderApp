import { useRef, useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postcodeInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true, street: true, city: true, postcode: true
    })

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostcode = postcodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostcodeIsValid = isFiveChars(enteredPostcode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postcode: enteredPostcodeIsValid
        })

        const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredPostcodeIsValid && enteredStreetIsValid;

        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postcode: enteredPostcode
        })
    };

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={`${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.street ? '' : styles.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.postcode ? '' : styles.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postcodeInputRef} />
                {!formInputsValidity.postcode && <p>Please enter a valid postcode (5 characters long)</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;