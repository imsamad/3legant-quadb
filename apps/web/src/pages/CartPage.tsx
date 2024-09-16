import React from "react";
import { CartPageComponent } from "../components/CartPageComponent";
import { Footer, Nav } from "../components";

const CartPage = () => {
  return (
    <>
      <Nav />
      <div className="max-w-screen-lg mx-auto pb-12">
        <CartPageComponent />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
