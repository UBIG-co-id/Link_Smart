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
        <h5 className="title">Set Nilai KKM</h5>
        <div className='mt-4'>
          <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Col md="6">
            <div className="form-group">
            <label className="form-label">Pilih Mata Pelajaran</label>
            <div>
            <RSelect
                options={filterMpl}
                value={{
                  value: formData?.mapel || '',
                  label: formData?.mapel || '',
                }}
                onChange={(e) => setFormData({ ...formData, mapel: e.value })}
              />

            </div>
            </div>
            <Col md="6">
              <div className='form-group'>
              <label className="form-label">Nilai KKM</label>
              <input
              className="form-control"
              type="number"
              {...register('nilai_kkm', { required: "This field is required" })}
              value={formData?.nilai_kkm || ''}
              onChange={(e) => setFormData({ ...formData, nilai_kkm: e.target.value })}
              placeholder="Enter nilai kkm"
            />

                    {errors.nilai_kkm && <span className="invalid">{errors.nilai_kkm.message}</span>}
              </div>
            </Col>
            </Col>
            <Col size="12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Tambah KKM
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