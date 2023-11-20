import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  Form,
  Input,
} from 'reactstrap'
import {
  Icon,
  Col,
  Button,
  RSelect
} from '../../Component'
import { useForm } from 'react-hook-form'
import Dropzone from "react-dropzone";

const AddModal = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus, filterPtk, filterThn }) => {
  const [files4, setFiles4] = useState([]);
  const [defaultFiles, setDefaultFiles] = useState("");

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
          <h5 className="title">Tambah Mutasi PTK</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Tanggal</label>
                  <input
                    className="form-control"
                    type="date"
                    {...register('tgl', { required: "This field is required" })}
                    value={formData.tgl}
                    onChange={(e) => setFormData({ ...formData, tgl: e.target.value })}
                    placeholder="Enter Tanggal" />
                  {errors.tgl && <span className="invalid">{errors.tgl.message}</span>}
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">PTK</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterPtk}
                      value={{
                        value: formData.ptk,
                        label: formData.ptk,
                      }}
                      onChange={(e) => setFormData({ ...formData, ptk: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Tahun</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterThn}
                      value={{
                        value: formData.thn,
                        label: formData.thn,
                      }}
                      onChange={(e) => setFormData({ ...formData, thn: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Alasan Mutasi</label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control"
                      {...register('alamat', { required: "This field is required" })}
                      value={formData.alamat}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      placeholder="Enter Alamat"
                    />
                    {errors.alamat && <span className="invalid">{errors.alamat.message}</span>}
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label className="form-label">File Max 5 Mb</label>
                  <div className="form-control-wrap">
                    <div className="form-file">
                      <Input
                        type="file"
                        id="customFile"
                        onChange={(e) => setDefaultFiles(e.target.files[0].name)}
                      />
                    </div>
                  </div>
                </div>
              </Col>
             
              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      Tambah Mutasi
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
