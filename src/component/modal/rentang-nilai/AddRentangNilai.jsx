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
import { filtertipenilai, rentangNilai} from '../../user/UserData';
import { Link } from 'react-router-dom';
const AddRentangNilai = ({ modal, closeModal, }) => {
  const [data, setData] = useState(rentangNilai);
  const [files4, setFiles4] = useState([]);
  const [FormData, setFormData] = useState({
        deskripsi:"",
        huruf: "",
        tenantid: "",
  });

  const resetForm = () => {
    setFormData({
        deskripsi:"",
        huruf: "",
        tenantid: "",
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
    const { deskripsi, huruf, tenantid } = submitData;
    let submittedData = {
        id: data.length + 1,
        deskripsi: deskripsi,
        huruf: huruf,
        tenantid: tenantid,
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
              Tambah Rentang Nilai
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
         <h5 className="title">Rentang Nilai</h5>
         <div className='mt-4'>
           <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
           <Col md="4">
              <div className='form-group'>
              <label className="form-label">Deskripsi</label>
              <input
              className="form-control"
              type="text"
              {...register('deskripsi', { required: "This field is required" })}
              value={FormData?.deskripsi || ''}
              onChange={(e) => setFormData({ ...FormData, deskripsi: e.target.value })}
              placeholder=""
            />
                    {errors.deskripsi && <span className="invalid">{errors.deskripsi.message}</span>}
              </div>
              <Col md="12">
              <div className='form-group'>
              <label className="form-label">Huruf</label>
              <input
              className="form-control"
              type="text"
              {...register('huruf', { required: "This field is required" })}
              value={FormData?.huruf || ''}
              onChange={(e) => setFormData({ ...FormData, huruf: e.target.value })}
              placeholder=""
            />
                    {errors.huruf && <span className="invalid">{errors.huruf.message}</span>}
              </div>
            </Col>
            <Col md="12">
              <div className='form-group'>
              <label className="form-label">Tenant ID</label>
              <input
              className="form-control"
              type="text"
              {...register('tenantid', { required: "This field is required" })}
              value={FormData?.tenantid || ''}
              onChange={(e) => setFormData({ ...FormData, tenantid: e.target.value })}
              placeholder=""
            />
                    {errors.tenantid && <span className="invalid">{errors.tenantid.message}</span>}
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
                <Link to = '/rapor/setting-rentang'>
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
     export default AddRentangNilai