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
import { filtertiperapor, filterSt, templateRapor} from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddTemplateRapor = ({ modal, closeModal, }) => {
  const [data, setData] = useState(templateRapor);
  const [files4, setFiles4] = useState([]);
  const [FormData, setFormData] = useState({
    namatemplate: "",
    tipe: "",
    aktif:"",
  });

  const resetForm = () => {
    setFormData({
        namatemplate: "",
        tipe: "",
        aktif:"",

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
    const { namatemplate, tipe, aktif } = submitData;
    let submittedData = {
        id: data.length + 1,
        namatemplate: namatemplate,
        tipe: tipe,
        aktif:aktif,
    };
    setData([submitData, ...data]);
    resetForm();
    // setModal({ edit: false , add: false });
};

  return (

    <React.Fragment>
    <Head title="Add Template Rapor"></Head>
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Tambah Template Rapor
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
         <h5 className="title">Template Rapor</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
           <Col md="6">
              <div className='form-group'>
              <label className="form-label">Nama Template</label>
              <input
              className="form-control"
              type="text"
              {...register('namatemplate', { required: "This field is required" })}
              value={FormData?.namatemplate || ''}
              onChange={(e) => setFormData({ ...FormData, namatemplate: e.target.value })}
              placeholder=""
            />
                    {errors.namatemplate && <span className="invalid">{errors.namatemplate.message}</span>}
              </div>
             <Col md="12">
             <div className="form-group">
             <label className="form-label">Tipe Rapor</label>
             <div>
             <RSelect
                options={filtertiperapor}
                value={{
                  value: FormData?.tipe || '',
                  label: FormData?.tipe || '',
                }}
                onChange={(e) => setFormData({ ...FormData, tipe: e.value })}
              />

            </div>
            </div>
            </Col>
            <Col md="12">
             <div className="form-group">
             <label className="form-label">Status</label>
             <div>
             <RSelect
                options={filterSt}
                value={{
                  value: FormData?.status || '',
                  label: FormData?.status || '',
                }}
                onChange={(e) => setFormData({ ...FormData, status: e.value })}
              />

            </div>
            </div>
            </Col>
            </Col>
            <Col size="12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
              <li>
                <Button color="primary" size="md" type="submit">
                  Simpan
                </Button>
              </li>
              <li>
                <Link to = '/rapor/template'>
              <a
                // href="#cancel"
                // onClick={(ev) => {
                //   ev.preventDefault();
                //   // closeModal();
                // }}
                className="link link-light"
              >
                Batal
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
     export default AddTemplateRapor