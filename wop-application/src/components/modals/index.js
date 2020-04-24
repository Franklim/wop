import React,{useState} from 'react'
import {Modal,Button} from 'react-bootstrap'

export const ModalError = (props) => {
    const {showModal, closeModalFunction, title, message} = props
    
    return(
        <div>
            <Modal show={showModal} onHide={()=>closeModalFunction()} >
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