import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'



const Container = styled.div`
display: flex;
padding: 20px;
flex-wrap:wrap;`

const Products = ({category,filters,sort}) => {
  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])

useEffect(()=>{

  const getProducts = async ( )=>{
    try{
      const res =  await axios.get( category ? `http://localhost:5000/api/products?category=${category}` : "http://localhost:5000/api/products" )
       setProducts(res.data);
    } catch(err){}
  }
  getProducts()
  },[category])

  useEffect(()=>{
    const getFilteredProducts = () =>{
      setFilteredProducts(
        category && products.filter((item)=>
          Object.entries(filters).every(([key,value])=>
         item[key].includes(value)
          )
        )
      )
    }
    getFilteredProducts()
  },[products,filters,category])

// useEffect(() => {
//   if (sort === "newest") {
//     setFilteredProducts((prev) =>
//       [...prev].sort((a, b) => a.createdAt - b.createdAt)
//     );
//   } else if (sort === "asc") {
//     setFilteredProducts((prev) =>
//       [...prev].sort((a, b) => a.price - b.price)
//     );
//   } else {
//     setFilteredProducts((prev) =>
//       [...prev].sort((a, b) => b.price - a.price)
//     );
//   }
// }, [sort]);


  return (
    <Container>
        {
           category ? filteredProducts.map((item,index)=>(
                <Product key={index} item={item}/>
            )) : products.map((item,index)=>(
              <Product key={index} item={item}/>
          ))
        }
    </Container>
  )
}

export default Products