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
import {  kkmBatas } from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddKkmBatas = ({ modal, closeModal, }) => {
  const [data, setData] = useState(kkmBatas);
  const [files4, setFiles4] = useState([]);
  const [FormData, setFormData] = useState({
        kkm: "",
        batasd: "",
        batasc: "",
        batasb: "",
        batasa: "",
  });

  const resetForm = () => {
    setFormData({
        kkm: "",
        batasd: "",
        batasc: "",
        batasb: "",
        batasa: "",

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
    const { kkm, batasd, batasc, batasb, batasa } = submitData;
    let submittedData = {
        id: data.length + 1,
        kkm: kkm,
        batasd: batasd,
        batasc: batasc,
        batasb: batasb,
        batasa: batasa,
    };
    setData([submitData, ...data]);
    resetForm();
    // setModal({ edit: false , add: false });
};

  return (

    <React.Fragment>
    <Head title="Add KKM Batas"></Head>
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page tag="h3">
                KKM Batas
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
         <h5 className="title">Tambah Nilai KKM</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
           <Col md="4">
              <div className='form-group'>
              <label className="form-label">KKM 1-100</label>
              <input
              className="form-control"
              type="number"
              {...register('kkm', { required: "This field is required" })}
              value={FormData?.kkm || ''}
              onChange={(e) => setFormData({ ...FormData, kkm: e.target.value })}
              placeholder=""
            />
                    {errors.kkm && <span className="invalid">{errors.kkm.message}</span>}
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
                <Link to = '/rapor/penilaian-kkm-batas'>
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
     export default AddKkmBatas