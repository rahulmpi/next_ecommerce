import React from 'react';
import axios from 'axios';
import Product from '@/components/Product';

const IndexPage = ({ products }) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const response = await axios.get('https://dummyjson.com/products?limit=8');
  const { data } = response;
  return {
    props: {
      products: data.products,
    },
  };
}
