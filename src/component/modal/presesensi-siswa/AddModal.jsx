import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  Form,
  Row,
  Input,
  Placeholder,
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
import { filterSts } from '../../user/UserData';
import { Link } from 'react-router-dom';

const AddModal = ({ modal, closeModal, onSubmit, filterKls, filterSts}) => {
  const [files4, setFiles4] = useState([]);
  const [data, setData] = useState();
  const [FormData, setFormData] = useState({
    nis: "",
    nlp: "",
    kls: "",
    tgl: "",
    masuk: "",
    pulang: "",
    status_in: "",
    keterangan: "",
});

const resetForm = () => {
    setFormData({
        nis: "",
        nlp: "",
        kls: "",
        tgl: "",
        masuk: "",
        pulang: "",
        status_in: "Masuk",
        keterangan: "",
    });
};

  useEffect(() => {
    reset(FormData)
  }, [FormData]);
  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  // const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const handleDropChange = (acceptedFiles, setFiles) => {
    // SetFiles di sini adalah untuk mengupdate state lokal di Dropzone
    setFiles(acceptedFiles);

    // Ambil informasi file pertama dari acceptedFiles
    const selectedFile = acceptedFiles[0];

     // Update state formData dengan informasi file gambar
     setFormData({
      ...FormData,
      fotoData: selectedFile,
    });
  };

  const onFormSubmit = (submitData) => {
    const { nis, nlp, kls, tgl, masuk, pulang, status_in, status_out, keterangan } = submitData;
    let submittedData = {
        id: data.length + 1,
        nis: nis,
        nlp: nlp,
        kls: "XII",
        tgl: tgl,
        masuk: masuk,
        status_in: status_in,
        pulang: pulang,
        status_out: status_out,
        keterangan: keterangan,

    };
    setData([submittedData, ...data]);
    resetForm();
    // setModal({ edit: false }, { add: false });
};

  return (
    <React.Fragment>
            <Head title="Presensi Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Data Presensi Siswa
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
               <h5 className="title">Tambah Presensi Siswa</h5>
               <div className="mt-4">
               <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                 {/* <Col md="6">
                   <div className="form-group">
                     <label className="form-label">ID</label>
                     <input
                         className="form-control"
                         type="number"
                         {...register('id', { required: "This field is required" })}
                         value={formData && formData.id ? formData.id : ''}
                         onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                         placeholder="Enter ID" />
                       {errors.id && <span className="invalid">{errors.id.message}</span>}
                   </div>
                 </Col> */}

               <Col md="6">
                 <div className="form-group">
                   <label className="form-label">NIS</label>
                   <input
                    className="form-control"
                    type="number"
                    {...register('nis', { required: "This field is required" })}
                    value={FormData.nis}
                    onChange={(e) => setFormData({ ...FormData, nis: e.target.value })}
                    placeholder="Enter ID" />
                  {errors.nis && <span className="invalid">{errors.nis.message}</span>}
              </div>
            </Col>

            <Col md="6">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('nlp', { required: "This field is required" })}
                      value={FormData.nlp}
                      onChange={(e) => setFormData({ ...FormData, nlp: e.target.value })}
                      placeholder="Enter Nama Lengkap" />
                    {errors.nlp && <span className="invalid">{errors.nlp.message}</span>}
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
                  value={FormData.tgl}
                  onChange={(e) => setFormData({ ...FormData, tgl: e.target.value })}
                  placeholder="Enter Tanggal Mulai Tugas" />
                {errors.tgl && <span className="invalid">{errors.tgl.message}</span>}
              </div>
             </div>
            </Col>

            <Col md="6">
                <div className="form-group">
                  <label className="form-label">Masuk</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="time"
                      {...register('masuk', { required: "This field is required" })}
                      value={FormData.masuk}
                      onChange={(e) => setFormData({ ...FormData, masuk: e.target.value })}
                      placeholder="Enter Nama Lengkap" />
                    {errors.masuk && <span className="invalid">{errors.masuk.message}</span>}
                  </div>
                </div>
            </Col>

            <Col md="6">
                <div className="form-group">
                  <label className="form-label">Kelas</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterKls}
                      value={{
                        value: FormData.kls , // Tambahkan pengecekan null atau optional chaining
                        label: FormData.kls ,
                      }}
                      onChange={(e) => setFormData({ ...FormData, kls: e.value })}
                    />
                  </div>
                </div>
            </Col>

            <Col md="6">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterSts}
                      value={{
                        value: FormData.status_in , // Tambahkan pengecekan null atau optional chaining
                        label: FormData.status_in,
                      }}
                      onChange={(e) => setFormData({ ...FormData, status_in: e.value })}
                    />
                  </div>
                </div>
            </Col>

            <Col md="6">
                <div className="form-group">
                  <label className="form-label">Pulang</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="time"
                      {...register('pulang', { required: "This field is required" })}
                      value={FormData.pulang}
                      onChange={(e) => setFormData({ ...FormData, pulang: e.target.value })}
                      placeholder="Enter Nama Lengkap" />
                    {errors.pulang && <span className="invalid">{errors.pulang.message}</span>}
                  </div>
                </div>
            </Col>

            <Col md="6">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={filterSts}
                      value={{
                        value: FormData.status_out , // Tambahkan pengecekan null atau optional chaining
                        label: FormData.status_out ,
                      }}
                      onChange={(e) => setFormData({ ...FormData, status_out: e.value })}
                    />
                  </div>
                </div>
            </Col>

            <Col md="6">
                <div className="form-group">
                  <label className="form-label">Keterangan</label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      {...register('keterangan', { required: "This field is required" })}
                      value={FormData.keterangan}
                      onChange={(e) => setFormData({ ...FormData, keterangan: e.target.value })}
                      placeholder="Enter Keterangan" />
                    {errors.keterangan && <span className="invalid">{errors.keterangan.message}</span>}
                  </div>
                </div>
            </Col>

            <Col size="12">
            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Tambah Presensi Siswa
                </Button>
              </li>
              <li>
                <Link to='/presensi/siswa'>
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
    //       <h5 className="title">Tambah Presensi Siswa</h5>
    //       <div className="mt-4">
    //       <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
    //         {/* <Col md="6">
    //           <div className="form-group">
    //             <label className="form-label">ID</label>
    //             <input
    //                 className="form-control"
    //                 type="number"
    //                 {...register('id', { required: "This field is required" })}
    //                 value={formData && formData.id ? formData.id : ''}
    //                 onChange={(e) => setFormData({ ...formData, id: e.target.value })}
    //                 placeholder="Enter ID" />
    //               {errors.id && <span className="invalid">{errors.id.message}</span>}
    //           </div>
    //         </Col> */}

    //         <Col md="6">
    //           <div className="form-group">
    //             <label className="form-label">NIS</label>
    //             <input
    //                 className="form-control"
    //                 type="number"
    //                 {...register('nis', { required: "This field is required" })}
    //                 value={formData.nis}
    //                 onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
    //                 placeholder="Enter ID" />
    //               {errors.nis && <span className="invalid">{errors.nis.message}</span>}
    //           </div>
    //         </Col>

    //         <Col md="6">
    //             <div className="form-group">
    //               <label className="form-label">Nama Lengkap</label>
    //               <div className="form-control-wrap">
    //                 <input
    //                   className="form-control"
    //                   type="text"
    //                   {...register('nlp', { required: "This field is required" })}
    //                   value={formData.nlp}
    //                   onChange={(e) => setFormData({ ...formData, nlp: e.target.value })}
    //                   placeholder="Enter Nama Lengkap" />
    //                 {errors.nlp && <span className="invalid">{errors.nlp.message}</span>}
    //               </div>
    //             </div>
    //         </Col>

    //         <Col md="6">
    //           <div className="form-group">
    //            <label className="form-label" htmlFor="tgl">
    //               Tanggal
    //            </label>
    //            <div className="form-control-wrap">
    //             <input
    //               type="date"
    //               className="form-control"
    //               {...register('tgl', { required: "This field is required" })}
    //               value={formData.tgl}
    //               onChange={(e) => setFormData({ ...formData, tgl: e.target.value })}
    //               placeholder="Enter Tanggal Mulai Tugas" />
    //             {errors.tgl && <span className="invalid">{errors.tgl.message}</span>}
    //           </div>
    //          </div>
    //         </Col>

    //         <Col md="6">
    //             <div className="form-group">
    //               <label className="form-label">Masuk</label>
    //               <div className="form-control-wrap">
    //                 <input
    //                   className="form-control"
    //                   type="time"
    //                   {...register('masuk', { required: "This field is required" })}
    //                   value={formData.masuk}
    //                   onChange={(e) => setFormData({ ...formData, masuk: e.target.value })}
    //                   placeholder="Enter Nama Lengkap" />
    //                 {errors.masuk && <span className="invalid">{errors.masuk.message}</span>}
    //               </div>
    //             </div>
    //         </Col>

    //         <Col md="6">
    //             <div className="form-group">
    //               <label className="form-label">Kelas</label>
    //               <div className="form-control-wrap">
    //                 <RSelect
    //                   options={filterKls}
    //                   value={{
    //                     value: formData.kls , // Tambahkan pengecekan null atau optional chaining
    //                     label: formData.kls ,
    //                   }}
    //                   onChange={(e) => setFormData({ ...formData, kls: e.value })}
    //                 />
    //               </div>
    //             </div>
    //         </Col>

    //         <Col md="6">
    //             <div className="form-group">
    //               <label className="form-label">Status</label>
    //               <div className="form-control-wrap">
    //                 <RSelect
    //                   options={filterSts}
    //                   value={{
    //                     value: formData.status_in , // Tambahkan pengecekan null atau optional chaining
    //                     label: formData.status_in,
    //                   }}
    //                   onChange={(e) => setFormData({ ...formData, status_in: e.value })}
    //                 />
    //               </div>
    //             </div>
    //         </Col>

    //         <Col md="6">
    //             <div className="form-group">
    //               <label className="form-label">Pulang</label>
    //               <div className="form-control-wrap">
    //                 <input
    //                   className="form-control"
    //                   type="time"
    //                   {...register('pulang', { required: "This field is required" })}
    //                   value={formData.pulang}
    //                   onChange={(e) => setFormData({ ...formData, pulang: e.target.value })}
    //                   placeholder="Enter Nama Lengkap" />
    //                 {errors.pulang && <span className="invalid">{errors.pulang.message}</span>}
    //               </div>
    //             </div>
    //         </Col>

    //         <Col md="6">
    //             <div className="form-group">
    //               <label className="form-label">Status</label>
    //               <div className="form-control-wrap">
    //                 <RSelect
    //                   options={filterSts}
    //                   value={{
    //                     value: formData.status_out , // Tambahkan pengecekan null atau optional chaining
    //                     label: formData.status_out ,
    //                   }}
    //                   onChange={(e) => setFormData({ ...formData, status_out: e.value })}
    //                 />
    //               </div>
    //             </div>
    //         </Col>

    //         <Col md="6">
    //             <div className="form-group">
    //               <label className="form-label">Keterangan</label>
    //               <div className="form-control-wrap">
    //                 <input
    //                   className="form-control"
    //                   type="text"
    //                   {...register('keterangan', { required: "This field is required" })}
    //                   value={formData.keterangan}
    //                   onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
    //                   placeholder="Enter Keterangan" />
    //                 {errors.keterangan && <span className="invalid">{errors.keterangan.message}</span>}
    //               </div>
    //             </div>
    //         </Col>

    //         <Col size="12">
    //         <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
    //           <li>
    //             <Button color="primary" size="md" type="submit">
    //               Tambah Presensi Siswa
    //             </Button>
    //           </li>
    //           <li>
    //             <a
    //               href="#cancel"
    //               onClick={(ev) => {
    //                 ev.preventDefault();
    //                 closeModal();
    //               }}
    //               className="link link-light"
    //             >
    //               Cancel
    //             </a>
    //           </li>
    //         </ul>
    //         </Col>
    //       </Form>
    //       </div>
    //     </div>
    //   </ModalBody>
    // </Modal>
  )
}
    
export default AddModal

  