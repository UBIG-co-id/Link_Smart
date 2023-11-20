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

const AddModal = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus, filterWk, filterKls }) => {
  const [files4, setFiles4] = useState([]);

  useEffect(() => {
    reset(formData)
  }, [formData]);
  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const handleDropChange = (acceptedFiles, setFiles) => {
    // SetFiles di sini adalah untuk mengupdate state lokal di Dropzone
    setFiles(acceptedFiles);

    // Ambil informasi file pertama dari acceptedFiles
    const selectedFile = acceptedFiles[0];

    // Update state formData dengan informasi file gambar
    setFormData({
      ...formData,
      fotoData: selectedFile,
    });
  };

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
          <h5 className="title">Tambah Kelas</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Col md="4">
                <div className="form-group">
                  <label className="form-label">Kelas</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterKls}
                      value={{
                        value: formData.kls,
                        label: formData.kls,
                      }}
                      onChange={(e) => setFormData({ ...formData, kls: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="8">
                <div className="form-group">
                  <label className="form-label">Nama Kelas</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('nkls', { required: "This field is required" })}
                      value={formData.nkls}
                      onChange={(e) => setFormData({ ...formData, nkls: e.target.value })}
                      placeholder="Enter Nama Kelas" />
                    {errors.nkls && <span className="invalid">{errors.nkls.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Wali Kelas</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterWk}
                      value={{
                        value: formData.wk,
                        label: formData.wk,
                      }}
                      onChange={(e) => setFormData({ ...formData, wk: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label className="form-label">Kategori Kelas</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('nkls', { required: "This field is required" })}
                      value={formData.nkls}
                      onChange={(e) => setFormData({ ...formData, nkls: e.target.value })}
                      placeholder="Enter Nama Kelas" />
                    {errors.nkls && <span className="invalid">{errors.nkls.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="8">
                <div className="form-group">
                  <label className="form-label">Nominal SPP</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('nkls', { required: "This field is required" })}
                      value={formData.nkls}
                      onChange={(e) => setFormData({ ...formData, nkls: e.target.value })}
                      placeholder="Enter Nama Kelas" />
                    {errors.nkls && <span className="invalid">{errors.nkls.message}</span>}
                  </div>
                </div>
              </Col>
              
              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      Tambah Kelas
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
