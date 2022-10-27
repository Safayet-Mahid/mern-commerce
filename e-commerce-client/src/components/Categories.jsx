import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { categories } from '../data'
import { mobile } from '../responsive'
import CategorieItem from './CategorieItem'

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({
      padding:"0px",
      flexDirection:"column"
    })}
`
const Categories = () => {
  return (
    <Container>
        {
            categories.map(item=>(
              
                <CategorieItem key={item.id} item={item}/>
      
            ))
        }

    </Container>
  )
}

export default Categories