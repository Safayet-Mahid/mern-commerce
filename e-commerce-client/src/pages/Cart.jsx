import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import styled from 'styled-components'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from '../requestMethods'
import { useNavigate } from 'react-router-dom'

const KEY = process.env.REACT_APP_STRIPE;

const Container =styled.div``

const Wrapper =styled.div`
    padding: 20px;
    ${mobile({
      padding:"10px"
    })}
`


const Title =styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top =styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopBottom =styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border:${props=>props.type ==="filled" && "none"};
    background-color:${props=>props.type ==="filled"? "black" : "transparent"};
    color:${props=>props.type ==="filled" && "white"};
`
const TopTexts =styled.div`
${mobile({
      display:"none"
    })}

`
const TopText =styled.span`
    text-decoration:underline;
    cursor: pointer;
    margin: 0 10px;
`

const Bottom =styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({
      flexDirection:"column"
    })}
`


const Info =styled.div`
    flex: 3;
`

const Product=styled.div`
display: flex;
justify-content: space-between;
${mobile({
      flexDirection:"column"
    })}
`
const ProductDetail=styled.div`
flex:2;
display: flex;

`
const Image=styled.img`
width: 200px;
height: 25vh;
object-fit: contain;
`
const Details=styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
gap: 10px;
`
const ProductName=styled.span`

`
const ProductId=styled.span``
const ProductColor=styled.span`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
`
const ProductSize=styled.span``
const PriceDetail=styled.div`
flex:1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const ProductAmountContainer = styled.div` 
display: flex;
align-items: center;
margin-bottom: 20px;
${mobile({
    marginTop:"20px"
})}
`
const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;
${mobile({
      margin:"5px 15px"
    })}
`
const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({
      marginBottom:"20px"
    })}
`

const Hr = styled.hr`
    background-color:#eee;
    border: none;
    height: 1px;
`

const Summary =styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: fit-content;
`

const SummeryTitle=styled.h1`
    font-weight: 200;
`

const SummeryItem=styled.div`
margin: 30px 0;
display: flex;
justify-content: space-between;
font-weight: ${props=>props.type ==="total" && "500"};
font-size: ${props=>props.type ==="total" && "24px"};
`

const SummeryItemText=styled.span``

const SummeryItemPrice=styled.span``

const Button=styled.button`

width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
`


const Cart = () => {

    const cart = useSelector(state=>state.cart)
    const [stripeToken,setStripeToken] = useState(null)
    const navigate = useNavigate()
   
const onToken = (token)=>{
    setStripeToken(token)
}

useEffect(() => {
  const makeRequest = async ()=>{
    try{
        const res = await userRequest.post("/checkout/payment",{
            tokenId : stripeToken.id,
            amount : cart.total * 100
        })
        navigate("/success",{
        replace:true,
        data:res.data
        })
    }catch{}
  }
stripeToken && makeRequest()

}, [stripeToken,cart.total,navigate])

  return (
    <Container>
        <NavBar/>
        <Announcement/>
        <Wrapper>
            <Title>Your Bag</Title>
            <Top>
                <TopBottom>CONTINUE SHOPPING</TopBottom>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your WishList (0)</TopText>
                </TopTexts>
                <TopBottom type="filled">CHECKOUT NOW</TopBottom>
            </Top>
            <Bottom>
                <Info>
                   { cart.product.map(product=>(
                    <React.Fragment key={product._id}>
                       <Product>
                        <ProductDetail>
                            <Image src={product.img}/>
                            <Details>
                                <ProductName> <b>Product:</b> {product.title} </ProductName>
                                <ProductId><b>ID: {product._id}</b></ProductId>
                                <ProductColor color={product?.color}/>
                                <ProductSize><b>Size</b> {product?.size} </ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>
                        <Hr/>
                        </React.Fragment>
                    ))
                }
                    
                </Info>
                <Summary>
                    <SummeryTitle>ORDER SUMMERY</SummeryTitle>
                    <SummeryItem>
                        <SummeryItemText>Subtotal</SummeryItemText>
                        <SummeryItemPrice>$ {cart.total}</SummeryItemPrice>
                    </SummeryItem>
                    <SummeryItem>
                        <SummeryItemText>Estimated Shipping</SummeryItemText>
                        <SummeryItemPrice>$ 5.20</SummeryItemPrice>
                    </SummeryItem>
                    <SummeryItem>
                        <SummeryItemText>Shipping Discount</SummeryItemText>
                        <SummeryItemPrice>$ -5.20</SummeryItemPrice>
                    </SummeryItem>
                    <SummeryItem type="total">
                        <SummeryItemText >Total</SummeryItemText>
                        <SummeryItemPrice>$ {cart.total}</SummeryItemPrice>
                    </SummeryItem>
                    
                    <StripeCheckout
                        name='Zay-Z'
                        image='https://media.istockphoto.com/vectors/shopping-bag-with-cart-logo-designillustrator-vector-id1029895828?k=20&m=1029895828&s=612x612&w=0&h=3HonEkELnrH_KEli4TvlFXtuQfwmR-bTgUjW31gIB9s='
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total*100}
                        token={onToken}
                        stripeKey={KEY}
                    
                    >
                        <Button>CHECK OUT NOW</Button>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart