import React, { useState } from 'react'
// import ProductsPage from './ProductsPage';

const ProductCatalogue = () => {
  const [showFilters, setShowFilters] = useState(false);
  const handleClick = () => {
    setShowFilters(!showFilters);
  }
  return (
    <>
      <section className="py-24 relative " >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full max-sm:flex-row">
            <h2 className='font-semibold '>Discover Products</h2>
            <button className=' max-sm:visible lg:hidden md:hidden sm:hidden' onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
            </button>
          </div>
          <svg className="my-7 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
            fill="none">
            <path d="M0 1H1216" stroke="#E5E7EB" />
          </svg>
          <div className="grid grid-cols-12">
            <div className={`col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto max-sm:${showFilters ? '' : `hidden`}`}>
              <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                  <p className="font-medium text-base leading-7 text-black ">Filter</p>
                  <p
                    className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600">
                    RESET</p>
                </div>
                <p className="font-medium text-sm leading-6 text-black mb-3">Discount</p>
                <div className="box flex flex-col gap-2">
                  <div className="flex items-center">
                    <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                    <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Price : High to Low</label>
                  </div>
                  <div className="flex items-center">
                    <input id="checkbox-default-2" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                    <label htmlFor="checkbox-default-2" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">Price : High to Low</label>
                  </div>
                </div>


                <p className="font-medium text-sm leading-6 text-black mt-3">Ratings</p>
                <div className="box flex flex-col gap-2 mt-1 " >
                  <div className="flex items-center">
                    <div className="rating">
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ProductsPage />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductCatalogue;



