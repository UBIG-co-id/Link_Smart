import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import {
  Col,
  Row,
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Button,
  Icon,
  SpecialTable,
  DataTable,
  RSelect,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard
} from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import Dropzone from 'react-dropzone'
const Indentitas = () => {
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [files4, setFiles4] = useState([]);
  const handleDropChange = (acceptedFiles, setFiles) => {
    // SetFiles di sini adalah untuk mengupdate state lokal di Dropzone
    setFiles(acceptedFiles);

    // Ambil informasi file pertama dari acceptedFiles
    const selectedFile = acceptedFiles[0];

    // Update state formData dengan informasi file gambar
    // setFormData({
    //   ...formData,
    //   fotoData: selectedFile,
    // });
  };

  return (
    <React.Fragment>
      <Head title="Identitas"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Identitas
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Link Smart</p>
              </BlockDes>
            </BlockHeadContent>
            {/* <BlockHeadContent>
                    <div className="toggle-wrap nk-block-tools-toggle">
                        <Button
                            className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                            onClick={() => updateSm(!sm)}
                        >
                            <Icon name="more-v"></Icon>
                        </Button>
                        <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                            <ul className="nk-block-tools g-3">
                                <li>
                                    <Button color="primary" outline className="btn-dim btn-white">
                                        <Icon name="download-cloud"></Icon>
                                        <span>Export</span>
                                    </Button>
                                </li>
                                <li>
                                    <Button color="primary" outline className="btn-dim btn-white">
                                        <Icon name="reports"></Icon>
                                        <span>Reports</span>
                                    </Button>
                                </li>
                                <li className="nk-block-tools-opt">
                                    <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                                        <Icon name="plus"></Icon>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>
        <Block>
        <Row className="g-gs">
          <PreviewAltCard className="card-full">
            <Row className="g-gs">
              <Col md='4'>
                <label className="form-label">Foto Data Sekolah</label>
                <Dropzone
                  onDrop={(acceptedFiles, e) => {
                    e.preventDefault(); // Ini akan mencegah perilaku default
                    handleDropChange(acceptedFiles, setFiles4);
                  }}
                  accept={[".jpg", ".png", ".svg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {files4.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button color="primary">SELECT</Button>
                          </div>
                        )}
                        {files4.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
                <div>
                  <span>Note:</span>
                </div>
                <span>Ukuran Maksimal Foto Logo Sekolah 100 KB</span>
              </Col>
              <Col md="8">
                <div className="form-group" style={{ marginLeft: '200px' }}>
                  <label className="form-label">NPSN</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
                <Col md="12">
                <div className="form-group" style={{ marginLeft: '200px', marginTop: '10px' }}>
                  <label className="form-label">Website Sekolah</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              <Col md="12">
                <div className="form-group" style={{ marginLeft: '200px', marginTop: '10px'  }}>
                  <label className="form-label">Email Sekolah</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              </Col>
              
            </Row>
            <Row className="g-gs">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Nama Sekolah</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Provinsi</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
            </Row>
            <Row className="g-gs">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Alamat Sekolah</label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control"
                      // {...register('alamat', { required: "This field is required" })}
                      // value={formData.alamat}
                      // onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      placeholder="Enter Alamat"
                    />
                    {/* {errors.alamat && <span className="invalid">{errors.alamat.message}</span>} */}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group" style={{  marginTop: '10px'  }}>
                  <label className="form-label">Kabupaten</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
                <Col md="12">
                <div className="form-group" >
                  <label className="form-label">Kabupaten</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              </Col>
              
            </Row>
            <Row className="g-gs">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Jumlah Siswa</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group" >
                  <label className="form-label">Kecamatan</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
            </Row>
            <Row className="g-gs">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Tanggal Rapor (Cover Rapor)</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group" >
                  <label className="form-label">Kelurahan</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
            </Row>
            <Row className="g-gs">
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Kepala Sekolah (Cover Rapor)</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group" >
                  <label className="form-label">Kecamatan</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group" >
                  <label className="form-label">No. Fax</label>
                  <input
                    className="form-control"
                    type="number"
                    // {...register('nuptk', { required: "This field is required" })}
                    // value={formData.nuptk}
                    // onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                    placeholder="Enter Nama Sekolah" />
                  {/* {errors.nuptk && <span className="invalid">{errors.nuptk.message}</span>} */}
                </div>
              </Col>
            </Row>
          </PreviewAltCard>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  )
}

export default Indentitas
