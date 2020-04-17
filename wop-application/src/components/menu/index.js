import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import{Navbar,Nav,NavDropdown,Form, FormText, Button, Modal} from 'react-bootstrap'
import { FiPower} from "react-icons/fi";
import { FaHome,FaUser } from "react-icons/fa";

function Menu(){

    const [showModalLogOut, setShowModalLogOut] = useState(false);

    const login = sessionStorage.getItem('login')
    const history = useHistory()

    function handleLogOut(){
        sessionStorage.removeItem('login')
        history.push('/')
    }
   
    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home"><FaHome/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="REGISTER" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/groups"> Groups </NavDropdown.Item>
                        <NavDropdown.Item href="/persons">Persons</NavDropdown.Item>
                        <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="OPERATION" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">New</NavDropdown.Item>
                        <NavDropdown.Item href="#">Load</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormText style={{fontSize:16}}> <FaUser/> {login} </FormText>
                        <Button onClick={()=>setShowModalLogOut(true)} style={{marginLeft:15}} variant="outline-danger" size="sm"><FiPower/></Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>        

            <Modal show={showModalLogOut} onHide={()=>setShowModalLogOut(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm exit</Modal.Title>
                </Modal.Header>
                    <Modal.Body>Do you want to exit?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleLogOut}>
                        Confirm
                    </Button>
                    <Button variant="secondary" onClick={()=>setShowModalLogOut(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>    
        </div>
    );
}

export default Menu;