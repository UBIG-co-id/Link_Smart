import React, { useState, useContext, useEffect } from 'react'
import Content from '../../../layout/Content/Content'
import Head from '../../../layout/Head'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../../component/table/DataTable'
import { penilaianKd } from '../../../component/user/UserData'
const Kd = () => {
    const [sm, updateSm] = useState(false);
    const [data, setData] = useState(penilaianKd);
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const onApproveClick = (id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = "Completed";
        setData([...newData]);
    };
    const onRejectClick = (id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = "Rejected";
        setData([...newData]);
    };
    return (
        <React.Fragment>
            <Head title="Penilaian KD"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Penilaian KD
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
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block size="lg">
                    <DataTable className="card-stretch">
                        <DataTableBody bodyclass="nk-tb-tnx">
                        <DataTableHead>
                                <DataTableRow>
                                    <span>No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>No. KD</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span>Deskripsi</span>
                                </DataTableRow>
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return(
                                        <DataTableItem key={item.id}>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.id}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nokd}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-col-tools">
                                                <div className="tb-lead">
                                                    <span>{item.deskripsi}</span>
                                                </div>
                                            </DataTableRow>
                                        </DataTableItem>
                                    )
                                }): null}
                        </DataTableBody>
                    </DataTable>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Kd
