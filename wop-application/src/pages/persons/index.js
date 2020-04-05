import React, {useState} from 'react';
import Menu from '../../components/menu'
import {Col,Form, Button} from 'react-bootstrap'
import api from '../../services/api'
const constants = require('../../utils/StatesNames')

function Persons(){

    const [name, setName] = useState("") 
    const [address, setAddress] = useState("") 
    const [number, setNumber] = useState("") 
    const [district, setDistrict] = useState("") 
    const [city, setCity] = useState("") 
    const [state, setState] = useState([]) 
    const [zipcode, setZipcode] = useState("") 
    const [complement, setComplement] = useState("") 
    const [mail, setMail] = useState("") 
    const [phone, setPhone] = useState("") 
    const [whatsapp, setWhatsapp] = useState("") 

    function clearFields(){
        setName("")
        setAddress("")
        setNumber("")
        setDistrict("")
        setCity("")
        setZipcode("")
        setComplement("")
        setMail("")
        setPhone("")
        setWhatsapp("")
        setState(constants.STATES)
    };        

    async function handleInsert(e){
        e.preventDefault()
        const data = {
            name,
            address,
            number,
            district,
            city,
            state,
            zipcode,
            complement,
            mail,
            phone,
            whatsapp
        }

        const response = await api.post('persons', data)
        clearFields();
    }
    console.log(constants.STATES)
    return(
        <div>
        <Menu/>
        <Form style={{margin:20}} onSubmit={handleInsert}>
            <Form.Row style={{marginTop:20}}>
                <Form.Group as={Col} md="3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required value={name} onChange={e=> setName(e.target.value)} placeholder="Insert person name" />
                </Form.Group>                
                <Form.Group as={Col} md="2">
                    <Form.Label>Document</Form.Label>
                    <Form.Control disabled placeholder="AVALIABLE SOON" />
                </Form.Group>                
            </Form.Row>
                       
            <Form.Row >
                <Form.Group as={Col} md="3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control required value={mail} onChange={e=> setMail(e.target.value)} placeholder="Insert mail" />
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={phone} onChange={e=> setPhone(e.target.value)} placeholder="Insert phone number" />
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>Whatsapp</Form.Label>
                    <Form.Control value={whatsapp} onChange={e=> setWhatsapp(e.target.value)} placeholder="Insert whatsapp number" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required value={address} onChange={e=> setAddress(e.target.value)} placeholder="Insert address" />
                </Form.Group>
                <Form.Group as={Col} md="1">
                    <Form.Label>Number</Form.Label>
                    <Form.Control required value={number} onChange={e=> setNumber(e.target.value)} placeholder="Number" />
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>District</Form.Label>
                    <Form.Control required value={district} onChange={e=> setDistrict(e.target.value)} placeholder="Insert district" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="2">
                    <Form.Label>City</Form.Label>
                    <Form.Control required value={city} onChange={e=> setCity(e.target.value)} placeholder="Insert city" />
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>State</Form.Label>
                    <Form.Control required as="select" value={state} onChange={e=> setState(e.target.value)}>
                        {constants.STATES.map(state=>(
                            <option>{state}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control required value={zipcode} onChange={e=> setZipcode(e.target.value)} placeholder="Insert zipcode" />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Complement</Form.Label>
                    <Form.Control value={complement} onChange={e=> setComplement(e.target.value)} placeholder="Address complemnt" />
                </Form.Group>
            </Form.Row>
                    
            <Button style={{width:'80px'}}  variant="outline-success" type="submit">Save</Button>
            <Button style={{width:'80px', marginLeft:10}}  variant="outline-danger" onClick={()=>clearFields()} >Cancel</Button>
        </Form>
        </div>
    );
}

export default Persons;