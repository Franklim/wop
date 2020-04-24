import React from 'react'
import {Modal,Button} from 'react-bootstrap'

export const ModalInfo = (props) => {
    const {show, closeModalFunction, title, message} = props
    
    return(
        <div>
            <Modal show={show} onHide={()=>closeModalFunction()} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> closeModalFunction()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>      
        </div>
    )

}

export const ModalActionConfirmation = (props) => {
    const {show, closeModalFunction, title, message, actionName, actionFunction} = props
    
    return(
        <div>
            <Modal show={show} onHide={()=>closeModalFunction()} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={actionFunction}>
                        {actionName}
                    </Button>
                    <Button variant="secondary" onClick={()=> closeModalFunction()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>      
        </div>
    )

}