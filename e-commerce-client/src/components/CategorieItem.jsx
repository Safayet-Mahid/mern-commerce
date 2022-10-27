import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'



const Container = styled.div`
   flex: 1;
   margin: 3px;
   height: 70vh;
   position: relative;
 
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  ${mobile({
      height:"40vh",
    })}
`
const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0,0,0,.15);
    
`
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;

`
const Button = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px;
  background-color: white;
  color: gray;
  font-weight: 600;

`

const CategorieItem = ({item}) => {
  return (
    <Container>
      <Link  to={`/products/${item.category}`}>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategorieItem