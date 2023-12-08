import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  Form,
  Row,
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
import { filterSts, filterThn } from '../../user/UserData';
import { Link } from 'react-router-dom';

const Mutasi = ({ modal, closeModal, onSubmit, filterStatus, filterJk }) => {
  const [files4, setFiles4] = useState([]);
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    nis: "",
    nuptk: "",
    fotoData: null,
    nama: "",
    jk: "Laki-Laki",
    status: "Active",
    notelp: "",
    email: "",
    tlahir: "",
    tgllahir: '',
    tglmt: "",
    nik: "",
    alamat: "",
});
const resetForm = () => {
    setFormData({
        name: "",
        email: "",
        balance: 0,
        phone: "",
        jk: "Laki-Laki",
        status: "Active",
    });
};

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
    <React.Fragment>
            <Head title="Mutasi Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Mutasi Siswa
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Welcome to Link Smart</p>
                            </BlockDes>
                        </BlockHeadContent>
                        </BlockBetween>
                        </BlockHead>
                        <Block>
                          <PreviewAltCard>
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
                      options={filterSts}
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
                  <label className="form-label">Tahun </label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterThn}
                      value={{
                        value: formData.tahun,
                        label: formData.tahun,
                      }}
                      onChange={(e) => setFormData({ ...formData, tahun: e.value })}
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
                      Tambah Siswa
                    </Button>
                  </li>
                  <li>
                    <Link to='/siswa/mutasi-siswa'>
                    <a
                      // href="#cancel"
                      // onClick={(ev) => {
                        //   ev.preventDefault();
                        //   closeModal();
                        // }}
                        className="link link-light"
                        >
                      Cancel
                    </a>
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
    // <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
    //   <ModalBody>
    //     <a
    //       href="#cancel"
    //       onClick={(ev) => {
    //         ev.preventDefault();
    //         closeModal()
    //       }}
    //       className="close"
    //     >
    //       <Icon name="cross-sm"></Icon>
    //     </a>
    //     <div className="p-2">
    //       <h5 className="title">Tambah Mutasi Siswa</h5>
    //       <div className="mt-4">
    //         <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
    //         <Col md="12">
    //             <div className="form-group">
    //               <label className="form-label">Tanggal</label>
    //               <div className="form-control-wrap">
    //                 <input
    //                   className="form-control"
    //                   type="date"
    //                   {...register('tgl', { required: "This field is required" })}
    //                   value={formData.tgl}
    //                   onChange={(e) => setFormData({ ...formData, tgl: e.target.value })}
    //                   placeholder="Enter Tanggal Lahir"
    //                 />
    //                 {errors.tgl && <span className="invalid">{errors.tgl.message}</span>}
    //               </div>
    //             </div>
    //           </Col>
    //           <Col md="12">
    //             <div className="form-group">
    //               <label className="form-label">NIS - Nama Lengkap</label>
    //               <div className="form-control-wrap">
    //                 <input
    //                   className="form-control"
    //                   type="text"
    //                   {...register('nisnam', { required: "This field is required" })}
    //                   value={formData.nisnam}
    //                   onChange={(e) => setFormData({ ...formData, nisnam: e.target.value })}
    //                   placeholder="Enter Nama Lengkap" />
    //                 {errors.nisnam && <span className="invalid">{errors.nisnam.message}</span>}
    //               </div>
    //             </div>
    //           </Col>
    //           <Col md="12">
    //             <div className="form-group">
    //               <label className="form-label">Kelas</label>
    //               <div className="form-control-wrap">
    //                 <input disabled
    //                   className="form-control"
    //                   type="text"
    //                   {...register('nama', { required: "This field is required" })}
    //                   value={formData.nama}
    //                   onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
    //                   placeholder="Enter Nama Lengkap" />
    //                 {errors.nama && <span className="invalid">{errors.nama.message}</span>}
    //               </div>
    //             </div>
    //           </Col>
    //           <Col md="12">
    //             <div className="form-group">
    //               <label className="form-label">Jenis Surat</label>
    //               <div className="form-control-wrap">
    //                 <RSelect
    //                   options={filterSts}
    //                   value={{
    //                     value: formData.status,
    //                     label: formData.status,
    //                   }}
    //                   onChange={(e) => setFormData({ ...formData, status: e.value })}
    //                 />
    //               </div>
    //             </div>
    //           </Col>
    //           <Col md="12">
    //             <div className="form-group">
    //               <label className="form-label">Tahun </label>
    //               <div className="form-control-wrap">
    //                 <RSelect
    //                   options={filterThn}
    //                   value={{
    //                     value: formData.tahun,
    //                     label: formData.tahun,
    //                   }}
    //                   onChange={(e) => setFormData({ ...formData, tahun: e.value })}
    //                 />
    //               </div>
    //             </div>
    //           </Col>
    //           <Col md="12">
    //             <div className="form-group">
    //               <label className="form-label">Alasan Surat (Deskripsi)</label>
    //               <div className="form-control-wrap">
    //                 <textarea
    //                   className="form-control"
    //                   {...register('alamat', { required: "This field is required" })}
    //                   value={formData.alamat}
    //                   onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
    //                   placeholder=""
    //                 />
    //                 {errors.alamat && <span className="invalid">{errors.alamat.message}</span>}
    //               </div>
    //             </div>
    //           </Col>
    //           <Col size="12">
    //             <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
    //               <li>
    //                 <Button color="primary" size="md" type="submit">
    //                   Tambah Pegawai
    //                 </Button>
    //               </li>
    //               <li>
    //                 <Link to='/siswa/mutasi-siswa'>
    //                 <a
    //                   // href="#cancel"
    //                   // onClick={(ev) => {
    //                     //   ev.preventDefault();
    //                     //   closeModal();
    //                     // }}
    //                     className="link link-light"
    //                     >
    //                   Cancel
    //                 </a>
    //                   </Link>
    //               </li>
    //             </ul>
    //           </Col>
    //         </Form>
    //       </div>
    //     </div>
    //   </ModalBody>
    // </Modal>
  )
}

export default Mutasi
