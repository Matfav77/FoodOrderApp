import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const [checkingOut, setCheckingOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const orderHandler = event => {
        setCheckingOut(true)
    }

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onCartToggler}>Close</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-5be81-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map(item => <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />)}
        </ul>)

    const cartModalContent = <>
        {cartItems}
        < div className={styles.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div >
        {checkingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCartToggler} />}
        {!checkingOut && modalActions}
    </>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const setDidSubmitModalContent = <p>Successfully sent the order!</p>

    return <Modal onClick={props.onCartToggler}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && setDidSubmitModalContent}
    </Modal>
}

export default Cart