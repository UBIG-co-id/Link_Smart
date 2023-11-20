import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  Form,
  Row,
  Col,
} from 'reactstrap'
import {
  Icon,
  // Col,
  Button,
  RSelect
} from '../../Component'
import { useForm } from 'react-hook-form'
import Dropzone from "react-dropzone";

const AddAksesEdit = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus, filterJk }) => {
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
          <h5 className="title">Akses Perjenjang</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterJk}
                      value={{
                        value: formData.jk,
                        label: formData.jk,
                      }}
                      onChange={(e) => setFormData({ ...formData, jk: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Jenjang</label>
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
                      Tambah Pegawai
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

export default AddAksesEdit
