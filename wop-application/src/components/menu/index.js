import React from 'react';
import{Navbar,Nav,NavDropdown,Form, FormText} from 'react-bootstrap'
import { DiReact, DiNodejsSmall, DiMysql, DiGithubBadge, DiBootstrap } from "react-icons/di";
import { FaHome } from "react-icons/fa";

function Menu(){
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><FaHome/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown title="REGISTER" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/groups">Groups</NavDropdown.Item>
                    <NavDropdown.Item href="/groups">Persons</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="OPERATION" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">New</NavDropdown.Item>
                    <NavDropdown.Item href="#">Load</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                    <FormText style={{fontSize:8}}>POWERED WITH: </FormText>
                    <DiNodejsSmall size={30}/>
                    <DiReact size={30}/>
                    <DiBootstrap size={30}/>
                    <DiMysql size={30}/>
                    <DiGithubBadge size={30}/>
                 </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;