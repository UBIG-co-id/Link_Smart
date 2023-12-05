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
import { filterMpl, kkmData} from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddModal = ({ modal, closeModal, }) => {
  const [data, setData] = useState(kkmData);
  const [files4, setFiles4] = useState([]);
  const [FormData, setFormData] = useState({
    mapel: '',
    kelas: '',
    kkm: '',
    nilai_kkm: '', // Added nilai_kkm to FormData
  });

  const resetForm = () => {
    setFormData({
      mapel: '',
      kelas: '',
      kkm: '',
      nilai_kkm: '', // Added nilai_kkm to resetForm
    });
  };

  useEffect(() => {
    reset(FormData);
  }, [FormData]);

  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const handleDropChange = (acceptedFiles, setFiles) => {
    setFiles(acceptedFiles);
    const selectedFile = acceptedFiles[0];

    setFormData({
      ...FormData,
      fotoData: selectedFile,
    });
  };

  const onFormSubmit = (submitData) => {
    const { mapel, kelas, kkm, nilai_kkm } = submitData;
    let submittedData = {
      id: data.length + 1,
      mapel: mapel,
      kelas: kelas,
      kkm: kkm,
      nilai_kkm: nilai_kkm, // Added nilai_kkm to submittedData
    };
    setData([submittedData, ...data]);
    resetForm();
  };

  return (

    <React.Fragment>
    <Head title="Add KKM"></Head>
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Tambah KKM
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>Welcome to Link Smart</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      
      <Block>
        <PreviewAltCard>

      <div className='p-2'>
         <h5 className="title">Set Nilai KKM</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
             <Col md="6">
             <div className="form-group">
             <label className="form-label">Pilih Mata Pelajaran</label>
             <div>
             <RSelect
                options={filterMpl}
                value={{
                  value: FormData?.mapel || '',
                  label: FormData?.mapel || '',
                }}
                onChange={(e) => setFormData({ ...FormData, mapel: e.value })}
              />

            </div>
            </div>
            <Col md="6">
              <div className='form-group'>
              <label className="form-label">Nilai KKM</label>
              <input
              className="form-control"
              type="number"
              {...register('nilai_kkm', { required: "This field is required" })}
              value={FormData?.nilai_kkm || ''}
              onChange={(e) => setFormData({ ...FormData, nilai_kkm: e.target.value })}
              placeholder="Enter nilai kkm"
            />

                    {errors.nilai_kkm && <span className="invalid">{errors.nilai_kkm.message}</span>}
              </div>
            </Col>
            </Col>
            <Col size="12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Tambah KKM
                </Button>
              </li>
              <li>
                <Link to = '/rapor/mapel-kkm'>
              <a
                // href="#cancel"
                // onClick={(ev) => {
                //   ev.preventDefault();
                //   // closeModal();
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
    
    // <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg"is>
    //   <ModalBody>
    //     <a href="#cancel"
    //       onClick={(ev) => {
    //         ev.preventDefault();
    //         closeModal()
    //       }}
    //       className="close">
    //        <Icon name="cross-sm"></Icon>
    //     </a>
    //     <div className='p-2'>
    //     <h5 className="title">Set Nilai KKM</h5>
    //     <div className='mt-4'>
    //       <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
    //         <Col md="6">
    //         <div className="form-group">
    //         <label className="form-label">Pilih Mata Pelajaran</label>
    //         <div>
    //         <RSelect
    //             options={filterMpl}
    //             value={{
    //               value: formData?.mapel || '',
    //               label: formData?.mapel || '',
    //             }}
    //             onChange={(e) => setFormData({ ...formData, mapel: e.value })}
    //           />

    //         </div>
    //         </div>
    //         <Col md="6">
    //           <div className='form-group'>
    //           <label className="form-label">Nilai KKM</label>
    //           <input
    //           className="form-control"
    //           type="number"
    //           {...register('nilai_kkm', { required: "This field is required" })}
    //           value={formData?.nilai_kkm || ''}
    //           onChange={(e) => setFormData({ ...formData, nilai_kkm: e.target.value })}
    //           placeholder="Enter nilai kkm"
    //         />

    //                 {errors.nilai_kkm && <span className="invalid">{errors.nilai_kkm.message}</span>}
    //           </div>
    //         </Col>
    //         </Col>
    //         <Col size="12">
    //           <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
    //           <li>
    //             <Button color="primary" size="md" type="submit">
    //               Tambah KKM
    //             </Button>
    //           </li>
    //           <li>
    //           <a
    //             href="#cancel"
    //             onClick={(ev) => {
    //               ev.preventDefault();
    //               closeModal();
    //             }}
    //             className="link link-light"
    //           >
    //             Cancel
    //           </a>
    //           </li>
    //           </ul>
    //         </Col>
    //       </Form>
    //     </div>
    //     </div>
    //   </ModalBody>
    // </Modal>
  )
}
 export default AddModal