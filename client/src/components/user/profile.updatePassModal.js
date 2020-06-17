import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const UpdatePassModal = (props) => {
    const {
        buttonLabel,
        onChangeOldPass,
        onChangePassword,
        onChangeConfirmNewPass,
        handleUpdatePassword,
        className
    } = props;

    const [modal, setModal]= useState(false);
    const toggle=() => setModal(!modal);

    return (
        <div>
        <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Change Password</ModalHeader>
            <form
                id="updatePassword-form"
                methode= "PATCH"
                >
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="oldPass">Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="oldPass"
                            value={props.oldPass}
                            onChange={onChangeOldPass}
                        />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={props.password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPass">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmNewPass"
                            value={props.confirmNewPass}
                            onChange={onChangeConfirmNewPass}
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
                    <Button color="primary" type="submit" onClick={handleUpdatePassword} disabled={props.loading}>
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

    )
}

export default UpdatePassModal;