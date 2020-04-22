import React from 'react'
import Menu from '../../components/menu'
import {Navbar,Form,FormText} from 'react-bootstrap'
import { DiReact, DiNodejsSmall, DiMysql, DiGithubBadge, DiBootstrap } from "react-icons/di";

function Home(){
    return(
        <div>
            <Menu/>
            <Navbar style={{display:'flex', justifyContent:'center'}} variant="light" bg="light" fixed="bottom">
                <Form inline>
                    <FormText style={{fontSize:8}}>POWERED WITH: </FormText>
                    <DiNodejsSmall size={30}/>
                    <DiReact size={30}/>
                    <DiBootstrap size={30}/>
                    <DiMysql size={30}/>
                    <a  style={{color:'inherit'}} 
                        href="https://github.com/Franklim/wop" 
                        target="_blank" 
                        rel="noopener noreferrer" >
                            <DiGithubBadge size={30}/>
                    </a>
                </Form>
            </Navbar>                       
        </div>
    );
}

export default Home;