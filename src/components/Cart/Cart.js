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
    const [checkingOut, setCheckingOut] = useState(false)

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

    return <Modal onClick={props.onCartToggler}>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {checkingOut && <Checkout onCancel={props.onCartToggler} />}
        {!checkingOut && modalActions}
    </Modal>
}

export default Cart