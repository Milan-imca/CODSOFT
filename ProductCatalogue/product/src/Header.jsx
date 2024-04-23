import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartState } from './context/Context';

function Header() {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(true);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const toggleCartDropdown = () => {
    setIsCartDropdownOpen(prevState => !prevState);
  };

  const closeCartDropdown = () => {
    setIsCartDropdownOpen(false);
  };

  const { state: { cart }, dispatch } = CartState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((previous, current) => previous + Number(current.price) * current.qty, 0));
  }, [cart])


  const handleDecrease = (product) => {
    if (product.qty === 1) {
      dispatch({ type: 'removeFromCart', payload: { id: product.id } });
    } else {
      dispatch({ type: 'decreaseQty', payload: { id: product.id } });
    }
  };


  const handleIncrease = (product) => {
    dispatch({ type: 'increaseQty', payload: { id: product.id } });
  };


  const removeProduct = (product) => {
    dispatch({ type: 'removeFromCart', payload: { id: product.id } });
  }


  return (
    <div className="navbar bg-base-100 p-5">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Artify
        </Link>
      </div>
      <div className="flex-none gap-2">

        {/* search icon button */}
        <button className="btn btn-ghost btn-circle" onClick={toggleCartDropdown}>

        </button>

        <div className="dropdown dropdown-end">
          <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
            <div className="indicator" onClick={toggleCartDropdown}>
              {/* cart icon button */}
              <button >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <span className="badge badge-sm indicator-item bg-blue-700 text-white">{cart.length}</span>
            </div>
          </div>
          {isCartDropdownOpen && (
            <div className="mt-3 z-[1] card card-compact dropdown-content w-auto bg-white shadow-lg">
              <div className="card-body">
                <button
                  className="btn btn-ghost btn-circle absolute top-2 right-2"
                  onClick={closeCartDropdown} z
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="font-bold text-lg">{cart.length} Items</span>


                <div className="flow-root">
                  <p className='text-lg font-semibold'>Shopping Cart</p>
                  {
                    cart.length > 0 ?

                      <>

                        <div>
                          {
                            cart.map((p) =>
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                <li className="flex py-6 mt-2">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={p.image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <p>{p.name}</p>
                                        </h3>
                                        <p className="ml-4">${p.price}</p>
                                      </div>
                                    </div>
                                    <p className='font-semibold text-center'>Quantity</p>
                                    <div className='flex justify-between items-center flex-row '>
                                      <button className='bg-gray-200  p-2 rounded-md' onClick={() => handleDecrease(p)}>-</button>
                                      <p className='text-center'>{p.qty}</p>
                                      <button className='bg-gray-200  p-2 rounded-md' onClick={() => handleIncrease(p)}>+</button>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">

                                      <div className="flex">
                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeProduct(p)}>Remove</button>
                                      </div>
                                    </div>
                                  </div>

                                </li>
                              </ul>
                            )
                          }
                        </div>
                        <div className="m-2 mt-2 w-auto flex justify-between items-center">
                          <span className="text-md font-bold text-blue-700">Subtotal :  ${total}</span>
                          <div className="">
                            <Link to="/shopping-cart">
                              <button className="bg-blue-500 p-2 rounded-lg hover:bg-blue-300 text-white font-semibold">View cart</button>
                            </Link>
                          </div>
                        </div>
                      </>

                      :
                      <div className='w-40 text-lg'>
                        Cart  is empty !
                      </div>
                  }


                </div>
              </div>

            </div>
          )}

        </div>
      </div>
      
    </div >
  );
}

export default Header;
