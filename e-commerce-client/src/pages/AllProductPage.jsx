import { FilterSharp } from '@material-ui/icons'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import { mobile } from '../responsive'


const Container = styled.div`  
  
`
const Title = styled.h1` 
margin: 20px;
 `
const FilterContainer = styled.div` 
display: flex;
justify-content: space-between;

`
const Filter = styled.div` 
margin: 20px;
${mobile({
      margin:"0px 18px",
      display:"flex",
      flexDirection:"column",

    })}
 `

 const FilterText= styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({
      marginRight:"0px"
    })}
 `
const Select=styled.select`
padding: 10px;
margin-right: 20px;

${mobile({
      margin:"10px 0px"
    })}
`


const Option=styled.option``

const AllProductPage = () => {

  const location = useLocation()
  const category = location.pathname.split("/")[2]
  const [filters,setFilters]=useState({})
  const [sort,setSort]=useState("newest")
const handleSelects= (e)=>{
  setFilters({
    ...filters,[e.target.name]:e.target.value});
}

  return (
    <Container>
        <NavBar/>
        <Announcement/>
          <Title>{category}</Title>
        <FilterContainer>
            <Filter>
              <FilterText>Filter Products</FilterText>
              <Select name='color' onChange={handleSelects}>
                <Option disabled >Color</Option>
                <Option>White</Option>
                <Option>Black</Option>
                <Option>Red</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>
              </Select>
              <Select name='size' onChange={handleSelects}>
                <Option disabled >Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
              </Select>
            </Filter>
            <Filter>
              <FilterText>Sort Products:</FilterText>
              <Select onChange={e=>setSort(e.target.value)}>
                <Option value="newest" >Newest</Option>
                <Option value="asc">Price(asc)</Option>
                <Option value="desc">Price(desc)</Option>
              </Select>
            </Filter>
        </FilterContainer>
        <Products category={category} filters={filters} sort={sort}/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default AllProductPage