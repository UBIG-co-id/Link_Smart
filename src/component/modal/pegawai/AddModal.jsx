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
  RSelect,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Block,
  PreviewAltCard
} from '../../Component'
import { useForm } from 'react-hook-form'
import Dropzone from "react-dropzone";
import Head from '../../../layout/Head';
import Content from '../../../layout/Content/Content';
import { filterStatus, filterJk } from '../../../component/user/UserData';
// import { Navigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const AddModal = () => {
  const navigate = useNavigate('');
  // const [data, setData] = useState([]);
  const [passState, setPassState] = useState(false);
  const [konfirmPassState, setKonfirmPassState] = useState(false);
  const handleDropChange = (acceptedFiles) => {
    // Update the formik values with the accepted files
    formik.setFieldValue('foto', acceptedFiles);
  };
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      nama: '',
      user_name: '',
      password: '',
      konfirmasi_password: '',
      nip: '',
      nuptk: '',
      nik: '',
      jenis_kelamin: 'Laki-Laki',
      status_ptk: 'PNS',
      foto: [],
      notelp: '',
      email: '',
      tgl_lahir: '',
      tempat_lahir: '',
      tgl_mulaitugas: '',
      alamat: '',
      tenant_id: '',

    },
    // validationSchema: schema,
    onSubmit: (values) => {
      const fotoFile = values.foto[0];
      const formData = new FormData();
      formData.append('foto', fotoFile);

      Object.keys(values).forEach((key) => {
        if (key !== 'foto') {
          formData.append(key, values[key]);
        }
      });

      const token = localStorage.getItem('jwtToken');
      fetch(`https://linksmart-1-t2560421.deta.app/ptk-tambah`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === 'data berhasil ditambah') {
            setSubmissionSuccess(true); // Setelah data berhasil ditambah, setSubmissionSuccess menjadi true
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 
  });
  
  useEffect(() => {
    if (submissionSuccess) {
      alert('Data berhasil ditambah');
      navigate('/pegawai');
    }
  }, [submissionSuccess, navigate]);

  return (
    <React.Fragment>
      <Head title="Add Pegawai"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Tambah Pegawai
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Link Smart</p>
              </BlockDes>
            </BlockHeadContent>

          </BlockBetween>
        </BlockHead>
        <Block size='lg'>
          <PreviewAltCard className="card-full">
            <div className="p-2">
              <h5 className="title">Tambah Pegawai</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={formik.handleSubmit}>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">NIP</label>
                      <input
                        className="form-control"
                        type="number"
                        id='nip'
                        name="nip"
                        onChange={formik.handleChange}
                        value={formik.values.nip}
                        placeholder="Enter NIP"
                      />
                      {formik.errors.nip && <span className="invalid">{formik.errors.nip}</span>}
                    </div>
                    <Col md="13">
                      <div className="form-group">
                        <label className="form-label">NUPTK</label>
                        <input
                          className="form-control"
                          type="number"
                          name="nuptk"
                          onChange={formik.handleChange}
                          value={formik.values.nuptk}
                          placeholder="Enter NUPTK"
                        />
                        {formik.errors.nuptk && <span className="invalid">{formik.errors.nuptk}</span>}
                      </div>
                    </Col>
                  </Col>

                  <Col sm="6">
                    <label className="form-label">Foto Data Dari PTK</label>
                    <Dropzone onDrop={handleDropChange}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                            <input {...getInputProps()} />
                            {formik.values.foto.length === 0 && (
                              <div className="dz-message">
                                <span className="dz-message-text">Drag and drop file</span>
                                <span className="dz-message-or">
                                  {/* Add type="button" to prevent form submission */}
                                  <Button color="primary" type="button">SELECT</Button>
                                </span>
                              </div>
                            )}
                            {formik.values.foto.map((file) => (
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
                          name="nama"
                          onChange={formik.handleChange}
                          value={formik.values.nama}
                          placeholder="Enter Nama" />
                        {formik.errors.nama && <span className="invalid">{formik.errors.nama}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Jenis Kelamin</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={[
                            { value: 'Laki-Laki', label: 'Laki-Laki' },
                            { value: 'Perempuan', label: 'Perempuan' },
                          ]}
                          value={{
                            value: formik.values.jenis_kelamin,
                            label: formik.values.jenis_kelamin,
                          }}
                          onChange={(selectedOption) => formik.setFieldValue('jenis_kelamin', selectedOption.value)}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Status PTK</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={[
                            { value: 'PNS', label: 'PNS' },
                            { value: 'PPPK', label: 'PPPK' },
                          ]}
                          value={{
                            value: formik.values.status_ptk,
                            label: formik.values.status_ptk,
                          }}
                          onChange={(selectedOption) => formik.setFieldValue('status_ptk', selectedOption.value)}
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
                          name="notelp"
                          onChange={formik.handleChange}
                          value={formik.values.notelp}
                          placeholder="Enter No Telp" />
                        {formik.errors.notelp && <span className="invalid">{formik.errors.notelp}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">User Name</label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          type="text"
                          name="user_name"
                          onChange={formik.handleChange}
                          value={formik.values.user_name}
                          placeholder="Enter UserName" />
                        {formik.errors.user_name && <span className="invalid">{formik.errors.user_name}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <a

                          onClick={(ev) => {
                            ev.preventDefault();
                            setPassState(!passState);
                          }}
                          className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                        >
                          <Icon name="eye" className="passcode-icon icon-show"></Icon>
                          <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                        </a>
                        <input
                          type={passState ? "text" : "password"}
                          id="password"
                          name="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="Enter your passcode"
                          className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                        {formik.errors.password && <span className="invalid">{formik.errors.password}</span>}
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
                          name="tempat_lahir"
                          onChange={formik.handleChange}
                          value={formik.values.tempat_lahir}
                          placeholder="Enter Tempat Lahir" />
                        {formik.errors.tempat_lahir && <span className="invalid">{formik.errors.tempat_lahir}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="password">
                          Konfirmasi Password
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <a

                          onClick={(ev) => {
                            ev.preventDefault();
                            setKonfirmPassState(!konfirmPassState);
                          }}
                          className={`form-icon lg form-icon-right passcode-switch ${konfirmPassState ? "is-hidden" : "is-shown"}`}
                        >
                          <Icon name="eye" className="passcode-icon icon-show"></Icon>
                          <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                        </a>
                        <input
                          type={konfirmPassState ? "text" : "password"}
                          id="konfirmasi_password"
                          name="konfirmasi_password"
                          onChange={formik.handleChange}
                          value={formik.values.konfirmasi_password}
                          placeholder="Enter Konfirmasi Password"
                          className={`form-control-lg form-control ${konfirmPassState ? "is-hidden" : "is-shown"}`} />
                        {formik.errors.konfirmasi_password && <span className="invalid">{formik.errors.konfirmasi_password}</span>}
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
                          name="tgl_lahir"
                          onChange={formik.handleChange}
                          value={formik.values.tgl_lahir}
                          placeholder="Enter NIP"
                        />
                        {formik.errors.tgl_lahir && <span className="invalid">{formik.errors.tgl_lahir}</span>}
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
                          name="tgl_mulaitugas"
                          onChange={formik.handleChange}
                          value={formik.values.tgl_mulaitugas}
                          placeholder="Enter "
                        />
                        {formik.errors.tgl_mulaitugas && <span className="invalid">{formik.errors.tgl_mulaitugas}</span>}
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
                          name="nik"
                          onChange={formik.handleChange}
                          value={formik.values.nik}
                          placeholder="Enter NIK" />
                        {formik.errors.nik && <span className="invalid">{formik.errors.nik}</span>}
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
                          name="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          placeholder="Enter Your Email" />
                        {formik.errors.email && <span className="invalid">{formik.errors.email}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">ID Sekolah</label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          type="text"
                          name="tenant_id"
                          onChange={formik.handleChange}
                          value={formik.values.tenant_id}
                          placeholder="Enter Tempat Lahir" />
                        {formik.errors.tenant_id && <span className="invalid">{formik.errors.tenant_id}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Alamat</label>
                      <div className="form-control-wrap">
                        <textarea
                          className="form-control"
                          type="text"
                          name="alamat"
                          onChange={formik.handleChange}
                          value={formik.values.alamat}
                          placeholder="Enter Alamat"
                        />
                        {formik.errors.alamat && <span className="invalid">{formik.errors.alamat}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md='12'>
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      {/* Tombol Save */}
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Tambah Pegawai
                        </Button>
                      </li>
                      <li>
                        <Link to="/pegawai">
                          <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="link link-light"
                          >
                            Cancel
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </PreviewAltCard>
        </Block>
      </Content>
    </React.Fragment>
  )
}

export default AddModal
