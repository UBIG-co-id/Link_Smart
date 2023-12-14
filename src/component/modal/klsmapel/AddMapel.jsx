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
import makeAnimated from "react-select/animated";
import Content from '../../../layout/Content/Content';
import { mpl, mapelKelas} from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddMapel = ({ modal, closeModal, }) => {
  const [data, setData] = useState(mapelKelas);
  const [files4, setFiles4] = useState([]);
  const animatedComponents = makeAnimated();
  const [FormData, setFormData] = useState({
        kls: "",
        mapel: "",
  });

  const resetForm = () => {
    setFormData({
        kls: "",
        mapel: "",
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
    const { mapel, kls } = submitData;
    let submittedData = {
      id: data.length + 1,
      kls: kls,
      mapel: mapel,
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
         <h5 className="title">Tambah Mapel Kelas</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
             
            <Col md="4">
              <div className='form-group'>
              <label className="form-label">Kelas</label>
              <input
              className="form-control"
              type="text"
              {...register('kls', { required: "This field is required" })}
              value={FormData?.kls || ''}
              onChange={(e) => setFormData({ ...FormData, kls: e.target.value })}
              placeholder="Enter Kelas"
            />

                    {errors.kls && <span className="invalid">{errors.kls.message}</span>}
              </div>
            </Col>
            <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Pilih Mapel</label>
                  <RSelect
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultData={[mpl[0], mpl[1]]}
                    isMulti
                    options={mpl}
                  />
                </div>
              </Col>
            
            <Col size="12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Simpan
                </Button>
              </li>
              <li>
                <Link to = '/rapor/mapel-kelas'>
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
 export default AddMapel