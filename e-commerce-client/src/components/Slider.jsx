import React, { useState } from 'react'
import styled from 'styled-components'
import {ArrowLeftOutlined,ArrowRightOutlined} from "@material-ui/icons"
import { sliderItems } from '../data'
import { mobile } from '../responsive'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({
      display:"none"
    })}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff7f7;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && "10px"};
    right:${props=>props.direction ==="right" && "10px"};
    cursor: pointer;
    opacity: .5;
    z-index: 2;
`

const Wrapper=styled.div`
    height: 100%;
    display: flex;
`
const Slide=styled.div`
    height: 70vh;
    width: 100vw;
    display: flex;
    align-items: center;
    background-color: #${(props) => props.bg} ;
    transform: translateX(${(props)=>props.activeSlide * -100}vw);
    transition: all 1.5s ease;
`
const ImgContainer=styled.div`
    flex: 1;
    height: 100%;
`

const Image=styled.img`
    height: 100%;
`
const InfoContainer=styled.div`
    flex: 1;
    padding: 50px;
`
const Title = styled.h1`
    font-style: 70px; 
`
const Desc = styled.p`
    margin: 50px 0px;
    font-style: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-style: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const [slideIndex,setSlideIndex]= useState(0)

const handleSlideClick = (direction)=>{
    if(direction==="left" ){
        slideIndex > 0 ?  setSlideIndex(slideIndex => slideIndex - 1 ): setSlideIndex(2)
    }else if(direction==="right"   ){
        slideIndex < 2 ? setSlideIndex(slideIndex=>slideIndex + 1) : setSlideIndex(0)

    }
}

  return (
    <Container>
        <Arrow direction = "left" onClick={()=>handleSlideClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper>
            {
                sliderItems.map(item => (
              
           <Slide key={item.id} bg={item.bg} activeSlide={slideIndex}>
                    <ImgContainer>
                        <Image src={item.img}></Image>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Button>SHOP NOW</Button>
        
                    </InfoContainer>
                   </Slide>
                ))
            }
          
        </Wrapper>
        <Arrow direction = "right" onClick={()=>handleSlideClick("right")}>
            <ArrowRightOutlined/>
        </Arrow>

    </Container>
  )
}

export default Slider