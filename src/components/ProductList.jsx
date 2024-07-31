import PropTypes from "prop-types";
import cartSVG from "./../assets/images/icon-add-to-cart.svg";
const ProductList = ({
  products,
  handleAddToCart,
  cart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const formatPrice = (price) => {
    return price - Math.floor(price) !== 0 ? `$${price}0` : `$${price}.00`;
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full sm:gap-6">
      {products.map((product) => {
        const inCart = cart.find((item) => item.id === product.id);
        const quantity = inCart ? inCart.quantity : 0;
        return (
          <div key={product.name} className="mb-10 ">
            <div className="relative mb-14   rounded-xl  ">
              {/*  */}
              <picture>
                <source
                  media="(min-width:768px)"
                  srcSet={product.image.tablet}
                  className="rounded-xl "
                />
                <source
                  media="(min-width:1024px)"
                  srcSet={product.image.tablet}
                  className="rounded-xl w-full "
                />
                <img
                  src={product.image.mobile}
                  alt=""
                  className="rounded-xl w-full"
                />
              </picture>

              <div className="absolute bottom-0.5 sm:left-1/3 left-1/4 -mb-6  cursor-pointer mx-auto lg:left-1/4 w-auto">
                {inCart ? (
                  <div className="bg-orange-800 py-2 px-4  rounded-3xl   transition-all  font-primarySemiBold flex items-center">
                    <div
                      className="text-white rounded-full border p-1 bg-transparent transition-colors hover:bg-white hover:text-orange-800"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="none"
                        viewBox="0 0 10 10"
                      >
                        <path
                          fill="currentColor"
                          d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                        />
                      </svg>
                    </div>
                    <p className="mx-8 text-gray-100">{quantity}</p>
                    <div
                      className="text-white rounded-full border p-1 bg-transparent transition-colors hover:bg-white hover:text-orange-800 py-2"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="2"
                        fill="none"
                        viewBox="0 0 10 2"
                      >
                        <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div
                    className="bg-white py-2 px-4  rounded-3xl border border-gray-500 transition-all hover:border-orange-800 hover:text-orange-800 font-primarySemiBold  w-full "
                    onClick={() => handleAddToCart(product)}
                  >
                    <img src={cartSVG} alt="" className="inline-block mr-2" />
                    <span className="text-sm text-nowrap">Add to Cart</span>
                  </div>
                )}
              </div>
            </div>

            <div className="">
              <span className="text-md opacity-60 text-gray-700">
                {product.category}
              </span>
              <p className="text-xl font-primarySemiBold">{product.name}</p>
              <span className="text-orange-800 font-primaryBold text-xl">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  handleAddToCart: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  increaseQuantity: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  quantitySelected: PropTypes.number,
};

export default ProductList;
