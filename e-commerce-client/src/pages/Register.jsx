import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
width: 100vw;
height: 100vh;
background:  linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.3)
    
    ) ,url("https://media.istockphoto.com/photos/stack-of-neatly-folded-dark-clothes-isolated-on-a-black-gray-closeup-picture-id1222812626?b=1&k=20&m=1222812626&s=170667a&w=0&h=J186Pnd-2ADlO6k3oGMIT7QH7PRTnwDE6vZdqdRECRI=");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({
      width:"75%"
    })}

`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`

const Form = styled.form`

display: flex;
flex-wrap: wrap;
`


const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin:20px 10px 0 0;
    padding: 10px;
`


const Agreement = styled.span`
    font: 14px;
    margin: 20px 0;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`


const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="name"></Input>
                    <Input placeholder="last name"></Input>
                    <Input placeholder="username"></Input>
                    <Input placeholder="email"></Input>
                    <Input placeholder="password"></Input>
                    <Input placeholder="confirm password"></Input>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in acordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register