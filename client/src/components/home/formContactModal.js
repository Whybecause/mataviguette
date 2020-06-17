import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FormContactModal = (props) => {
    const {
        buttonLabel,
        onChangeName,
        onChangeEmail,
        onChangeMessage,
        handleFormContact,
        name,
        email,
        message,
        className
    } = props;

    const [modal, setModal]= useState(false);
    const toggle=() => setModal(!modal);


    return (
        <div>
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Contacter l'hôte</ModalHeader>
                <form 
                id= "contact-form"
                onSubmit={handleFormContact}
                method="POST"
                >
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChangeName}
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                type="text"
                                className="form-control"
                                name="message"
                                value={message}
                                onChange={onChangeMessage}
                                placeholder="Message"
                            />
                        </div>
                        <div>
                            {props.alert && (
                            <div className={className ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {props.alert}
                            </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={handleFormContact} disabled={props.loading} className="btn btn-primary">
                        {props.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                            <span>Send</span>
                        </Button>{' '}
                        <Button color="danger" onClick={toggle} >Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default FormContactModal;
