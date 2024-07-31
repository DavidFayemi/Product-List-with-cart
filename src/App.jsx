import Loading from "./components/Loading";
import ProductList from "./components/ProductList";
import useFetch from "./hooks/useFetch";
import emptyCard from "./assets/images/illustration-empty-cart.svg";
import carbonFree from "./assets/images/icon-carbon-neutral.svg";
import { useState } from "react";
import Modal from "./components/Modal";
const App = () => {
  const {
    data: products,
    error,
    loading,
  } = useFetch("http://localhost:5050/products");
  const [cart, setCart] = useState([]);
  // const [productTotal, setProductTotal] = useState(0);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Product already in cart, do nothing or update if needed
        return prevCart;
      } else {
        // Add new product to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  const formatPrice = (price) => {
    return price - Math.floor(price) !== 0 ? `$${price}0` : `$${price}.00`;
  };
  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <>
      {isOrderConfirmed && (
        <Modal
          cart={cart}
          setIsOrderConfirmed={setIsOrderConfirmed}
          setCart={setCart}
          formatPrice={formatPrice}
          calculateTotalPrice={calculateTotalPrice}
        />
      )}

      <div className="flex flex-col lg:flex-row bg-orange-50 min-h-screen min-w-full py-8 lg:pl-24 lg:pr-8 px-12 text-md w-screen overflow-x-hidden font-primaryRegular ">
        {/* Main */}
        <div className="container">
          <h1 className="text-4xl font-primaryBold mb-8 mt-4 mx-0">Desserts</h1>
          {error && (
            <h2 className="text-5xl text-center font-primarySemiBold mt-32 text-orange-500 italic opacity-50">
              {error}
            </h2>
          )}
          {loading && <Loading />}
          {products && (
            <ProductList
              products={products}
              handleAddToCart={handleAddToCart}
              cart={cart}
              isAddedToCart={isAddedToCart}
              setIsAddedToCart={setIsAddedToCart}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
            />
          )}
        </div>
        {/* Cart */}

        <div className="lg:ml-4 my-8 bg-gray-50 p-8 px-10  rounded-2xl w-80 lg:w-96  h-fit justify-end border border-gray-200 lg:max-w-sm self-center lg:self-start lg:justify-self-end lg:min-w-80 mx-auto -ml-4 sm:ml-0 ">
          <h1 className="text-2xl mb-4 font-primaryBold text-orange-800 ">
            Your Cart({calculateTotalItems()})
          </h1>

          {cart.length === 0 ? (
            <div className="">
              <img src={emptyCard} alt="" className="mx-auto" />
              <p className="text-center opacity-70 text-sm w-full">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <div>
              <div className="max-h-60 overflow-y-scroll overflow-x-hidden">
                {cart.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="border-b mb-2 py-2 flex justify-between
                          items-center"
                    >
                      <div>
                        <h1 className="text-orange-900 text-md mb-2 -mt-1 font-primarySemiBold">
                          {item.name}
                        </h1>
                        <span className="text-lg text-orange-800 font-primarySemiBold mr-4">
                          {item.quantity}x
                        </span>
                        <span className="font-primaryRegular text-orange-800">
                          @{formatPrice(item.price)}{" "}
                        </span>
                        <span className="font-primaryRegular text-orange-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      <div
                        className="rotate-0 transform transition-all hover:rotate-180 cursor-pointer opacity-40 hover:opacity-90 border border-black rounded-full p-1"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="currentColor"
                          viewBox="0 0 10 10"
                        >
                          <path
                            fill="currentColor"
                            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center my-3">
                <span>Order Total</span>
                <span className="text-2xl font-primaryBold">
                  {formatPrice(calculateTotalPrice())}
                </span>
              </div>
              <div className="bg-orange-50  w-full px-2 py-2 rounded-lg flex flex-row items-center  justify-center">
                <img
                  src={carbonFree}
                  alt=""
                  className="inline-block text-nowrap"
                />
                <span>This is a carbon-free delivery</span>
              </div>
              <button
                className="w-full bg-orange-700 py-3 rounded-3xl transition-colors text-white my-4 text-sm hover:bg-orange-800"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
