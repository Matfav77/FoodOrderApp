import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";


function App() {

  const [cartShown, setCartShown] = useState(false);

  const cartToggler = () => {
    setCartShown(prevState => !prevState)
  }

  return (
    <CartProvider>
      {cartShown && <Cart onCartToggler={cartToggler} />}
      <Header onCartToggler={cartToggler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
