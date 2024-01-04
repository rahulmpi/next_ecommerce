import { useStoreContext } from '@/utils/store'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from "next/dynamic";

const Cart = () => {
  const {state, dispatch} = useStoreContext()

  const {
    cart: { cartItems },
  } = state;

  const removeItem  = (item) =>{
     dispatch({type: 'CART_REMOVE_ITEM', payload: item})
  }

  const updateCartHandler = (item, qty) =>{
     const quantity = Number(qty)

     dispatch({type: 'ADD_TO_CART', payload: {...item, quantity}})
  }
  return (
       <>
        <h3 className='text-2xl my-4'>Shopping cart</h3>
        {cartItems.length === 0 ?  <div>Cart is Empty <Link href="/">Go Shopping</Link></div> :
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link href={`/product/${item.id}`}>
                        <span className="flex items-center">
                          <Image
                            className="rounded-sm"
                            src={item.images[0]}
                            alt={item.title}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;{item.title}
                        </span>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        { Array.from({ length: item.stock}, (_, num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.price}₹</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItem(item)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {cartItems.reduce((total, item) => total + item.quantity, 0)})
                  :
                  {cartItems.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                  )}
                  ₹
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
}
       </>
  )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });