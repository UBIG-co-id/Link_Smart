import React, { useState, useContext, useEffect } from 'react'
import Content from '../../../layout/Content/Content'
import Head from '../../../layout/Head'
import { Col, Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../../component/table/DataTable'
import { filterPn, filterTn, filterNs } from '../../../component/user/UserData'
const Umum = () => {
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    const [formData, setFormData] = useState({
        Pn: '',
        Tn: '',
        Ns: '',
    });
    return (
        <React.Fragment>
            <Head title="Setting Umum"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Setting Umum
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Welcome to Link Smart</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <Button
                                    className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                    onClick={() => updateSm(!sm)}
                                >
                                    <Icon name="more-v"></Icon>
                                </Button>
                                {/* <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
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
                                </div> */}
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block size="lg">
                    <DataTable className="card-stretch">
                        <DataTableBody bodyclass="nk-tb-tnx">
                            <div className="card-inner position-relative card-tools-toggle">
                                <div className="card-title-group">
                                    <Col md="6">
                                        <div className="form-group">
                                            <label className="form-label">Tipe Penilaian</label>
                                            <div className="form-control-wrap">
                                                <RSelect
                                                    options={filterTn}
                                                    value={{
                                                        value: formData.Tn,
                                                        label: formData.Tn,
                                                    }}
                                                    onChange={(e) => setFormData({ ...formData, Tn: e.value })}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                                <Col md="6">
                                    <div className="form-group">
                                        <label className="form-label">Penginputan Nilai</label>
                                        <div className="form-control-wrap">
                                            <RSelect
                                                options={filterPn}
                                                value={{
                                                    value: formData.Pn,
                                                    label: formData.Pn,
                                                }}
                                                onChange={(e) => setFormData({ ...formData, Pn: e.value })}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <label className="form-label">Penginputan Nilai Sikap</label>
                                        <div className="form-control-wrap">
                                            <RSelect
                                                options={filterNs}
                                                value={{
                                                    value: formData.Ns,
                                                    label: formData.Ns,
                                                }}
                                                onChange={(e) => setFormData({ ...formData, Ns: e.value })}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col size="12" >
                                    <Button color="primary" size="md" type="submit" style={{ marginTop: '21px' }}>
                                        Simpan
                                    </Button>
                                </Col>
                            </div>
                        </DataTableBody>
                    </DataTable>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Umum
