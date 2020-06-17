import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RentalUpdateModal = (props) => {
    const {
        buttonLabel,
        className,
        handleUpdateRental,
        onChangeCity,
        onChangeStreet,
        onChangeCategory,
        onChangeBedrooms,
        onChangeDailyRate,
        city,
        street,
        category,
        bedrooms,
        dailyRate,
    } = props;

    const [modal, setModal]= useState(false);
    const toggle=() => setModal(!modal);

    return (
        <div>
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Editer</ModalHeader>
                <form
                    id="updateRental-form"
                    onSubmit={handleUpdateRental}
                    methode= "PATCH"
                    >
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="title">City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                defaultValue={city}
                                onChange={onChangeCity}
                            />
                        </div> 
                        <div className="form-group">
                            <label htmlFor="title">Street</label>
                            <input
                                type="text"
                                className="form-control"
                                name="street"
                                defaultValue={street}
                                onChange={onChangeStreet}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                name="category"
                                defaultValue={category}
                                onChange={onChangeCategory}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Bedrooms</label>
                            <input
                                type="number"
                                className="form-control"
                                name="bedrooms"
                                defaultValue={bedrooms}
                                onChange={onChangeBedrooms}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                name="dailyRate"
                                defaultValue={dailyRate}
                                onChange={onChangeDailyRate}
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
                        <Button color="primary" type="submit" onClick={handleUpdateRental} disabled={props.loading}>
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

export default RentalUpdateModal;