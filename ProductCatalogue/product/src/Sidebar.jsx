
import React, { useState, useEffect } from 'react';
import { CartState } from './context/Context';
import Product from './Product';

const Sidebar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // State to track sort order


  const {
    state: { products },
    productDispatch,
  } = CartState();



  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  const sortProducts = (order) => {
    if (order === 'highToLow') {
      return [...products].sort((a, b) => b.price - a.price);
    } else if (order === 'lowToHigh') {
      return [...products].sort((a, b) => a.price - b.price);
    }
    return products;
  };

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetFilters = () => {
    setSortOrder(null); // Reset sort order
  };


  return (
    <>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full max-sm:flex-row">
          
            <div className='flex w-full justify-center items-center'>
              <input
                type="text"
                placeholder="Search products"
                className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-full text-sm border-0 shadow outline-none focus:outline-none focus:ring max-w-2xl"
                value={searchTerm}
                name="searchTerm"
                onChange={(e) => {
                  console.log(e.target.value);
                  setSearchTerm(e.target.value);
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
            </div>

          </div>
          <svg className="my-7 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
            <path d="M0 1H1216" stroke="#E5E7EB" />
          </svg>
          <div className="grid grid-cols-12">
            <div className={`col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto max-sm:${showFilters ? '' : `hidden`}`}>
              <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                  <p className="font-medium text-base leading-7 text-black">Filter</p>
                  <p className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-700" onClick={resetFilters}>RESET</p>
                </div>
                <div className="box flex flex-col gap-2">
                  <div className="flex items-center">
                    <input type="radio" className="p-4 m-2" name="sort" onChange={() => setSortOrder('highToLow')} />
                    <label htmlFor="checkbox-default-2" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Price : High to Low</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" className="p-4 m-2" name="sort" onChange={() => setSortOrder('lowToHigh')} />
                    <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Price : Low to High</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h2 className="font-manrope font-bold text-3xl min-[400px]:text-xl text-black mb-8 max-lg:text-center">Available Products</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {sortProducts(sortOrder)
                      .filter((prod) =>
                        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((prod) => (
                        <Product key={prod.id} prod={prod} />
                      ))}
                    {sortProducts(sortOrder)
                      .filter((prod) =>
                        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .length === 0 && (
                        <p className="text-gray-500">No products found.</p>
                      )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;

