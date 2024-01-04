import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Product = ({product}) => {
  return (
    <div className='product'>
        <Link href={`/product/${product.id}`}>
            <span>{Math.floor(product.discountPercentage)}% off</span>
          <Image src={product.thumbnail} alt="test" width="400" height="400" style={{ width: '100%', height: '300px', objectFit: 'cover' }} priority/>
        </Link>
        <div className="content">
            <span>{product.category}</span>
            <h3 className='text-xl'>{product.title}</h3>
            <p>{product.price} ₹</p>
        </div>
    </div>
  )
}

export default Product