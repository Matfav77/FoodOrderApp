
import HeaderCartButton from './HeaderCartButton';
import styles from './Header.module.css';
import banner from '../../assets/meals.jpg'

const Header = props => {
    return <>
        <header className={styles.header}>
            <h1>MealMate</h1>
            <HeaderCartButton />
        </header>
        <div className={styles['main-image']}>
            <img src={banner} alt='Table full of food.' />
        </div>
    </>
}

export default Header;