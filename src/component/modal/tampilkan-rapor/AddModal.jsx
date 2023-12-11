import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalBody,
    Form,
    ModalHeader,
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
        <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-top" >
            <ModalHeader>
                
                <div className="p-1">
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
                    <h5 className="title">Informasi</h5>
                    <div className="mt-4">
                        

                            <div className="form-group">
                                <label className="form-label">Error:tidak ada siswa yang dipilih</label>
                            </div>

                        
                    </div>
                </div>
            </ModalHeader>
        </Modal>

    )
}

export default AddModal