import React,{useState,useEffect} from 'react'
import Menu from '../../components/menu'
import {Form,Col,Pagination,Button} from 'react-bootstrap'
import api from '../../services/api'
import {ModalInfo,ModalActionConfirmation} from '../../components/modals'
import {TableList} from '../../components/table'

function Users(){
    const columnsNames = ["Id","Login","Group","Person","Active","Remove"];
    const columnValues = ["id","login","groupName","personName","active"];

    const [persons,setPersons]=useState([])
    const [groups,setGroups]=useState([])
    const [users,setUsers]=useState([])

    const [id,setId]=useState(0)
    const [password,setPassword]=useState("")
    const [active,setActive]=useState(true)
    const [personName,setPersonName]=useState("")
    const [groupName,setGroupName]=useState("")
    const [login,setLogin]=useState("")

    const [tempId, setTempId] = useState("") 
    const [tempLogin, setTempLogin] = useState("") 

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [msgError, setMsgError] = useState("")

    const [activePage,setActivePage] = useState(1)
    const [pages,setPages] = useState([])
    const [actualize,setActualize]=useState(true)

    useEffect(()=>{
      
        api.get('groups').then(response=>{
            setGroups(response.data.groups)
            setGroupName(response.data.groups[0].name)
        })

        api.get('persons').then(response=>{
            setPersons(response.data.persons)
            setPersonName(response.data.persons[0].name)
        })

        api.get('users?page='+ activePage).then(response=>{
            const total = response.headers['x-total-count'];
            
            let tempPages = []
            for(let i = total; i > 0; i = i-5 ){
                tempPages.push(<Pagination.Item key={tempPages.length} active={tempPages.length+1 == activePage}>{tempPages.length+1}</Pagination.Item>)
            }
            setPages(tempPages)
            setUsers(response.data.users)
        })

    },[actualize])

    async function handleInsert(e){
        e.preventDefault()

        const groupId = groups.find(group => group.name === groupName).id;
        const personId = persons.find(person => person.name === personName).id;
        
        const data={
            login,
            password,
            active,
            personId,
            groupId
        }

        try {
           
            if(!id>0){
                await api.post("users", data)                
            }else{
                await api.put("users/"+ id, data)
            }

            setTempLogin(data.login)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);

        } catch (error) {
            setMsgError("Cannot insert new user. " + error)
            setShowModalError(true)           
        }
    }

    async function handleDelete(e){
        e.preventDefault()
        try {
            await api.delete('users/'+tempId)
            clearFields();
            setActualize(!actualize);
            setShowModalDelete(false);  
        } catch (error) {
            setMsgError("Cannot delete user. " + error)
            setShowModalError(true)
        }
    }

    function handleEditClick(user){
        setId(user.id)
        setLogin(user.login)
        setPassword(user.password)
        setActive(user.active)
        setPersonName(user.personName)
        setGroupName(user.groupName)
    }

    function handleFilter(e){
        const num = e.target.text
        if(num){
            setActivePage(num)   
            setActualize(!actualize);                             
        }
    }

    function prepareToDelete(user){
        setTempId(user.id);
        setTempLogin(user.login)
        setShowModalDelete(true);           
    }

    function clearFields(){
        setId("")
        setLogin("")
        setPassword("")
        setActive(true);        
        setGroupName(groups)
        setPersonName(persons)          
    }

    return(
        <div>
            <Menu/>
            <Form style={{margin:20}} onSubmit={handleInsert}>
                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>Login</Form.Label>
                        <Form.Control required value={login} onChange={e=>setLogin(e.target.value)} placeholder="Insert login"/>
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Insert password"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label/>
                        <Form.Check value={active}  checked={active} defaultChecked={true} onChange={e=>setActive(e.target.checked)} style={{margin:15}} type="switch" id="custom-switch" label="Active" />
                    </Form.Group>
                </Form.Row>                    
                <Form.Row>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Person</Form.Label>
                        <Form.Control required as="select"  value={personName} onChange={e=> setPersonName(e.target.value)}>
                            {persons.map(person=><option>{person.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Group</Form.Label>
                        <Form.Control required as="select" value={groupName} onChange={e=> setGroupName(e.target.value)}>
                            {groups.map(group=><option>{group.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button style={{width:'80px'}}  variant="outline-success" type="submit">Save</Button>
                <Button style={{width:'80px', marginLeft:10}}  variant="outline-danger" onClick={()=>clearFields()} >Cancel</Button>
            </Form>

            <Pagination onClick={handleFilter} style={{marginBottom:0, marginLeft:'25%'}} size="sm" >
                {pages}
            </Pagination>

            <TableList 
                listItens ={users} 
                columnsNames={columnsNames} 
                columnValues={columnValues}            
                updateFunction={handleEditClick}
                deleteFunction={prepareToDelete}
            />                

            <ModalActionConfirmation 
                show={showModalDelete} 
                closeModalFunction={()=> setShowModalDelete(false)} 
                title="Delete User"
                message={"Confirm delete user '"+tempLogin+"'?"}
                actionName="Delete"
                actionFunction={handleDelete} 
            />

            <ModalInfo 
                show={showModalInsert} 
                closeModalFunction={()=> setShowModalInsert(false)} 
                title="Insert User"
                message={"User "+tempLogin+" inserted."} 
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

export default Users;