import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useStoreContext } from '@/utils/store';

const Header = () => {
  const {state} = useStoreContext()
  const [cardItemsCount, setCardItemsCount] = useState(0);
 
  useEffect(() => {
    setCardItemsCount(state.cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [state.cart.cartItems]);


  return (
    <>
      <header className='header'>
         <nav className='flex justify-between shadow-md items-center p-4'>
            <div className="logo flex items-center space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <Link href="/">
                <span className="text-2xl font-bold">myShop</span>
              </Link>
            </div>
            <div className="search_form">
                <form action="" className="mx-auto  hidden w-full justify-center md:flex">
                    <input type="text" name="" id="" className='rounded-tr-none rounded-br-none p-1.5 text-sm focus:ring-0' placeholder="Search products"/>
                    <button
                className="rounded rounded-tl-none rounded-bl-none bg-blue-400 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
                </form>
            </div>
            <div className="user_panel">
            <Link href="/login">
                  <span className="p-2">Login</span>
            </Link>
            <Link href="/cart">
                <span className="p-2">Cart</span>
                  <span className="rounded-full bg-red-600 p-2 py-1 text-xs font-bold text-white">
                  {cardItemsCount}
                  </span>
            </Link>
            </div>
         </nav>
      </header>
    </>
  )
}

export default Header