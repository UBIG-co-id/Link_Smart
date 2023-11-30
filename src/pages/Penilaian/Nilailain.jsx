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
    Button
} from '../../component/Component'
import { filterKls, filterSiswa, filterMpl, filterSmt, filterStatus, filterSts } from '../../component/user/UserData'

const Nilailain = () => {
    const [formData, setFormData] = useState({
        // jk: "Laki-Laki",
        // status: "Active",
        kls: "",
        ganjil: "Ganjil",
        genap: "Genap",
    })
    return (
        <React.Fragment>
            <Head title="Penilaian Pengetahuan Umum" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Penilaian Lain</BlockTitle>
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
                                    <div className="form-group" style={{ marginTop: '18px' }}>
                                        <RSelect
                                            options={filterKls}
                                            placeholder="Pilih Kelas"
                                            // value={{
                                            //     value: formData.kls,
                                            //     label: formData.kls,
                                            // }}
                                            onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                        />
                                        {/* <RSelect
                                        options={filterStatus}
                                        placeholder="Pilih Kelas"
                                        value={{
                                            value: formData.status,
                                            label: formData.status,
                                        }}
                                        onChange={(e) => setFormData({ ...formData, status: e.value })}
                                    /> */}
                                    </div>
                                    
                                </Col>
                                {/* <Col md='4' >
                                        <div className="form-group" style={{ marginTop: '21px' }}>
                                            <RSelect
                                                options={filterMpl}
                                                placeholder="Pilih Mata Pelajaran"
                                                onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                            />
                                        </div>
                                </Col> */}
                                <Col md='2' >
                                    <div className="form-group" style={{ marginTop: '21px' }}>
                                        <RSelect
                                            options={filterSiswa}
                                            placeholder="Pilih Siswa"
                                            // value={{
                                            //     value: formData.ganjil,
                                            //     label: formData.status,
                                            // }}
                                            onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                        />
                                    </div>
                                </Col>
                                {/* <Col md='2' >
                                    <div className="form-group" style={{ marginTop: '21px' }}>
                                        <RSelect
                                            options={filterSmt}
                                            placeholder="Pilih Semester"
                                            // value={{
                                            //     value: formData.ganjil,
                                            //     label: formData.status,
                                            // }}
                                            onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                        />
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
    )
}

export default Nilailain
