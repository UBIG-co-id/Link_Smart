import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalBody,
    Form,
} from 'reactstrap'
import {
  Icon,
  Col,
  Button,
  RSelect
} from '../../Component'
import { useForm } from 'react-hook-form'
import Dropzone from "react-dropzone";

const AddModal = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus, filterJk }) => {
    const [files4, setFiles] = useState([]);

    useEffect(() => {
        reset(formData)
    }, [formData]);
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const handleDropChange = (acceptedFiles, setFiles) => {

    setFiles(acceptedFiles);

    const selectedFile = acceptedFiles[0];

    setFormData({
        ...formData,
        fotoData: selectedFile,
      });
};

return (
    <Modal  isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
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
                <h5 className="title">Peringatan</h5>
                <div className="mt-4">
                    <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Col md="6">
                            <div className="form-group">
                                <label className="form-label">Anda yakin ingin membuat jadwal mapel sama dengan tahun ajaran sebeelumnya</label>
                            </div>
                        </Col>
                        <Col size="6">
                            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                <li>
                                    <Button color="primary" size="md" type="submit">
                                        Yes
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
                                        CANCEL
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

export default AddModal