import React, { useState } from 'react'
import Head from '../../layout/Head'
import Content from '../../layout/Content/Content'
import { 
    Col, 
    Row, 
    PreviewAltCard, 
    Block, 
    BlockHead, 
    BlockBetween, 
    BlockHeadContent, 
    BlockContent, 
    BlockTitle, 
    BlockDes, 
    RSelect, 
    Button } from '../../component/Component'
import { filterStatus } from '../../component/user/UserData'

const PresensiSiswa = () => {
    const [formData, setFormData] = useState({
        // jk: "Laki-Laki",
        status: "Active",

    });
    return (
        <React.Fragment>
            <Head title="Laporan Presensi Siswa" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Laporan Presensi Siswa</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Welcome to Link Smart </p>
                            </BlockDes>
                        </BlockHeadContent>

                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row className="g-gs">
                        <Col md="6" xxl="4">
                            <PreviewAltCard className="card-full">
                                Presensi Harian Siswa
                                <Col md='12' >
                                    <div className="form-group" style={{ marginTop: '41px' }}>
                                        <label className="form-label">Tanggal</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            // {...register('nip', { required: "This field is required" })}
                                            // value={formData.nip}
                                            // onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                                            placeholder="Enter NIP" />
                                        {/* {errors.nip && <span className="invalid">{errors.nip.message}</span>} */}
                                    </div>
                                </Col>
                                <Col md='12' >
                                    <div className="form-group" style={{ marginTop: '21px' }}>
                                        <label className="form-label">Status</label>
                                        <RSelect
                                            options={filterStatus}
                                            value={{
                                                value: formData.status,
                                                label: formData.status,
                                            }}
                                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                                        />
                                    </div>
                                </Col>
                                <Col size="12">
                                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2" style={{ marginTop: '21px' }}>
                                        <li>
                                            <Button color="success" size="lg" type="submit">
                                                Preview
                                            </Button>
                                        </li>
                                        <li >
                                        <Button color="primary" size="lg" type="submit">
                                                Cetak
                                            </Button>
                                        </li>
                                    </ul>
                                </Col>
                            </PreviewAltCard>
                        </Col>
                        <Col md="6" xxl="4">
                            <PreviewAltCard className="card-full">
                                Presensi Periodik Siswa
                                <Col md='12' >
                                    <div className="form-group" style={{ marginTop: '41px' }}>
                                        <label className="form-label">Tanggal</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            // {...register('nip', { required: "This field is required" })}
                                            // value={formData.nip}
                                            // onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                                            placeholder="Enter NIP" />
                                        {/* {errors.nip && <span className="invalid">{errors.nip.message}</span>} */}
                                    </div>
                                </Col>
                                <Col md='12' >
                                    <div className="form-group" style={{ marginTop: '21px' }}>
                                        <label className="form-label">Statu</label>
                                        <RSelect
                                            options={filterStatus}
                                            value={{
                                                value: formData.status,
                                                label: formData.status,
                                            }}
                                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                                        />
                                    </div>
                                </Col>
                                <Col size="12">
                                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2" style={{ marginTop: '21px' }}>
                                        <li>
                                            <Button color="success" size="lg" type="submit">
                                                Preview
                                            </Button>
                                        </li>
                                        <li >
                                        <Button color="primary" size="lg" type="submit">
                                                Cetak
                                            </Button>
                                        </li>
                                    </ul>
                                </Col>
                            </PreviewAltCard>
                        </Col>
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default PresensiSiswa
