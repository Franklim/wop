import React, {useState, useEffect} from 'react'
import {Container,Form,Col,Button,Image,InputGroup,Modal} from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import {FaLock,FaUser} from 'react-icons/fa'

function Login(){

    const [user,setUser]=useState();
    const [login,setLogin]=useState("");
    const [password,setPassword]=useState("");

    const [showModalLogin, setShowModalLogin] = useState(false);

    useEffect(()=>{
       
    },[])

    async function handleAuth(e){
        e.preventDefault()
                
        try {

            if(!user){
                
            }else{
                setShowModalLogin(true)
            }
            clearFields()    
            
        } catch (error) {
            
        }
    }

    function clearFields(){
        setLogin("")
        setPassword("");
    }

    return(        
    <Container>
        <Form onSubmit={handleAuth} className="border border-info" >
            <Form.Row style={{display:'flex',justifyContent:"center", alignItems:"center",height: '100vh'}}>
                <Form.Group as={Col} md="3">
                    <Form.Label style={{display:'flex',justifyContent:"center"}}>SIGN IN</Form.Label>
                    
                    <InputGroup>
                        <InputGroup.Append>
                            <InputGroup.Text id="user"><FaUser/></InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control value={login} onChange={e=>setLogin(e.target.value)} required aria-describedby="user" placeholder="User"/>                               
                    </InputGroup>                           

                    <InputGroup style={{marginTop:5}}>
                        <InputGroup.Append>
                            <InputGroup.Text id="password"><FaLock/></InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control value={password} onChange={e=>setPassword(e.target.value)} type="password" required aria-describedby="password" placeholder="Password"/>                               
                    </InputGroup>                           
                    
                    <Button style={{width:"100%", marginTop:5}}  variant="primary" type="submit">Submit</Button>
                </Form.Group>
                <Form.Group style={{display:'flex',justifyContent:"center"}} as={Col} md="3">
                    <Image style={{width:"50%"}} src={Logo} rounded />
                </Form.Group>
            </Form.Row>
        </Form>
        <Modal show={showModalLogin} onHide={()=>setShowModalLogin(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Login info</Modal.Title>
            </Modal.Header>
                <Modal.Body>Unauthorized to connect.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShowModalLogin(false)}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal> 
    </Container> 
    );
}

export default Login;