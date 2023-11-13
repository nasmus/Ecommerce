//import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import "./App.css";
//import { Store } from './Store';
import CartScreen from "./screen/CartScreen";
import SignInScreen from "./screen/SignInScreen";
import ShipingAddressScreen from "./screen/ShipingAddressScreen";
import SignUpScreen from "./screen/SignUpScreen";
import PaymentMethodScreen from "./screen/PaymentMethodScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import OrederHistoryScreen from "./screen/OrederHistoryScreen";
import ProfileScreen from "./screen/ProfileScreen";
import SearchScreen from "./screen/SearchScreen";
import Header from "./components/Header";
import { useState } from "react";
import CategoryPage from "./screen/CategoryPage";
import Footer from "./screen/FooterScreen/Footer";

function App() {
  // const {state, dispatch:ctxDispatch} = useContext(Store);
  // const {cart,userInfo} = state;
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(!isVisible);
    console.log(isVisible);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column main_section">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Header isVisible={isVisible} handleClick={handleClick} />
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen isVisible={isVisible} />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/shipping" element={<ShipingAddressScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrederHistoryScreen />} />
            <Route path="/category/:id" element={ <CategoryPage /> } />
          </Routes>
        </main>
        <footer className=" mt-16 ">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
