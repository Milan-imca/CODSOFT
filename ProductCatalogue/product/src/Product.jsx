import React, { useEffect } from 'react'
import { CartState } from './context/Context'

const Product = ({ prod }) => {

  const { state: { cart }, dispatch } = CartState();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'initializeCart', payload: JSON.parse(savedCart) });
    }
  }, [dispatch]);

  // Store cart items in localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="max-w-[384px] mx-auto  ">
      <div className="w-full max-w-sm aspect-square relative ">
        <img src={prod.image} alt="serum bottle image" className="w-full h-full rounded-xl" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="">
          <h6 className="font-medium text-xl leading-8 text-black mb-2">{prod.name}</h6>
          <h6 className="font-semibold text-xl leading-8 text-indigo-600">${prod.price}</h6>
        </div>


        {
          cart.some((p) => p.id === prod.id) ?
            <button onClick={() => {
              dispatch({
                type: "removeFromCart",
                payload: prod,
              })
            }}><svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" onClick={() => {
                  dispatch({
                    type: "addToCart",
                    payload: prod,
                  });
                }} />
              </svg></button> :
            <button onClick={() => {
              dispatch({
                type: "addToCart",
                payload: prod,
              })
            }}> <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
              fill="none">
                <path
                  d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                  stroke="" strokeWidth="1.6" strokeLinecap="round" />
              </svg></button>
        }



      </div>
    </div>
  )
}

export default Product