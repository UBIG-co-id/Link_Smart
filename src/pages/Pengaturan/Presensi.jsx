import React, { useState } from 'react';
import Head from '../../layout/Head';
import Content from '../../layout/Content/Content';
import { Col, Row, PreviewAltCard, Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, RSelect, Button, Icon } from '../../component/Component';
import { filterKls, filterMpl, filterSmt, filterStatus, filterSts } from '../../component/user/UserData';

const Presensi = () => {
    const [formData, setFormData] = useState({
        kls: "",
        ganjil: "Ganjil",
        genap: "Genap",
    });

    const [sm, setSm] = useState(false);

    return (
        <React.Fragment>
            <Head title="Presensi" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Presensi</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Welcome to Link Smart </p>
                            </BlockDes>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row className="g-gs">
                        <Col md="15" xxl="2">
                            <PreviewAltCard className="card-full">
                                <Row>
                                <Col size="20">
                                    <ul className="align-center flex-wrap flex-sm-nowrap gx-1 gy-1" style={{ marginTop: '2px' }}>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Pesan</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Perizinan</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit" >
                                               <span style={{ fontSize: '11px' }}> Jam Datang</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Jam Pulang</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Rentang Presensi</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Jam Pegawai Datang</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Jam Pegawai Pulang</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Rentang Presensi Pegawai</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Belum Datang</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" outline className="btn-dim btn-white" size="sm" type="submit">
                                                 <span style={{ fontSize: '11px' }}>Custom</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </Col>
                                </Row>
                            </PreviewAltCard>
                        </Col>
                        <Col md="12" xxl="4">
                            <PreviewAltCard className="card-full">
                                <div className='form-group' style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    Untuk Memasukkan Presensi Siswa
                                </div>
                            </PreviewAltCard>
                        </Col>
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default Presensi;
