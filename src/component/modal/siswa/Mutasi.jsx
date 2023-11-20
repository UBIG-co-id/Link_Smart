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

const Mutasi = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus, filterJk }) => {
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
          <h5 className="title">Tambah Mutasi Siswa</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Col md="12">
                <div className="form-group">
                  <label className="form-label">Tanggal</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="date"
                      {...register('tgl', { required: "This field is required" })}
                      value={formData.tgl}
                      onChange={(e) => setFormData({ ...formData, tgl: e.target.value })}
                      placeholder="Enter Tanggal Lahir"
                    />
                    {errors.tgl && <span className="invalid">{errors.tgl.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">NIS - Nama Lengkap</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('nisnam', { required: "This field is required" })}
                      value={formData.nisnam}
                      onChange={(e) => setFormData({ ...formData, nisnam: e.target.value })}
                      placeholder="Enter Nama Lengkap" />
                    {errors.nisnam && <span className="invalid">{errors.nisnam.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Kelas</label>
                  <div className="form-control-wrap">
                    <input disabled
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
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Jenis Surat</label>
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
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Tahun </label>
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
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">Alasan Surat (Deskripsi)</label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control"
                      {...register('alamat', { required: "This field is required" })}
                      value={formData.alamat}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      placeholder=""
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

export default Mutasi
