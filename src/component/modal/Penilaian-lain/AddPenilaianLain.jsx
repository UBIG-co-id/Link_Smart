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
import { penilaianLain } from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddPenilaianSikap = ({ modal, closeModal, }) => {
  const [data, setData] = useState(penilaianLain);
  const [files4, setFiles4] = useState([]);
  const [FormData, setFormData] = useState({
    penilaianlain: "",
    kolomnilai:"",
  });
  const [useHeader, setuseHeader] = useState('notuse');

  const handleuseHeaderChange = (type) => {
    setuseHeader(type);
  };

  const resetForm = () => {
    setFormData({
        penilaianlain: "",
        kolomnilai:"",

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
    const { penilaianlain, kolomnilai } = submitData;
    let submittedData = {
        id: data.length + 1,
        penilaianlain: penilaianlain,
        kolomnilai: kolomnilai,
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
              Tambah Penilaian Lain
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
         <h5 className="title">Penilaian Lain</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
            <Col md="6">
              <div className='form-group'>
              <label className="form-label">Nama Penilaian</label>
              <input
              className="form-control"
              type="text"
              {...register('penilaianlain', { required: "This field is required" })}
              value={FormData?.penilaianlain || ''}
              onChange={(e) => setFormData({ ...FormData, penilaianlain: e.target.value })}
              placeholder="Contoh: Ekstrakurikuler"
            />
                    {errors.penilaianlain && <span className="invalid">{errors.penilaianlain.message}</span>}
              </div>
              <Col md="4">
                  <div className="d-flex">
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="fixedPayment"
                        name="useHeader"
                        value="notuse"
                        checked={useHeader === 'notuse'}
                        onChange={() => handleuseHeaderChange('notuse')}
                      />
                      <label className="form-check-label" htmlFor="notuseHeader">
                        Tanpa Header Tabel
                      </label>
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
                <Link to = '/rapor/penilaian-lain'>
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