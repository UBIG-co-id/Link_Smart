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

const AddModal = ({ modal, closeModal, onSubmit, formData, setFormData, filterMpl }) => {
  const [files4, setFiles4] = useState([]);

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
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg"is>
      <ModalBody>
        <a href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            closeModal()
          }}
          className="close">
           <Icon name="cross-sm"></Icon>
        </a>
        <div className='p-2'>
        <h5 className="title">Tambah Mata Pelajaran</h5>
        <div className='mt-4'>
          <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Col>
            <div className="form-group">
              <label className="form-label">Mata Pelajaran</label>
              <div className="form-control-wrap">
                <input
                   className="form-control"
                   type="text"
                   {...register('mapel', { required: "This field is required" })}
                   value={formData?.mapel || ''}
                   onChange={(e) => setFormData({ ...formData, mapel: e.target.value })}
                      placeholder="Ex: Matematika" />
                      {errors.mapel && <span className="invalid">{errors.mapel.message}</span>}
              </div>
            </div>
            <Col>
            <div className="form-group">
              <label className="form-label">Singkatan Mata Pelajaran</label>
              <div className="form-control-wrap">
                <input
                   className="form-control"
                   type="text"
                   {...register('singkat', { required: "This field is required" })}
                   value={formData?.singkat || ''}
                   onChange={(e) => setFormData({ ...formData, singkat: e.target.value })}
                      placeholder="Ex: MTK" />
                      {errors.singkat && <span className="invalid">{errors.singkat.message}</span>}
              </div>
            </div>
            </Col>
            </Col>
            <Col md="12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Tambah Mata Pelajaran
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
 export default AddModal