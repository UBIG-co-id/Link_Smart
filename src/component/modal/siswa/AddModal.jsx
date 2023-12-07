import React, { useEffect, useState, useRef } from 'react'
import {
  Modal,
  ModalBody,
  Form,
  Row,
  Col,
  Button
} from 'reactstrap'
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PreviewAltCard,
  RSelect
} from '../../Component'
import { useForm } from 'react-hook-form'
import Dropzone from "react-dropzone";
import { Steps, Step } from "react-step-builder";
import Head from '../../../layout/Head';
import Content from '../../../layout/Content/Content';


const AddModal = ({ modal, closeModal, onSubmit, formData, setFormData, filterAgm, filterJk, filterP, filterPeng, filterJp }) => {
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
  const Header = (props) => {
    return (
      <div className="steps clearfix">
        <ul>
          <li className={props.current >= 1 ? "first done" : "first"}>
            <a href="#wizard-01-h-0" onClick={(ev) => ev.preventDefault()}>
              <span className="number">01</span> <h5>Data Diri</h5>
            </a>
          </li>
          <li className={props.current >= 2 ? "done" : ""}>
            <a href="#wizard-01-h-1" onClick={(ev) => ev.preventDefault()}>
              <span className="number">02</span> <h5>Orang Tua</h5>
            </a>
          </li>
          <li className={props.current >= 3 ? "done" : ""}>
            <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
              <span className="current-info audible">current step: </span>
              <span className="number">03</span> <h5>Wali</h5>
            </a>
          </li>
          <li className={props.current === 4 ? "done" : ""}>
            <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
              <span className="current-info audible">current step: </span>
              <span className="number">04</span> <h5>Upload</h5>
            </a>
          </li>
          <li className={props.current === 5 ? "last done" : "last"}>
            <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
              <span className="current-info audible">current step: </span>
              <span className="number">05</span> <h5>Lainnya</h5>
            </a>
          </li>
        </ul>
      </div>
    );
  };
  const config = {
    before: Header,
  };
  const SiswaForm = (props) => {
    const [formData, setFormData] = useState({
      nis: "",
      nik: "",
      fotoData: "",
      nisn: "",
      norfid: "",
      userid: "",
      nl: "",
      tl: "",
      js: "",
      tgllahir: "",
      agama: "",
      kls: "",
      kct: "",
      klh: "",
      dsn: "",
      rt: "",
      rw: "",
      kopos: "",
      jt: "",
      nwl: "",
      notelp: "",
      alamat: "",
      email: "",
    });

    const onInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = (data) => {
      props.next();
    };

    useEffect(() => {
      reset(formData)
    }, [formData]);

    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-6">
          <Col md="2">
            <div className="form-group">
              <label className="form-label" htmlFor="nis">
                NIS
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="nis"
                  className="form-control"
                  {...register('nis', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nis} />
                {errors.nis && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            <Col md="12">
              <div className="form-group">
                <label className="form-label" htmlFor="nik">
                  NIK
                </label>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    id="nik"
                    className="form-control"
                    {...register('nik', { required: true })}
                    onChange={(e) => onInputChange(e)}
                    defaultValue={formData.nik} />
                  {errors.nik && <span className="invalid">Harap masukkan NIK anda</span>}
                </div>
              </div>
            </Col>
          </Col>

          <Col sm="4">
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

          <Col md="3">
            <div className="form-group">
              <label className="form-label" htmlFor="kct">
                Kecamatan
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="kct"
                  className="form-control"
                  {...register('kct', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.kct}
                />
                {errors.kct && <span className="invalid">Harap masukkan Kecamatan anda</span>}
              </div>
            </div>
            <Col md="14">
              <Row className="gy-6">
                <Col md="14">
                  {/* Form Dusun */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="dsn">
                      Dusun
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="dsn"
                        className="form-control"
                        {...register('dsn', { required: true })}
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.dsn}
                      />
                      {errors.dsn && <span className="invalid">Harap masukkan Dusun anda</span>}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Col>
          <Col md="3">
            <Row className="gy-6">
              <Col md="14">
                {/* Form Dusun */}
                <div className="form-group">
                  <label className="form-label" htmlFor="klh">
                    Kelurahan
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="klh"
                      className="form-control"
                      {...register('klh', { required: true })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.klh}
                    />
                    {errors.klh && <span className="invalid">Harap masukkan Kelurahan anda</span>}
                  </div>
                </div>
              </Col>

              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label" htmlFor="rt">
                    RT
                  </label>
                  <div className="form-control-wrap" >
                    <input
                      type="number"
                      id="rt"
                      className="form-control"
                      {...register('rt', { required: true })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.rt}
                    />
                    {errors.rt && <span className="invalid">Harap masukkan Dusun anda</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label" htmlFor="rw">
                    RW
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="rw"
                      className="form-control"
                      {...register('rw', { required: true })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.rw}
                    />
                    {errors.rw && <span className="invalid">Harap masukkan Dusun anda</span>}
                  </div>
                </div>
              </Col>
              <Col md="12">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label" htmlFor="kopos">
                    Kode Pos
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="kopos"
                      className="form-control"
                      {...register('kopos', { required: true })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.kopos}
                    />
                    {errors.kopos && <span className="invalid">Harap masukkan Kode Pos anda</span>}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="3">
            <div className="form-group" >
              <label className="form-label" htmlFor="nisn">
                NISN
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="nisn"
                  className="form-control"
                  {...register('nisn', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nisn} />
                {errors.nisn && <span className="invalid">Harap masukkan NISN anda</span>}
              </div>
            </div>
          </Col>
          <Col md="3">
            <div className="form-group">
              <label className="form-label" htmlFor="userId">
                User Id (Untuk Login)
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="userid"
                  className="form-control"
                  {...register('userid', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.userid} />
                {errors.userid && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="jt">
                Jenis Tinggal
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="jt"
                  className="form-control"
                  {...register('jt', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.jt} />
                {errors.jt && <span className="invalid">Harap masukkan Jenis Tinggal anda</span>}
              </div>
            </div>
          </Col>
          <Col md="3">
            <div className="form-group">
              <label className="form-label" htmlFor="norfid">
                No.RFID
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="norfid"
                  className="form-control"
                  {...register('norfid', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.norfid} />
                {errors.norfid && <span className="invalid">Harap masukkan RFID anda</span>}
              </div>
            </div>
          </Col>
          <Col md="3">
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
              <label className="form-label" htmlFor="nwl">
                Nama Wali
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nwl"
                  className="form-control"
                  {...register('nwl', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nwl} />
                {errors.nwl && <span className="invalid">Harap masukkan Nama Wali anda</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nl">
                Nama Lengkap
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nl"
                  className="form-control"
                  {...register('nl', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nl} />
                {errors.nl && <span className="invalid">Harap masukkan Nama Lengkap anda</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="notelp">
                No Telepon (Ortu)
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="notelp"
                  className="form-control"
                  {...register('notelp', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.notelp} />
                {errors.notelp && <span className="invalid">Harap masukkan RFID anda</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <Row className="gy-6">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="tl">
                    Tempat Lahir
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="tl"
                      className="form-control"
                      {...register('tl', { required: true })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.tl} />
                    {errors.tl && <span className="invalid">Harap masukkan Tempat Lahir anda</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="tgllahir">
                    Tanggal Lahir
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="date"
                      id="tgllahir"
                      className="form-control"
                      {...register('tgllahir', { required: true })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.tgllahir} />
                    {errors.tgllahir && <span className="invalid">Harap masukkan Tanggal Lahir anda</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Agama</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterAgm}
                      value={{
                        value: formData.agama,
                        label: formData.agama,
                      }}
                      onChange={(e) => setFormData({ ...formData, agama: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Kelas</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterAgm}
                      value={{
                        value: formData.agama,
                        label: formData.agama,
                      }}
                      onChange={(e) => setFormData({ ...formData, agama: e.value })}
                    />
                  </div>
                </div>
              </Col>
            </Row>
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
                // placeholder="Enter Alamat"
                />
                {errors.alamat && <span className="invalid">Harap masukkan Alamat anda</span>}
              </div>
            </div>
            <Col md="12">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="email"
                    placeholder='Email Orang Tua'
                    className="form-control"
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    onChange={(e) => onInputChange(e)}
                    defaultValue={formData.email} />
                  {errors.email && errors.email.type === "required" && (
                    <span className="invalid">This field is required</span>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className="invalid">{errors.email.message}</span>
                  )}
                </div>
              </div>
            </Col>
          </Col>
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type="submit">
                Next
              </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };

  const OrangTuaForm = (props) => {
    const [formData, setFormData] = useState({
      nayah: '',
      nibu: '',
      nika: '',
      niki: '',
      tla: '',
      tli: '',
      nha: '',
      nhi: '',
      emaila: '',
      emaili: '',
      jenpena: '',
      jenpeni: '',
      pa: '',
      pi: '',
      ha: '',
      hi: '',
    });

    const onInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { handleSubmit, register, watch, formState: { errors } } = useForm();

    const submitForm = (data) => {
      props.next();
    };

    const password = useRef();
    password.current = watch("password");

    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-4">
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nayah">
                Nama Ayah
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nayah"
                  className="form-control"
                  {...register('nayah', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nayah} />
                {errors.nayah && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nibu">
                Nama Ibu
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nibu"
                  className="form-control"
                  {...register('nibu', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nibu} />
                {errors.nibu && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nika">
                NIK Ayah
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nika"
                  className="form-control"
                  {...register('nika', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nika} />
                {errors.nika && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="niki">
                NIK Ibu
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="niki"
                  className="form-control"
                  {...register('niki', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.niki} />
                {errors.niki && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="tla">
                Tanggal Lahir Ayah
              </label>
              <div className="form-control-wrap">
                <input
                  type="date"
                  id="tla"
                  className="form-control"
                  {...register('tla', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.tla} />
                {errors.tla && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="tli">
                Tanggal Lahir Ibu
              </label>
              <div className="form-control-wrap">
                <input
                  type="date"
                  id="tli"
                  className="form-control"
                  {...register('tli', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.tli} />
                {errors.tli && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nha">
                No. Hp Ayah
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="nha"
                  className="form-control"
                  {...register('nha', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nha} />
                {errors.nha && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nhi">
                No. Hp Ibu
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nhi"
                  className="form-control"
                  {...register('nhi', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nhi} />
                {errors.nhi && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <Row className="gy-6">

              <Col md="14">
                {/* Form Dusun */}
                <div className="form-group">
                  <label className="form-label" htmlFor="emaila">
                    Email Ayah
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="emaila"
                      className="form-control"
                      {...register('emaila', {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.emaila}
                    />
                    {errors.emaila && errors.emaila.type === "required" && (
                      <span className="invalid">This field is required</span>
                    )}
                    {errors.emaila && errors.emaila.type === "pattern" && (
                      <span className="invalid">{errors.emaila.message}</span>
                    )}
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label">Jenjang Pendidikan Ayah</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterJp}
                      value={{
                        value: formData.jp,
                        label: formData.jp,
                      }}
                      onChange={(e) => setFormData({ ...formData, jp: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label">Pekerjaan Ayah</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterP}
                      value={{
                        value: formData.p,
                        label: formData.p,
                      }}
                      onChange={(e) => setFormData({ ...formData, p: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label">Penghasilan Ayah</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterPeng}
                      value={{
                        value: formData.peng,
                        label: formData.peng,
                      }}
                      onChange={(e) => setFormData({ ...formData, peng: e.value })}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row className="gy-6">
              <Col md="14">
                {/* Form Dusun */}
                <div className="form-group">
                  <label className="form-label" htmlFor="emaili">
                    Email Ibu
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="emaili"
                      className="form-control"
                      {...register('emaili', {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      onChange={(e) => onInputChange(e)}
                      defaultValue={formData.emaili}
                    />
                    {errors.emaili && errors.emaili.type === "required" && (
                      <span className="invalid">This field is required</span>
                    )}
                    {errors.emaili && errors.emaili.type === "pattern" && (
                      <span className="invalid">{errors.emaili.message}</span>
                    )}
                  </div>
                </div>
              </Col>

              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label">Jenjang Pendidikan Ibu</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterJp}
                      value={{
                        value: formData.jp,
                        label: formData.jp,
                      }}
                      onChange={(e) => setFormData({ ...formData, jp: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label">Pekerjaan Ibu</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterP}
                      value={{
                        value: formData.p,
                        label: formData.p,
                      }}
                      onChange={(e) => setFormData({ ...formData, p: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '21px' }}>
                  <label className="form-label">Penghasilan Ibu</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterPeng}
                      value={{
                        value: formData.peng,
                        label: formData.peng,
                      }}
                      onChange={(e) => setFormData({ ...formData, peng: e.value })}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type="submit">
                Next
              </Button>
            </li>
            <li>
              <Button color="primary" onClick={props.prev}>
                Previous
              </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };

  const WaliForm = (props) => {
    const [formData, setFormData] = useState({
      nawal: '',
      nikwal: '',
      thnl: '',
      jp: '  ',
      p: '',
      peng: '',
     
    });

    const onInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { handleSubmit, register, watch, formState: { errors } } = useForm();

    const submitForm = (data) => {
      props.next();
    };

    const password = useRef();
    password.current = watch("password");

    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-4">
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nawal">
                Nama Wali
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nawal"
                  className="form-control"
                  {...register('nawal', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nawal} />
                {errors.nawal && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="thnl">
                Tahun Lahir
              </label>
              <div className="form-control-wrap">
                <input
                  type="date"
                  id="thnl"
                  className="form-control"
                  {...register('thnl', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.thnl} />
                {errors.thnl && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="nikwal">
                NIK Wali
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="nikwal"
                  className="form-control"
                  {...register('nikwal', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.nikwal} />
                {errors.nikwal && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
         
          <Col md="6">
            <Row className="gy-6">
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '1px' }}>
                  <label className="form-label">Jenjang Pendidikan Wali</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterJp}
                      value={{
                        value: formData.jp,
                        label: formData.jp,
                      }}
                      onChange={(e) => setFormData({ ...formData, jp: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '1px' }}>
                  <label className="form-label">Pekerjaan Wali</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterP}
                      value={{
                        value: formData.p,
                        label: formData.p,
                      }}
                      onChange={(e) => setFormData({ ...formData, p: e.value })}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                {/* Form Dusun */}
                <div className="form-group" style={{ marginTop: '11px' }}>
                  <label className="form-label">Penghasilan Wali</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterPeng}
                      value={{
                        value: formData.peng,
                        label: formData.peng,
                      }}
                      onChange={(e) => setFormData({ ...formData, peng: e.value })}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type="submit">
                Next
              </Button>
            </li>
            <li>
              <Button color="primary" onClick={props.prev}>
                Previous
              </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };
  
  const UploadForm = (props) => {
    const [formData, setFormData] = useState({
      fotoKK: "",
      fotoAkta: "",
      fotoijasah: "",
      
    });

    const onInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = (data) => {
      props.next();
    };

    useEffect(() => {
      reset(formData)
    }, [formData]);

    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-6">
          <Col sm="4">
            <label className="form-label">Upload KK</label>
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
          <Col sm="4">
            <label className="form-label">Upload Akta</label>
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
          <Col sm="4">
            <label className="form-label">Upload Ijasah</label>
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
          
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type="submit">
                Next
              </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };
  const LainForm = (props) => {
    const [formData, setFormData] = useState({
      noakta: "",
      jenis: "",
      tinggib: "",
      bb: "",
      klspil: "",
      tglm: "",
      noija: "",
      sklhasal: "",
      jsk: "",
      ank: "",
      sk: "",
      ass: "",
      ats: "",
      jts: "",
      wts: "",
      
    });

    const onInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = (data) => {
      props.next();
    };

    useEffect(() => {
      reset(formData)
    }, [formData]);

    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-6">
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="noakta">
                No Akta
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="noakta"
                  className="form-control"
                  {...register('noakta', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.noakta} />
                {errors.noakta && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="tglm">
                Tanggal Masuk
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="tglm"
                  className="form-control"
                  {...register('tglm', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.tglm} />
                {errors.tglm && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="noakta">
                Jenis Pendaftaran
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="noakta"
                  className="form-control"
                  {...register('noakta', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.noakta} />
                {errors.noakta && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="noija">
                No Ijazah
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="noija"
                  className="form-control"
                  {...register('noija', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.noija} />
                {errors.noija && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="tinggib">
                Tinggi Badan (CM)
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="tinggib"
                  className="form-control"
                  {...register('tinggib', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.tinggib} />
                {errors.tinggib && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="sklhasal">
                Sekolah Asal
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="sklhasal"
                  className="form-control"
                  {...register('sklhasal', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.sklhasal} />
                {errors.sklhasal && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="bb">
                Berat Badan (Kg)
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="bb"
                  className="form-control"
                  {...register('bb', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.bb} />
                {errors.bb && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="jsk">
                Jumlah Saudara Kandung
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="jsk"
                  className="form-control"
                  {...register('jsk', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.jsk} />
                {errors.jsk && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="klspil">
                Kelas Pilihan
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="klspil"
                  className="form-control"
                  {...register('klspil', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.klspil} />
                {errors.klspil && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="ank">
                Anak Ke
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="ank"
                  className="form-control"
                  {...register('ank', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.ank} />
                {errors.ank && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            <Col md="12">
            <div className="form-group">
              <label className="form-label" htmlFor="sk">
                Status Keluarga
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="sk"
                  className="form-control"
                  {...register('sk', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.sk} />
                {errors.sk && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="ass">
                Alamat Sekolah Sebelumnya
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="ass"
                  className="form-control"
                  {...register('ass', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.ass} />
                {errors.ass && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="ats">
                Alat Transportasi ke Sekolah
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="ats"
                  className="form-control"
                  {...register('ats', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.ats} />
                {errors.ats && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="jts">
                Jarak Tempuh Ke sekolah + (KM)
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="jts"
                  className="form-control"
                  {...register('jts', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.jts} />
                {errors.jts && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="jts">
                Waktu Tempuh Ke Sekolah + (Menit)
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="jts"
                  className="form-control"
                  {...register('jts', { required: true })}
                  onChange={(e) => onInputChange(e)}
                  defaultValue={formData.jts} />
                {errors.jts && <span className="invalid">Harap masukkan NIS anda</span>}
              </div>
            </div>
            
          </Col>
          </Col>
          

         
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type="submit">
                Next
              </Button>
            </li>
            <li>
              <Button color="primary" onClick={props.prev}>
                Previous
              </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment >
      <Head title="Add Pegawai"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Tambah Siswa
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Link Smart</p>
              </BlockDes>
            </BlockHeadContent>

          </BlockBetween>
        </BlockHead>
      <Block size="lg">
      <PreviewAltCard className="card-full">
        <div className="p-2">
          <div className="mt-4">
            <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
              <Steps config={config}>
                <Step component={SiswaForm} />
                <Step component={OrangTuaForm} />
                <Step component={WaliForm} />
                <Step component={UploadForm} />
                <Step component={LainForm} />
              </Steps>
            </div>
           
          </div>
        </div>
        </PreviewAltCard>
      </Block>
      </Content>
    </React.Fragment>
  )
}

export default AddModal
