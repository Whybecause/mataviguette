import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SendMailRestPassword = (props) => {
    const {
        buttonLabel,
        email,
        onChangeEmail,
        handleSendResetPassword,
        className,
        confirming
    } = props;

    const [modal, setModal]= useState(false);
    const toggle=() => setModal(!modal);

    return (
        <div>
            <Button color="secondary" className="m-top-1 font-size-1" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Get Link To Change Password</ModalHeader>
                <form
                    id="handleSendResetPassword-form"
                    methode= "POST"
                    >
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="email">Enter your email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
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
                        <Button color="primary" type="submit" onClick={handleSendResetPassword} disabled={confirming}>
                            {confirming && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                                <span>Send</span>
                        </Button>{' '}
                        <Button color="danger" onClick={toggle} >Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    ) 
}

export default SendMailRestPassword;