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
                        <Col md="13" xxl="3">
                            <PreviewAltCard className="card-full">
                                <Row>
                                <Col size="12">
                                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2" style={{ marginTop: '21px' }}>
                                        <li>
                                            <Button color="primary" size="sm" type="submit">
                                                Pesan
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Perizinan
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Jam Datang
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Jam Pulang
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Rentang Presensi
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Jam Pegawai Datang
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Jam Pegawai Pulang
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Rentang Presensi Pegawai
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Belum Datang
                                            </Button>
                                        </li>
                                        <li >
                                            <Button color="primary" size="sm" type="submit">
                                                Custom
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
