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
  PreviewAltCard,
  Block
} from '../../Component'
import { useForm } from 'react-hook-form'
import Dropzone from "react-dropzone";
import { filterMpl } from '../../user/UserData';
import Head from '../../../layout/Head';
import Content from '../../../layout/Content/Content';
import { filterStatus, filterJk } from '../../../component/user/UserData';
// import { Navigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

const AddProfile = ({ modal, closeModal, onSubmit,  filterMpl }) => {
  const [files4, setFiles4] = useState([]);

  const [FormData, setFormData] = useState({
    judul: "",
    urutan: "",
});

const resetForm = () => {
  setFormData({
    judul: "",
    urutan: "",  
  });
};

  useEffect(() => {
    reset(FormData)
  }, [FormData]);
  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const handleDropChange = (acceptedFiles, setFiles) => {
    setFiles(acceptedFiles);
    const selectedFile = acceptedFiles[0];

    // setFormData({
    //   ...formData,
    //   fotoData: selectedFile,
    // });
  };

  return (
    <React.Fragment>
      <Head title="Add Mapel"></Head>
      <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
                Tambah Profil
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
         <h5 className="title"></h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
             <Col>
             <div className="form-group">
               <label className="form-label">Judul</label>
               <div className="form-control-wrap">
                 <input
                   className="form-control"
                   type="text"
                   {...register('judul', { required: "This field is required" })}
                   value={FormData?.judul || ''}
                   onChange={(e) => setFormData({ ...FormData, judul: e.target.value })}
                      placeholder="judul" />
                      {errors.judul && <span className="invalid">{errors.judul.message}</span>}
              </div>
            </div>
            <Col>
            <div className="form-group">
              <label className="form-label">Urutan</label>
              <div className="form-control-wrap">
                <input
                   className="form-control"
                   type="number"
                   {...register('urutan', { required: "This field is required" })}
                   value={FormData?.urutan || ''}
                   onChange={(e) => setFormData({ ...FormData, urutan: e.target.value })}
                      placeholder="" />
                      {errors.urutan && <span className="invalid">{errors.urutan.message}</span>}
              </div>
            </div>
            </Col>
            </Col>
            <Col md="12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Simpan
                </Button>
              </li>
              <li>
                <Link to = '/pengaturan/profile'>
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
    
  )
}
 export default AddProfile