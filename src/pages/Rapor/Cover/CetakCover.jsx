import React, { useState } from 'react'
import Head from '../../../layout/Head'
import Content from '../../../layout/Content/Content'
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
} from '../../../component/Component'
import { filterKls, filterMpl, filterSmt, filterStatus, filterSts } from '../../../component/user/UserData'

const Cover = () => {
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
                            <BlockTitle page>Cetak Cover Rapor</BlockTitle>
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
                                    <Col md='5' >
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
                                        </div>
                                    </Col>
                                    <Col md='5' >
                                        <div className="form-group" style={{ marginTop: '18px' }}>
                                            <RSelect
                                                options={filterKls}
                                                placeholder="Pilih Siswa"
                                                // value={{
                                                //     value: formData.kls,
                                                //     label: formData.kls,
                                                // }}
                                                onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </PreviewAltCard>
                        </Col>
                        <Col md="12" xxl="4">
                            <PreviewAltCard className="card-full mt-1">
                                <div className='form-group' style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    Silahkan Pilih Kelas untuk menampilkan data
                                </div>
                            </PreviewAltCard>
                        </Col> 
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Cover