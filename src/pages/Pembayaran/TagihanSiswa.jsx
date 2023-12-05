import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { tagihanSiswa, filterKls } from '../../component/user/UserData'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

const TagihanSiswa = () => {
    const [sm, updateSm] = useState(false);
    const [data, setData] = useState(tagihanSiswa);
    const toggle = () => setonSearch(!onSearch);
    const [onSearchText, setSearchText] = useState("");
    const [onSearch, setonSearch] = useState(true);

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    const [formData, setFormData] = useState({
        nis: "",
        nls: "",
        kls: "",
        sppgan: "",
        sppgen: "",
        tl: "",
        total: "",
    });
    return (
        <React.Fragment>
            <Head title="Tagihan Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Tagihan Siswa
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
                                                <span>Export Semua Tagihan Siswa</span>
                                            </Button>
                                        </li>
                                        {/* <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="reports"></Icon>
                                                <span>Reports</span>
                                            </Button>
                                        </li>
                                        <li className="nk-block-tools-opt">
                                            <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus"></Icon>
                                            </Button>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block size="lg">
                    <DataTable className="card-stretch">
                        <div className="card-inner">
                            <div className="card-title-group">
                                {/* <div className="card-title">
                                    <h5 className="title">Data Histori Pembayaran</h5>
                                </div> */}
                                <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                        <div className="from-wrap w-150px">
                                            <RSelect
                                                options={filterKls}
                                                placeholder="Semua Kelas"
                                                // value={{
                                                //     value: formData.kls,
                                                //     label: formData.kls,
                                                // }}
                                                onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-tools me-n1">
                                    <ul className="btn-toolbar gx-1">
                                        <li>
                                            <Button
                                                href="#search"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggle();
                                                }}
                                                className="btn-icon search-toggle toggle-search"
                                            >
                                                <Icon name="search"></Icon>
                                            </Button>
                                        </li>
                                        <li className="btn-toolbar-sep"></li>
                                        <li>
                                            <UncontrolledDropdown>
                                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                                    <div className="dot dot-primary"></div>
                                                    <Icon name="filter-alt"></Icon>
                                                </DropdownToggle>
                                            </UncontrolledDropdown>
                                        </li>
                                    </ul>
                                </div>
                                <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                                    <div className="search-content">
                                        <Button
                                            onClick={() => {
                                                setSearchText("");
                                                toggle();
                                            }}
                                            className="search-back btn-icon toggle-search"
                                        >
                                            <Icon name="arrow-left"></Icon>
                                        </Button>
                                        <input
                                            type="text"
                                            className="border-transparent form-focus-none form-control"
                                            placeholder="Search by Order Id"
                                            value={onSearchText}
                                            onChange={(e) => onFilterChange(e)}
                                        />
                                        <Button className="search-submit btn-icon">
                                            <Icon name="search"></Icon>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DataTableBody bodyclass="nk-tb-tnx">
                            <DataTableHead>
                                <DataTableRow>
                                    <span>No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>NIS</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Nama Siswa</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Kelas</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>SPP Ganjil</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>SPP Genap</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Tagihan Lain</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Total</span>
                                </DataTableRow>
                                <DataTableRow className="nk-tb-col-tools">Aksi</DataTableRow>
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return (
                                        <DataTableItem key={item.id}>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.id}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nis}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nls}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.kls}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.sppgan}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.sppgen}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.tl}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.total}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow className="nk-tb-col-tools">
                                                <ul className="nk-tb-actions gx-1">
                                                    <TooltipComponent
                                                        tag="a"
                                                        containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                                        id={item.ref + "details"}
                                                        icon="eye"
                                                        direction="top"
                                                        text="Details"
                                                    />
                                                    <li className="" onClick={() => onApproveClick(item.id)}>
                                                        <TooltipComponent
                                                            tag="a"
                                                            containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                                            id={item.ref + "approve"}
                                                            icon="done"
                                                            direction="top"
                                                            text="approve"
                                                        />
                                                    </li>
                                                    <li className="" onClick={() => onRejectClick(item.id)}>
                                                        <TooltipComponent
                                                            tag="a"
                                                            containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                                            id={item.ref + "reject"}
                                                            icon="cross-round"
                                                            direction="top"
                                                            text="Reject"
                                                        />
                                                    </li>
                                                </ul>
                                            </DataTableRow>
                                        </DataTableItem>
                                    )
                                }) : null}
                        </DataTableBody>
                        <div className="card-inner">
                            {currentItems.length > 0 ? (
                                <PaginationComponent
                                    itemPerPage={itemPerPage}
                                    totalItems={data.length}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                />
                            ) : (
                                <div className="text-center">
                                    <span className="text-silent">No data found</span>
                                </div>
                            )}
                        </div>
                    </DataTable>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default TagihanSiswa
