import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import ReactStars from "react-rating-stars-component";
import { useStoreContext } from '@/utils/store';
import { toast } from "react-toastify";

const SingleProduct = ({product}) => {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [qty, setQty] = useState(1)
  const {dispatch} = useStoreContext()
  const handleThumbnails = (url) =>{
    setMainImage(url)
  }

  const addToCartHandler = async () =>{
    const quantity = parseInt(qty)
    dispatch({type: 'ADD_TO_CART', payload: {...product, quantity}})
    toast.success("Product added to the cart");
    //router.push("/cart");
  }


  return (
    <div className="container mx-auto my-5">
    <div className="grid md:grid-cols-5 md:gap-3 my-2">
        <div className='md:col-span-2'>
          <Image src={mainImage} width="500" height="400" alt={product.title} priority className='w-full feature_img'></Image>
          <div className="product_thumbnail flex space-x-3 mt-3">
            {
              product.images.map((images, index) =>{
                return(
                    <div className='product_thumbs' key={index} onClick={() => handleThumbnails(images)}>
                    <Image src={images} width="90" height="70" alt={product.title} priority className='h-12'></Image>
                    </div>
                )
              })
            }
          </div>
        </div>
        <div className='md:col-span-2 md:pl-4'>
          <h1 className='text-3xl mb-4'>{product.title}</h1>
          <h3 className='mb-3'><strong>Category : </strong>{product.category}</h3>
          <h3 className='mb-3'><strong>Brand : </strong>{product.brand}</h3>
          <div className="flex items-center space-x-2 mb-4">
                <ReactStars
                  count={5}
                  size={26}
                  activeColor="#ffd700"
                  value={product.rating}
                  edit={false}
                />
                <span>{product.rating} Ratings</span>
              </div>
          <p>{product.description}</p>
        </div>
        <div>
          <div className="card p-5 shadow-md rounded"> 
          <div className="mb-2 flex justify-between"><div>Price</div><div>{product.price}</div></div>
          <div className="mb-2 flex justify-between"><div>Stock</div><div>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div></div>
          <div className="mb-2 flex justify-between"><div>Quantity</div><div><select onChange={(e) => setQty(e.target.value)} value={qty}>{Array.from({length: product.stock}, (_, num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}</select></div></div>
          <button className="primary-button w-full mt-4" onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
    </div>
    </div>
  )
}

export default SingleProduct


export async function getServerSideProps(context){
  const {params} = context
  const response = await axios.get(`https://dummyjson.com/products/${params.ProductId}`);
  const { data } = response;
  console.log(data)

  return {
    props: {
      product: data,
    },
  };
}
