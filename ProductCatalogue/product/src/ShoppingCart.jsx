import React, { useEffect, useState } from 'react';
import { CartState } from './context/Context';

const ShoppingCart = () => {
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
        <>
            <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cart.length} Items</h2>
                            </div>
                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                cart.map((product) => (
                                    <div key={product.id} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center min-[400px]:flex min-[400px]:items-center gap-5 py-6 border-b border-gray-200 group">
                                        <div className="w-[200px] aspect-square relative sm:flex justify-center">
                                            <img src={product.image} alt="serum bottle" className="w-full h-full rounded-xl" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                            <div className="md:col-span-2">
                                                <div className="flex flex-col max-[500px]:items-center gap-3">
                                                    <h6 className="font-semibold text-base leading-7 text-black">{product.name}</h6>
                                                    <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">${product.price}</h6>
                                                    <button className='hover:cursor-pointer' onClick={() => removeProduct(product)}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                                            <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            </div>
                                            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                                <div className="flex items-center h-full">
                                                    <button className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300" onClick={() => handleDecrease(product)}>
                                                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                            <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                            <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                            <path d="M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                        </svg>
                                                    </button>
                                                    <input type="text" className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent" value={product.qty} readOnly />
                                                    <button onClick={() => handleIncrease(product)} className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" >
                                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                            <path d="M11 5.5V16.5M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                            <path d="M11 5.5V16.5M16.5 11H5.5" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                                <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">${product.price * product.qty}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-span-12 xl:col-span-4 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-600">Order Summary</h2>
                            <div className="mt-8">
                                <div className="flex items-center justify-between pb-6">
                                    <p className="font-normal text-lg leading-8 text-black">{cart.length} Items</p>
                                    <p className="font-medium text-lg leading-8 text-black">$ {total}</p>
                                </div>
                                <div className="flex items-center justify-between py-8">
                                    <p className="font-medium text-xl leading-8 text-black">Total Bill</p>
                                    <p className="font-semibold text-xl leading-8 text-indigo-600">$ {total}</p>
                                </div>
                                <button className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700" disabled={cart.length === 0}>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShoppingCart;
