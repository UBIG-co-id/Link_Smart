import React, { useState } from 'react';
import Head from '../../layout/Head';
import Content from '../../layout/Content/Content';
import { Col, Row, PreviewAltCard, Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, RSelect, Button, Icon } from '../../component/Component';
import { filterKls, filterMpl, filterSmt, filterStatus, filterSts } from '../../component/user/UserData';

const Catatanwalas = () => {
    const [formData, setFormData] = useState({
        kls: "",
        ganjil: "Ganjil",
        genap: "Genap",
    });

    const [sm, setSm] = useState(false);

    return (
        <React.Fragment>
            <Head title="Catatan Walikelas" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Catatan Walikelas</BlockTitle>
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
                                    <Col md='2' >
                                        <div className="form-group" >
                                            <RSelect
                                                options={filterKls}
                                                placeholder="Pilih Kelas"
                                                onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                            />

                                        </div>
                                    </Col>
                                    <Col md='2' >
                                        <div className="form-group" >
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="upload-cloud"></Icon>
                                                <span>Import Data</span>
                                            </Button>
                                        </div>
                                    </Col>
                                    {/* <Col>
                                    <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                                                <ul className="nk-block-tools g-3">
                                                    <li>
                                                        <Button color="primary" outline className="btn-dim btn-white">
                                                            <Icon name="upload-cloud"></Icon>
                                                            <span>Import Data</span>
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </div>
                                    </Col> */}
                                    {/* <Col>
                                        <div className="toggle-expand-content" >
                                            <ul className="nk-block-tools g-3">
                                                <li>
                                                    <Button color="primary" outline className="btn-dim btn-white">
                                                        <Icon name="upload-cloud"></Icon>
                                                        <span>Import Data</span>
                                                    </Button>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col> */}
                                </Row>
                            </PreviewAltCard>
                        </Col>
                        <Col md="12" xxl="4">
    <PreviewAltCard className="card-full">
        <div className='form-group' style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Untuk Memasukkan Nilai Siswa
        </div>
    </PreviewAltCard>
</Col>

                    </Row>
                </Block>
                
            </Content>
        </React.Fragment>
    );
};

export default Catatanwalas;
