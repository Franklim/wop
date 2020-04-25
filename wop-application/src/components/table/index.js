import React from 'react'
import{Table} from 'react-bootstrap'

export const TableList = (props) => {

    const {listItens,columnsNames,columnValues} = props    
    
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
                    <tr>
                        {columnValues.map(value => (                            
                            <td>{item[value]}</td>                                                            
                        ))} 
                    </tr>                   
                ))}
            </tbody>
        </Table>
    )
}