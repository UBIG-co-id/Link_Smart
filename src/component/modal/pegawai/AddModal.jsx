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
          <h5 className="title">Tambah Pegawai</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">NIP</label>
                  <input
                    className="form-control"
                    type="number"
                    {...register('nip', { required: "This field is required" })}
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    placeholder="Enter NIP" />
                  {errors.nip && <span className="invalid">{errors.nip.message}</span>}
                </div>
                <Col md="13">
                  <div className="form-group">
                    <label className="form-label">NUPTK</label>
                    <input
                      className="form-control"
                      type="number"
                      {...register('nuptk', { required: "This field is required" })}
                      value={formData.nuptk}
                      onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                      placeholder="Enter NUPTK" />
                    {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>}
                  </div>
                </Col>
              </Col>

              <Col sm="6">
                <label className="form-label">Foto Data Dari PTK</label>
                <Dropzone
                  onDrop={(acceptedFiles, e) => {
                    e.preventDefault(); // Ini akan mencegah perilaku default
                    handleDropChange(acceptedFiles, setFiles4);
                  }}
                  accept={[".jpg", ".png", ".svg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {files4.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button color="primary">SELECT</Button>
                          </div>
                        )}
                        {files4.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('nama', { required: "This field is required" })}
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      placeholder="Enter Nama Lengkap" />
                    {errors.nama && <span className="invalid">{errors.nama.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Jenis Kelamin</label>
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
                  <label className="form-label">Status PTK</label>
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
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">No Telp</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="number"
                      {...register('notelp', { required: "This field is required" })}
                      value={formData.notelp}
                      onChange={(e) => setFormData({ ...formData, notelp: e.target.value })}
                      placeholder="Enter No Telpon" />
                    {errors.notelp && <span className="invalid">{errors.notelp.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="email"
                      {...register('email', { required: "This field is required" })}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter Email" />
                    {errors.email && <span className="invalid">{errors.email.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Tempat Lahir</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('tlahir', { required: "This field is required" })}
                      value={formData.tlahir}
                      onChange={(e) => setFormData({ ...formData, tlahir: e.target.value })}
                      placeholder="Enter Tempat Lahir" />
                    {errors.tlahir && <span className="invalid">{errors.tlahir.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Tanggal Lahir</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="date"
                      {...register('tgllahir', { required: "This field is required" })}
                      value={formData.tgllahir}
                      onChange={(e) => setFormData({ ...formData, tgllahir: e.target.value })}
                      placeholder="Enter Tanggal Lahir"
                    />
                    {errors.tgllahir && <span className="invalid">{errors.tgllahir.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Tanggal Mulai Tugas</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="date"
                      {...register('tglmt', { required: "This field is required" })}
                      value={formData.tglmt}
                      onChange={(e) => setFormData({ ...formData, tglmt: e.target.value })}
                      placeholder="Enter Tanggal Mulai Tugas"
                    />
                    {errors.tglmt && <span className="invalid">{errors.tglmt.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">NIK</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="number"
                      {...register('nik', { required: "This field is required" })}
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      placeholder="Enter NIK" />
                    {errors.nik && <span className="invalid">{errors.nik.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Alamat</label>
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

export default AddModal
