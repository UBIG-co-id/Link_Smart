import React, {useState, useEffect} from 'react'
import {
    Modal,
    ModalBody,
    Form,
    Row,
    Input,
    Placeholder
} from 'reactstrap'
import {
    Icon,
    Col,
    Button,
    RSelect
  } from '../../Component'
import { useForm } from 'react-hook-form'
import Dropzone from "react-dropzone";
import { filterSts } from '../../user/UserData';

const AddModal = ({ modal, closeModal, onSubmit, formData, setFormData,  filterSts}) => {
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
                    <h5 className="title">Tambah Presensi Pegawai</h5>
                    <div className="mt-4">
                        <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                            {/* <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">NO</label>
                                    <input 
                                        className="form-control"
                                        type="number"
                                        {...register('id', { required: "This field is required" })}
                                        value={formData && formData.id ? formData.id : ''}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        placeholder="Enter NO"
                                    />
                                    {errors.id && <span className="invalid">{errors.id.message}</span>}
                                </div>
                            </Col> */}

                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">NUPTK</label>
                                    <input 
                                        className="form-control"
                                        type="number"
                                        {...register('nuptk', { required: "This field is required" })}
                                        value={formData.nuptk}
                                        onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                                        placeholder="Enter NUPTK"
                                    />
                                    {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>}
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Nama Pegawai</label>
                                    <div className="form-control-wrap">
                                        <input 
                                            className="form-control"
                                            type="text"
                                            {...register('nmpgw', { required: "This field is required" })}
                                            value={formData.nmpgw}
                                            onChange={(e) => setFormData({ ...formData, nmpgw: e.target.value })}
                                            placeholder="Enter Nama Pegawai"
                                        />
                                        {errors.nmpgw && <span className="invalid">{errors.nmpgw.message}</span>}
                                    </div>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Jabatan</label>
                                    <div className="form-control-wrap">
                                        <input 
                                            className="form-control"
                                            type="text"
                                            {...register('jbtn', { required: "This field is required" })}
                                            value={formData.jbtn}
                                            onChange={(e) => setFormData({ ...formData, jbtn: e.target.value })}
                                            placeholder="Enter Nama Pegawai"
                                        />
                                        {errors.jbtn && <span className="invalid">{errors.jbtn.message}</span>}
                                    </div>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="tgl">
                                        Tanggal
                                    </label>
                                    <div className="form-control-wrap">
                                        <input 
                                            type="date"
                                            className="form-control"
                                            {...register('tgl', { required: "This field is required" })}
                                            value={formData.tgl}
                                            onChange={(e) => setFormData({ ...formData, tgl: e.target.value })}
                                            placeholder="Enter Tanggal"
                                        />
                                        {errors.tgl && <span className="invalid">{errors.tgl.message}</span>}
                                    </div>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Jam Masuk</label>
                                    <div className="form-control-wrap">
                                        <input 
                                            className="form-control"
                                            type="time"
                                            {...register('jmasuk', { required: "This field is required" })}
                                            value={formData.jmasuk}
                                            onChange={(e) => setFormData({ ...formData, jmasuk: e.target.value })}
                                            placeholder="Enter Jam Masuk"
                                        />
                                        {errors.jmasuk && <span className="invalid">{errors.jmasuk.message}</span>}
                                    </div>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Jam Pulang</label>
                                    <div className="form-control-wrap">
                                        <input 
                                            className="form-control"
                                            type="time"
                                            {...register('jplng', { required: "This field is required" })}
                                            value={formData.jplng}
                                            onChange={(e) => setFormData({ ...formData, jplng: e.target.value })}
                                            placeholder="Enter Nama Pegawai"
                                        />
                                        {errors.jplng && <span className="invalid">{errors.jplng.message}</span>}
                                    </div>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="form-group">
                                    <label className="form-label">Kelas</label>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={filterSts}
                                            value={{
                                                value: formData.status,  // Tambahkan pengecekan null atau optional chaining
                                                label: formData.status 
                                            }}
                                            onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                        />
                                    </div>
                                </div>
                            </Col>

                           

                            <Col size="12">
                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                    <li>
                                        <Button color="primary" size="md" type="submit">
                                            Tambah Presensi Pegawai
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