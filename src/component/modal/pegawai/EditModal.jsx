import React, { useEffect } from "react";
import {
    Modal,
    ModalBody,
    Form,
} from "reactstrap";
import { Icon, Col, Button, RSelect } from "../../Component";
import { useForm } from "react-hook-form";

const EditModal = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus }) => {
    useEffect(() => {
        reset(formData)
    }, [formData]);
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
            <ModalBody>
                <a
                    href="#cancel"
                    onClick={(ev) => {
                        ev.preventDefault();
                        closeModal()
                    }}
                    className="close"
                >
                    <Icon name="cross-sm"></Icon>
                </a>
                <div className="p-2">
                    <h5 className="title">Update User</h5>
                    <div className="mt-4">
                        <Form className="row gy-4" onSubmit={handleSubmit(onSubmit)}>
                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">NIP</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        {...register('nip', { required: "This field is required" })}
                                        value={formData.nip}
                                        onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                                        placeholder="Enter name" />
                                    {errors.nip && <span className="invalid">{errors.nip.message}</span>}
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Nama PTK</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        {...register('namaptk', {
                                            required: "This field is required",
                                        })}
                                        value={formData.namaptk}
                                        onChange={(e) => setFormData({ ...formData, namaptk: e.target.value })}
                                        placeholder="Enter namaptk" />
                                    {errors.namaptk && <span className="invalid">{errors.namaptk.message}</span>}
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Jenis Mutasi</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        {...register('jnmutasi', {
                                            required: "This field is required",

                                        })}
                                        value={formData.jnmutasi}
                                        onChange={(e) => setFormData({ ...formData, jnmutasi: e.target.value })}
                                        placeholder="Enter jnmutasi" />
                                    {errors.jnmutasi && <span className="invalid">{errors.jnmutasi.message}</span>}
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={filterStatus}
                                            value={{
                                                value: formData.status,
                                                label: formData.status,
                                            }}
                                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col size="12">
                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                    <li>
                                        <Button color="primary" size="md" type="submit">
                                            Update User
                                        </Button>
                                    </li>
                                    <li>
                                        <a
                                            href="#cancel"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                closeModal();
                                            }}
                                            className="link link-light"
                                        >
                                            Cancel
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Form>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )

}
export default EditModal;   