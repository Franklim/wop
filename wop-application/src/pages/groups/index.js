import React, {useState,useEffect} from 'react'
import Menu from  '../../components/menu'
import {Form, Button, Table, Pagination} from 'react-bootstrap'
import api from '../../services/api'
import { FiTrash2 } from "react-icons/fi";
import {ModalInfo, ModalActionConfirmation} from '../../components/modals'

function Groups(){

    const [groups, setGroups] = useState([]);
    
    const [id,setId]=useState(0)
    const [name,setName] = useState('');
    const [permission,setPermission] = useState('');
    
    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');
    
    const [actualize, setActualize] = useState(false)

    const [showModalInsert, setShowModalInsert] = useState(false);
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
        setId("")
        setName("");
        setPermission("")
    }    
    
    function prepareToDelete(group){
        setTempId(group.id)
        setTempName(group.name)        
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
            if(!id>0){
                await api.post('groups', data);
            }else{
                await api.put('groups/'+id, data)
            }            
            setTempName(data.name)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);
            
        } catch (error) {
            alert("Cannot insert a new group. Error:" + error)    
        }
    }
    function handleEditClick(group){
        setId(group.id)
        setName(group.name);
        setPermission(group.permission)
    }
    async function handleDelete(e){
        e.preventDefault()
        try {
            await api.delete('groups/'+tempId);
            setActualize(!actualize);
            clearFields()
            setShowModalDelete(false);
        } catch (error) {
            alert("Cannot delete group. Error " + error)
        }
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
                            <tr onDoubleClick={()=>handleEditClick(group)} key={group.id}>
                                <th style={{width:'5%'}} id="id" scope="row">{group.id}</th>
                                <td style={{width:'25%'}} id="name">{group.name}</td>
                                <td id="permissions">{group.permissions}</td>
                                <td style={{width:'15%'}}>
                                    <button className="btn btn-danger btn-sm" onClick={() => {prepareToDelete(group)} }> <FiTrash2/> </button>
                                </td>
                            </tr>
                            )
                        )}
                    </tbody>
                
            </Table>                     
                        
            <ModalActionConfirmation 
            show={showModalDelete} 
            closeModalFunction={()=> setShowModalDelete(false)} 
            title="Delete Group"
            message={"Confirm delete group '"+tempName+"'?"}
            actionName="Delete"
            actionFunction={handleDelete} />                      

            <ModalInfo 
            show={showModalInsert} 
            closeModalFunction={()=> setShowModalInsert(false)} 
            title="Insert User"
            message={"Group '"+tempName+"' inserted."} />                      
                                           
        </div>
    );        
}

export default Groups;