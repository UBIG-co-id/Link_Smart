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
import { filtertipenilai, penilaianAspek} from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddPenilaianAspek = ({ modal, closeModal, }) => {
  const [data, setData] = useState(penilaianAspek);
  const [files4, setFiles4] = useState([]);
  const [FormData, setFormData] = useState({
    sikap: "",
    nilai: "",
    deskap:  "",
  });

  const resetForm = () => {
    setFormData({
        sikap: "",
        nilai: "",
        deskap:  "",

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
    const { sikap, nilai, deskap } = submitData;
    let submittedData = {
        id: data.length + 1,
        sikap: sikap,
        nilai: nilai,
        deskap: deskap,
    };
    setData([submitData, ...data]);
    resetForm();
    // setModal({ edit: false , add: false });
};

  return (

    <React.Fragment>
    <Head title="Add Penilaian Aspek"></Head>
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Tambah Penilaian Aspek
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
         <h5 className="title">Penilaian Aspek</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
           <Col md="6">
              <div className='form-group'>
              <label className="form-label">Nama Aspek</label>
              <input
              className="form-control"
              type="text"
              {...register('aspek', { required: "This field is required" })}
              value={FormData?.aspek || ''}
              onChange={(e) => setFormData({ ...FormData, aspek: e.target.value })}
              placeholder="Contoh: A"
            />
                    {errors.aspek && <span className="invalid">{errors.aspek.message}</span>}
              </div>
             <Col md="12">
             <div className="form-group">
             <label className="form-label">Tipe Penilaian</label>
             <div>
             <RSelect
                options={filtertipenilai}
                value={{
                  value: FormData?.ujian || '',
                  label: FormData?.ujian || '',
                }}
                onChange={(e) => setFormData({ ...FormData, ujian: e.value })}
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
                <Link to = '/rapor/penilaian-aspek'>
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
     export default AddPenilaianAspek