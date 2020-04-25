import React from 'react'
import{Table,Button} from 'react-bootstrap'
import { FiTrash2 } from "react-icons/fi";

export const TableList = (props) => {

    const {listItens,columnsNames,columnValues,updateFunction,deleteFunction} = props    
    
    return(
        <Table style={{marginLeft:20, width:'50%'}}  striped bordered hover size="sm">
            <thead>
                <tr>
                    {columnsNames.map(columnName =>(                        
                        <th>{columnName}</th>                                             
                    ))} 
                </tr>               
            </thead>
            <tbody>
                {listItens.map(item=> (
                    <tr onDoubleClick={()=>updateFunction(item)} key={item.id}>
                        {columnValues.map(value => (                            
                            <td>{item[value]}</td>                                                            
                        ))}
                            <td style={{width:'10%'}}>
                                <Button className="btn btn-danger btn-sm" onClick={() => {deleteFunction(item)} }> <FiTrash2/> </Button>
                            </td> 
                    </tr>                   
                ))}
            </tbody>
        </Table>
    )
}