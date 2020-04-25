import React, {useState,useEffect} from 'react'
import Menu from  '../../components/menu'
import {Form, Button, Table, Pagination} from 'react-bootstrap'
import api from '../../services/api'
import {ModalInfo, ModalActionConfirmation} from '../../components/modals'
import {TableList} from '../../components/table'

function Groups(){

    const columnsNames = ["Id","Group","Permissions","Remove"];
    const columnValues = ["id","name","permissions"];

    const [groups, setGroups] = useState([]);
    
    const [id,setId]=useState(0)
    const [name,setName] = useState('');
    const [permission,setPermission] = useState('');
    
    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');
    
    const [actualize, setActualize] = useState(false)

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [msgError, setMsgError] = useState("")

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
        setShowModalDelete(true)       
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
            setMsgError("Cannot insert new group. " + error)
            setShowModalError(true)
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
            setMsgError("Cannot delete group. " + error)
            setShowModalError(true)
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

            <TableList 
                listItens ={groups} 
                columnsNames={columnsNames} 
                columnValues={columnValues}            
                updateFunction={handleEditClick}
                deleteFunction={prepareToDelete}
            />                            
                        
            <ModalActionConfirmation 
                show={showModalDelete} 
                closeModalFunction={()=> setShowModalDelete(false)} 
                title="Delete Group"
                message={"Confirm delete group '"+tempName+"'?"}
                actionName="Delete"
                actionFunction={handleDelete} 
            />                      

            <ModalInfo 
                show={showModalInsert} 
                closeModalFunction={()=> setShowModalInsert(false)} 
                title="Insert User"
                message={"Group '"+tempName+"' inserted."} 
            />

            <ModalInfo 
                show={showModalError} 
                closeModalFunction={()=> setShowModalError(false)} 
                title="Error!"
                message={msgError} 
            />                                           
        </div>
    );        
}

export default Groups;