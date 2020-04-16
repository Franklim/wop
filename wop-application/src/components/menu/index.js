import React from 'react';
import {useHistory} from 'react-router-dom'
import{Navbar,Nav,NavDropdown,Form, FormText, Button} from 'react-bootstrap'
import { FiPower} from "react-icons/fi";
import { FaHome } from "react-icons/fa";

function Menu(){

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
                        <FormText> {login} </FormText>
                        <Button onClick={handleLogOut} style={{marginLeft:15}} variant="outline-danger" size="sm"><FiPower/></Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>            
        </div>
    );
}

export default Menu;