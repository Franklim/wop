import React, {useState,useEffect} from 'react'
import Menu from  '../../components/menu'
import {Form, Button, Table, Modal, Pagination} from 'react-bootstrap'
import api from '../../services/api'
import { FiTrash2, FiEdit } from "react-icons/fi";

function Groups(){

    const [groups, setGroups] = useState([]);
    
    const [name,setName] = useState('');
    const [permission,setPermission] = useState('');
    
    const [actualize, setActualize] = useState(false)

    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');
    const [tempPermission, setTempPermission] = useState('');

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [pages, setPages] = useState([])
    const [activePage, setActivePage] = useState(1)

    useEffect(()=>{
        
        api.get('groups?page='+activePage).then(response =>{
            setGroups(response.data.groups)
            const total = response.headers['x-total-count'];
            
            let tempPages = []
            for(let i = total; i > 0; i = i-5 ){
                tempPages.push(<Pagination.Item key={tempPages.length} active={tempPages.length+1 == activePage}>{tempPages.length+1}</Pagination.Item>)
            }
            setPages(tempPages)
            
        })
    }, [actualize])
      
    function clearFields(){
        setName('');
    }    
    
    function prepareToEdit(group){
        setTempId(group.id)
        setTempName(group.name)
        setTempPermission(group.permission)
        setShowModalEdit(true);
    
    };

    function prepareToDelete(group){
        setTempId(group.id)
        setTempName(group.name)
        setTempPermission(group.permission)
        setShowModalDelete(true);           
    };

    function handleFilter(e) {
        const num = e.target.text
        if(num){
            setActivePage(num)   
            setActualize(!actualize);                             
            
        }   
        
    };
    
    async function handleInsert(e){
        e.preventDefault();
        const data = {
            name
        }

        try {
            await api.post('groups', data);
            setTempName(data.name)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);
            
        } catch (error) {
            alert("Cannot insert a new group. Error:" + error)    
        }
    }
    async function handleEdit(e){
        e.preventDefault();

        const data = {
            name:tempName,
            permissions:tempPermission
        }
        await api.put('groups/'+tempId, data)
        setActualize(!actualize);
        setShowModalEdit(false);        
    }
    async function handleDelete(e){
        e.preventDefault()
        await api.delete('groups/'+tempId);
        setActualize(!actualize);
        setShowModalDelete(false);    
    }         
    
    return(
        <div>
            <Menu/>
            
            <Form style={{margin:20, width:'25%'}} onSubmit={handleInsert}>
                    <Form.Group style={{marginTop:20}}>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control required value={name} onChange={e=> setName(e.target.value)} placeholder="Insert the group name" />
                        <Form.Label style={{marginTop:20}}>Permissions</Form.Label>
                        <Form.Control disabled value={permission} onChange={e=> setPermission(e.target.value)} placeholder="Insert the permissions - TEMPORARY DISABLED" />
                    </Form.Group>
                    
                    <Button style={{width:'80px'}}  variant="outline-success" type="submit">Save</Button>
                    <Button style={{width:'80px', marginLeft:10}}  variant="outline-danger" onClick={()=>clearFields()} >Cancel</Button>
            </Form>
           
            <Pagination onClick={handleFilter} style={{marginBottom:0, marginLeft:'25%'}} size="sm" >
                {pages}
            </Pagination>
            <Table style={{marginLeft:20, width:'50%'}}  striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Group</th>
                        <th>Permission</th>
                        <th>Actions</th>                        
                    </tr>
                </thead>
 
                    <tbody>
                        {groups.map(group=> (
                            <tr key={group.id}>
                                <th style={{width:'5%'}} id="id" scope="row">{group.id}</th>
                                <td style={{width:'25%'}} id="name">{group.name}</td>
                                <td id="permissions">{group.permissions}</td>
                                <td style={{width:'15%'}}>
                                    <button className="btn btn-light btn-sm" onClick={() => {prepareToEdit(group)}} style={{ marginRight: "10px" }}><FiEdit/></button>
                                    <button className="btn btn-danger btn-sm" onClick={() => {prepareToDelete(group)} }> <FiTrash2/> </button>
                                </td>
                            </tr>
                            )
                        )}
                    </tbody>
                
            </Table>
            
            <Modal show={showModalEdit} onHide={()=>setShowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Group</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form.Label>Group</Form.Label>
                    <Form.Control  value={tempName} onChange={e=> setTempName(e.target.value)}  />

                    <Form.Label style={{marginTop:20}}>Permissions</Form.Label>
                    <Form.Control disabled  value={tempPermission} onChange={e=> setTempPermission(e.target.value)}  />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={()=> setShowModalEdit(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalDelete} onHide={()=>setShowModalDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Group</Modal.Title>
                </Modal.Header>
                    <Modal.Body>Confirm delete group "{tempName}"?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={()=>setShowModalDelete(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>      

            <Modal show={showModalInsert} onHide={()=>setShowModalInsert(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert Group</Modal.Title>
                </Modal.Header>
                    <Modal.Body>Group "{tempName}" inserted.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowModalInsert(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>            
                                           
        </div>
    );        
}

export default Groups;