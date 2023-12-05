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
import { Link } from 'react-router-dom';

const AddModal = ({ modal, closeModal, onSubmit,  filterMpl }) => {
    const [files4, setFiles4] = useState([]);

    const [FormData, setFormData] = useState({
        nuptk: '',
        nlp: "",
        npgn: "",
        level: "",
    });

    const resetForm = () => {
        setFormData({
         nuptk: '',
        nlp: "",
        npgn: "",
        level: "", 
        });
      };

      useEffect(() => {
        reset(FormData)
      }, [FormData]);
      const { reset, register, handleSubmit, formState: { errors } } = useForm();
    
      const handleDropChange = (acceptedFiles, setFiles) => {
        setFiles(acceptedFiles);
        const selectedFile = acceptedFiles[0];

};

return (
    <React.Fragment>
      <Head title="Add Pengguna"></Head>
      <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
                Data Pengguna
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
         <h5 className="title">Data Pengguna</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
             <Col>
             <div className="form-group">
               <label className="form-label">Data Pengguna</label>
               <div className="form-control-wrap">
                 <input
                   className="form-control"
                   type="text"
                   {...register('npgn', { required: "This field is required" })}
                   value={FormData?.npgn || ''}
                   onChange={(e) => setFormData({ ...FormData, npgn: e.target.value })}
                      placeholder="Ussername" />
                      {errors.npgn && <span className="invalid">{errors.npgn.message}</span>}
              </div>
            </div>
            <Col>
            <div className="form-group">
              <label className="form-label">Singkatan Mata Pelajaran</label>
              <div className="form-control-wrap">
                <input
                   className="form-control"
                   type="text"
                   {...register('singkat', { required: "This field is required" })}
                   value={FormData?.singkat || ''}
                   onChange={(e) => setFormData({ ...FormData, singkat: e.target.value })}
                      placeholder="Ex: MTK" />
                      {errors.singkat && <span className="invalid">{errors.singkat.message}</span>}
              </div>
            </div>
            </Col>
            </Col>
            <Col md="12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Tambah Mata Pelajaran
                </Button>
              </li>
              <li>
                <Link to = '/pengaturan/pengguna'>
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
     export default AddModal