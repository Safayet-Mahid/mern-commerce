import React from 'react'
import styled from 'styled-components'
// import {Badge} from "@material-ui/core" 
import {Search,ShoppingCartOutlined} from "@material-ui/icons" 
import {mobile} from "../responsive"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Container = styled.div`
    height:60px; 
    /* margin  : 3px 0; */
    ${mobile({
      height:"50px"
    })}
`
const Wrapper = styled.div`
    padding: 10px 20px ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    ${mobile({
      padding:"10px 0px",
    })}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
 const Language = styled.span`
    cursor: pointer;
    font-size: 14px;

    ${mobile({
      display:"none"
    })}
 `

 const SearchContainer = styled.div`
    border: .5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
 `

 const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({
      width:"50px"
    })}
 ` 

const Center = styled.div`
  flex: 1;
  text-align: center;
`
const Logo = styled.h1`
  font-weight: bold;
 margin:0;

 ${mobile({
      fontSize:"24px"
    })}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 25px;
  position: relative;
 
  ${mobile({
      justifyContent:"center",
      flex:2,
      gap:"10px"
    })}
`
const MenuItem = styled.div`
  font-style: 14px;
  ${mobile({
      fontSize:"12px",
      marginLeft:"10px"
    })}
`
const CartContainer = styled.div`
 height: 15px;
    width: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: white;
    border-radius: 50%;
    background-color: maroon;
    position: absolute; 
    top: 0;
    right: 0; 
    z-index: 5;
`

const NavBar = () => {

  const quantity = useSelector(state => state.cart.quantity)

  // const {state}= useSelector(state=>state)
  const  userIsADmin = useSelector((state) => state.user.currentUser.isAdmin);
  // console.log(user)

  return (
    <Container>
      <Wrapper>
        <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="search"/>
              <Search style={{color:"gray",fontSize:16}}/>
            </SearchContainer>
        </Left>
        <Center>
          <Logo> ZAY-G.</Logo>
        </Center>
        <Right>
          <Link to="/admin" className='link'>
          { userIsADmin && <MenuItem>DASHBOARD</MenuItem>}
          </Link>

          <Link to="/register" className='link'>
          <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" className='link'>
          <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to = "/cart">
          
          <MenuItem>
            {/* <Badge badgeContent={4} color="primary"> */}
              <CartContainer>
                {quantity}
              </CartContainer>
            <ShoppingCartOutlined/>
  
          {/* </Badge> */}
          </MenuItem>
          </Link>
        
          
          
        </Right>
      </Wrapper>
    </Container>
  )
}

export default NavBar