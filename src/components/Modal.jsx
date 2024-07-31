import tick from "./../assets/images/icon-order-confirmed.svg";
import PropTypes from "prop-types";
const Modal = ({
  cart,
  setIsOrderConfirmed,
  setCart,
  calculateTotalPrice,
  formatPrice,
}) => {
  const handleStartNewOrder = () => {
    setIsOrderConfirmed(false);
    setCart([]);
  };
  return (
    <div className="overflow-x-hidden">
      <div className="z-10 bg-gray-800 w-screen h-screen shadow-2xl  fixed opacity-20"></div>
      <div className="flex sm:items-center sm:justify-center fixed max-w-full w-full h-screen z-10">
        <div className=" z-20 bg-gray-50  opacity-100 shadow-lg px-8 py-5 sm:rounded-lg lg:w-1/3 max-h-screen rounded-3xl  -ml-12 md:w-1/2   w-screen md:mx-4 -mx-8 h-100 mt-14 sm:w-96">
          <img src={tick} alt="" className="w-10 mb-4 mt-1" />
          <h1 className="text-2xl font-primaryBold my-1">Order Confirmed</h1>
          <p className="font-primaryRegular text-sm">
            We hope you enjoy your food
          </p>
          <div>
            <div className=" bg-pink-50 p-4 rounded-md my-5">
              <div className="overflow-y-scroll z-0 overflow-x-hidden max-h-60">
                {cart.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="border-b mb-2 py-2 flex justify-between
                          items-center"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image.thumbnail}
                          alt=""
                          className="w-14 mr-2 rounded-xl"
                        />
                        <div className="">
                          <h1 className="text-gray-900 text-sm mb-2 -mt-1 font-primaryBold">
                            {item.name}
                          </h1>
                          <span className="text-md text-orange-800 font-primarySemiBold mr-4">
                            {item.quantity}x
                          </span>
                          <span className="font-primaryRegular text-gray-800 text-sm">
                            @ {formatPrice(item.price)}{" "}
                          </span>
                        </div>
                      </div>
                      <span className="font-primaryBold text-gray-900 text-end">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center ">
                <span>Order Total</span>
                <span className="text-2xl font-primaryBold">
                  {formatPrice(calculateTotalPrice())}
                </span>
              </div>
            </div>

            <button
              className="w-full bg-orange-700 py-3 rounded-3xl transition-colors text-white mt-4 hover:bg-orange-800 text-sm"
              onClick={handleStartNewOrder}
            >
              Start New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  cart: PropTypes.array,
  setIsOrderConfirmed: PropTypes.func,
  setCart: PropTypes.func,
  calculateTotalPrice: PropTypes.func,
  formatPrice: PropTypes.func,
};
export default Modal;
