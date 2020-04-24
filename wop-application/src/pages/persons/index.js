import React, {useState, useEffect} from 'react';
import Menu from '../../components/menu'
import {Col,Form, Button, Table,Pagination,Modal} from 'react-bootstrap'
import {FiTrash2} from 'react-icons/fi'
import api from '../../services/api'
import {ModalInfo,ModalActionConfirmation} from '../../components/modals'
const constants = require('../../utils/Constants')

function Persons(){

    const [id,setId]=useState(0)
    const [name, setName] = useState("") 
    const [document, setDocument] = useState("") 
    const [address, setAddress] = useState("") 
    const [number, setNumber] = useState("") 
    const [district, setDistrict] = useState("") 
    const [city, setCity] = useState("") 
    const [state, setState] = useState(constants.STATES[0]) 
    const [country, setCountry] = useState("") 
    const [zipcode, setZipcode] = useState("") 
    const [complement, setComplement] = useState("") 
    const [mail, setMail] = useState("") 
    const [phone, setPhone] = useState("") 
    const [whatsapp, setWhatsapp] = useState("") 

    const [tempId, setTempId] = useState("") 
    const [tempName, setTempName] = useState("") 
    
    const [persons, setPersons] = useState([])

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [activePage,setActivePage] = useState(1)
    const [pages,setPages] = useState([])
    const [actualize,setActualize] = useState(true)

    useEffect(()=>{
        api.get('persons?page='+activePage).then(response =>{
            setPersons(response.data.persons)
            const total = response.headers['x-total-count'];
            
            let tempPages = []
            for(let i = total; i > 0; i = i-5 ){
                tempPages.push(<Pagination.Item key={tempPages.length} active={tempPages.length+1 == activePage}>{tempPages.length+1}</Pagination.Item>)
            }
            setPages(tempPages)
        
        });
        
    },[actualize])

    function clearFields(){
        setId("")
        setName("")
        setDocument("")
        setAddress("")
        setNumber("")
        setDistrict("")
        setCity("")
        setCountry("")
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
            document,
            address,
            number,
            district,
            city,
            state,
            country,
            zipcode,
            complement,
            mail,
            phone,
            whatsapp
        }

        try {
            if(!id > 0){
                await api.post('persons', data)
            }else{
                await api.put('persons/'+ id, data)
            }
            
            setTempName(data.name)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);
        } catch (error) {
            alert("Cannot insert a new person. Error:" + error)       
        }        
        
    }
    
    async function handleDelete(e){
        e.preventDefault()
        try {
            await api.delete('persons/'+tempId);
            clearFields();
            setActualize(!actualize);
            setShowModalDelete(false);       
        } catch (error) {
            alert("Cannot delete te person. Error: "+error)
        }        
    }
    
    function prepareToDelete(person){
        setTempId(person.id)
        setTempName(person.name)
        setShowModalDelete(true);           
    };


    function handleFilter(e) {
        const num = e.target.text
        if(num){
            setActivePage(num)   
            setActualize(!actualize);                             
        }   
        
    };

    function handleEditClick(person){
        setId(person.id)
        setName(person.name)
        setDocument(person.document)
        setAddress(person.address)
        setNumber(person.number)
        setDistrict(person.district)
        setCity(person.city)
        setZipcode(person.zipcode)
        setComplement(person.complement)
        setMail(person.mail)
        setPhone(person.phone)
        setWhatsapp(person.whatsapp)
        setState(person.state)
        setCountry(person.country)
        
    }

    
    return(
        <div>
        <Menu/>
        <Form style={{margin:20}} onSubmit={handleInsert}>
            <Form.Row style={{marginTop:20}}>
                <Form.Group as={Col} md="3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required value={name} onChange={e=> setName(e.target.value)} placeholder="Insert person name" />
                </Form.Group>  
                <Form.Group as={Col} md="3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control required value={mail} onChange={e=> setMail(e.target.value)} placeholder="Insert mail" />
                </Form.Group>                              
            </Form.Row>
                       
            <Form.Row >
                <Form.Group as={Col} md="2">
                    <Form.Label>Document</Form.Label>
                    <Form.Control required value={document} onChange={e=> setDocument(e.target.value)} placeholder="Insert person document" />
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
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={country} onChange={e=> setCountry(e.target.value)} placeholder="Insert country" />
                </Form.Group>                
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="2">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control required value={zipcode} onChange={e=> setZipcode(e.target.value)} placeholder="Insert zipcode" />
                </Form.Group>                
                <Form.Group as={Col} md="4">
                    <Form.Label>Complement</Form.Label>
                    <Form.Control value={complement} onChange={e=> setComplement(e.target.value)} placeholder="Address complemnt" />
                </Form.Group>
            </Form.Row>
                    
            <Button style={{width:'80px'}}  variant="outline-success" type="submit">Save</Button>
            <Button style={{width:'80px', marginLeft:10}}  variant="outline-danger" onClick={()=>clearFields()} >Cancel</Button>
        </Form>

        <Pagination onClick={handleFilter} style={{marginBottom:0, marginLeft:'25%'}} size="sm" >
                {pages}
        </Pagination>

        <Table style={{marginLeft:20, width:'50%'}}striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Document</th>
                <th>E-mail</th>
                <th>City</th>
                <th>Whatsapp</th>               
                <th>Actions</th>                        
            </tr>
        </thead>

            <tbody>
                {persons.map(person=> (
                    <tr onDoubleClick={()=> handleEditClick(person)} key={person.id}>
                        <th style={{width:'5%'}}  scope="row">{person.id}</th>
                        <td>{person.name}</td>
                        <td>{person.document}</td>
                        <td>{person.mail}</td>
                        <td>{person.city}</td>
                        <td>{person.whatsapp}</td>                        
                        <td><button className="btn btn-danger btn-sm" onClick={() => {prepareToDelete(person)} }> <FiTrash2/> </button></td>
                    </tr>
                    )
                )}
            </tbody>

        </Table>      
     
        <ModalActionConfirmation 
            show={showModalDelete} 
            closeModalFunction={()=> setShowModalDelete(false)} 
            title="Delete Person"
            message={"Confirm delete person '"+tempName+"'?"}
            actionName="Delete"
            actionFunction={handleDelete} />

        <ModalInfo 
            show={showModalInsert} 
            closeModalFunction={()=> setShowModalInsert(false)} 
            title="Insert User"
            message={"Person '"+tempName+"' inserted."} />

        </div>
    );
}

export default Persons;