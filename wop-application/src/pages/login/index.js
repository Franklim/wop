import React from 'react'
import {Container,Form,Col,Button,Image,InputGroup} from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import {FaLock,FaUser} from 'react-icons/fa'

function Login(){
    return(        
    <Container>
        <Form className="border border-info" >
            <Form.Row style={{display:'flex',justifyContent:"center", alignItems:"center",height: '100vh'}}>
                <Form.Group as={Col} md="3">
                    <Form.Label style={{display:'flex',justifyContent:"center"}}>SIGN IN</Form.Label>
                    
                    <InputGroup>
                        <InputGroup.Append>
                            <InputGroup.Text id="user"><FaUser/></InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control require aria-describedby="user" placeholder="User"/>                               
                    </InputGroup>                           

                    <InputGroup style={{marginTop:5}}>
                        <InputGroup.Append>
                            <InputGroup.Text id="password"><FaLock/></InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control require aria-describedby="password" placeholder="Password"/>                               
                    </InputGroup>                           
                    
                    <Button style={{width:"100%", marginTop:5}}>Submit</Button>
                </Form.Group>
                <Form.Group style={{display:'flex',justifyContent:"center"}} as={Col} md="3">
                    <Image style={{width:"50%"}} src={Logo} rounded />
                </Form.Group>
            </Form.Row>
        </Form>
    </Container>        
    );
}

export default Login;