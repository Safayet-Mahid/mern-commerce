import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Newsletter from "../components/Newsletter"
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { publicRequest } from '../requestMethods'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartRedux'


const Container = styled.div``
const Wrapper = styled.div`
padding: 50px;
display: flex;

${mobile({
      padding:"8px",
      flexDirection:"column"
    })}
`

const ImgContainer = styled.div`
flex:1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: contain;
    object-position: top;
    ${mobile({
      height:"50vh",
      objectFit:"cover"
    })}
`


const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
${mobile({
      padding:"10px"
    })}

`

const Title = styled.h1`
font-weight: 200;
margin: 0;
`

const Desc = styled.p`
margin:20px 0px;
`

const Price = styled.span`
font-weight: 100;
font-size: 40px;
`
const FilterContainer=styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
${mobile({
      width:"100%"
    })}

`

const Filter=styled.div`
display: flex;
align-items: center;
`

const FilterTitle=styled.span`
font-size: 20px;
font-weight: 200;
`

const FilterColor=styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
margin: 0 5px;
cursor: pointer;
`

const FilterSize=styled.select`
margin-left: 10px;
padding: 5px;

`

const FilterSizeOption=styled.option``

const AddContainer=styled.div`
    width:50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    ${mobile({
      width:"100%"
    })}
    
`

const AmountContainer=styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount=styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`

const Button=styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`


const SingleProductPage = () => {

    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    
    const [product ,setProduct]=useState({})
    const [quantity ,setQuantity]=useState(1)
    const [color ,setColor]=useState("")
    const [size ,setSize]=useState("")
    const dispatch = useDispatch()

    useEffect(()=>{
        const getProduct = async () =>{
            try{
          
                const res = await publicRequest.get(`/products/find/${productId}`)
              
                setProduct(res.data);
          
            }
            catch(err){}
        }
        getProduct()
    },[productId])
   
    const handleAddCart = ()=>{
        dispatch(
            addProduct({
                ...product,quantity,color,size
            })
        )

    }

  return (
    <Container>
        <NavBar/>
        <Announcement/>

        <Wrapper>
            <ImgContainer>
                <Image src={product.img}></Image>
            </ImgContainer>
            <InfoContainer>
                <Title>Denim Jumpsuit</Title>
                <Desc>{product.desc}</Desc>
                <Price>$ {product.price}</Price>

                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                       {
                      product.color?.map(clr=>

                            <FilterColor key={clr} color={clr} onClick={()=>setColor(clr)}></FilterColor>
                        )
                       }
                       
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=> setSize(e.target.value)}>
                            {
                                product.size?.map(s=>
                                    <FilterSizeOption key={s} >{s}</FilterSizeOption>

                        )
                       }
                        </FilterSize>
                    </Filter>
                </FilterContainer>

                <AddContainer>
                    <AmountContainer>
                        <Remove style={{cursor:"pointer"}} onClick={()=> quantity > 1 && setQuantity(prev=> --prev)}/>
                        <Amount>{quantity}</Amount>
                        <Add style={{cursor:"pointer"}} onClick={()=>setQuantity(prev=>++prev)}/>
                    </AmountContainer>
                    <Button onClick={handleAddCart}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default SingleProductPage