import React, {useState,useEffect} from 'react'
import Menu from  '../../components/menu'
import {Form, Button, Table, Alert} from 'react-bootstrap'
import api from '../../services/api'
import { FiTrash2, FiEdit } from "react-icons/fi";

function Groups(){

    const [name,setName] = useState('');
    const [groups, setGroups] = useState([]);
    
    useEffect(()=>{
        loadGroups();
    }, [groups])

    async function loadGroups(){
        const response = await api.get('groups');
        setGroups(response.data.groups)
    }
   
    async function handleGroups(e){
        e.preventDefault();
        const data = {
            name
        }

        try {
            const response = await api.post('groups', data);
            alert("Group inserted. Id: " + response.data.id)
            
            clearFields();
            

        } catch (error) {
            alert("Cannot insert a new group. Error:" + error)    
        }
    }

    function clearFields(){
        setName('');
    }
    
        return(
            <div>
                <Menu/>
                
                <Form style={{margin:20}} onSubmit={handleGroups}>
                        <Form.Group>
                            <Form.Control style={{width:'30%'}} value={name} onChange={e=> setName(e.target.value)} placeholder="Insert the group name" />
                        </Form.Group>
                        <Button variant="outline-success" type="submit">Save</Button>
                        <Button variant="outline-danger" onClick={()=>clearFields()} style={{marginLeft:10}}>Cancel</Button>
                </Form>
                
                <Table style={{marginTop:20}} striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Group</th>
                            <th>Permission</th>
                            <th>Actions</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group=> (
                            <tr key={group.id}>
                                <th id="id" scope="row">{group.id}</th>
                                <td id="name">{group.name}</td>
                                <td id="permissions">{group.permissions}</td>
                                <td>
                                    <button className="btn btn-light btn-sm" onClick={() => { if (window.confirm('Deseja editar o grupo "' + group.name + '"?')) alert("Edit") }} style={{ marginRight: "10px" }}><FiEdit/></button>
                                    <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Deseja realmente deletar o grupo "' + group.name + '"?')) alert("Delete") }}> <FiTrash2/> </button>
                                </td>
                            </tr>
                            )
                        )}
                    </tbody>
                </Table>                
                                   
            </div>
        );        
}

export default Groups;