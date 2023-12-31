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
import { filterSikap, nilaisikap} from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddPenilaianSikap = ({ modal, closeModal, }) => {
  const [data, setData] = useState(nilaisikap);
  const [files4, setFiles4] = useState([]);
  const [FormData, setFormData] = useState({
    sikap: "",
    nilai: "",
    deskap:  "", // Added nilai_kkm to FormData
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
    <Head title="Add KKM"></Head>
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
              Tambah Skeneraio Sikap
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
         <h5 className="title">Penilaian Sikap</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
             <Col md="6">
             <div className="form-group">
             <label className="form-label">Tipe Sikap</label>
             <div>
             <RSelect
                options={filterSikap}
                value={{
                  value: FormData?.sikap || '',
                  label: FormData?.sikap || '',
                }}
                onChange={(e) => setFormData({ ...FormData, sikap: e.value })}
              />

            </div>
            </div>
            <Col md="12">
              <div className='form-group'>
              <label className="form-label">Nilai</label>
              <input
              className="form-control"
              type="text"
              {...register('nilai', { required: "This field is required" })}
              value={FormData?.nilai || ''}
              onChange={(e) => setFormData({ ...FormData, nilai: e.target.value })}
              placeholder="Contoh: A"
            />
                    {errors.nilai_kkm && <span className="invalid">{errors.nilai_kkm.message}</span>}
              </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                  <label className="form-label">Deskripsi</label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control"
                      {...register('deskap', { required: "This field is required" })}
                      value={FormData.deskap}
                      onChange={(e) => setFormData({ ...FormData, deskap: e.target.value })}
                      placeholder=""
                    />
                    {errors.deskap && <span className="invalid">{errors.deskap.message}</span>}
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
                <Link to = '/rapor/penilaian-sikap'>
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
     export default AddPenilaianSikap