import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { mutasiSiswa, filterJp, filterP, filterPeng, filterAgm, filterJk, filterThn, filterBln, filterKls } from '../../component/user/UserData'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap'
import { bulkActionOptions } from '../../utils/Utils'
import Mutasi from '../../component/modal/siswa/Mutasi'
import { Link } from 'react-router-dom';

const MutasiSiswa = () => {
    const [sm, updateSm] = useState(false);
    const [data, setData] = useState(mutasiSiswa);
    const toggle = () => setonSearch(!onSearch);
    const [onSearchText, setSearchText] = useState("");
    const [onSearch, setonSearch] = useState(true);
    const [actionText, setActionText] = useState("");

    const onActionText = (e) => {
        setActionText(e.value);
    };

    const onActionClick = (e) => {
        if (actionText === "suspend") {
            let newData = data.map((item) => {
                if (item.checked === true) item.status = "Suspend";
                return item;
            });
            setData([...newData]);
        } else if (actionText === "delete") {
            let newData;
            newData = data.filter((item) => item.checked !== true);
            setData([...newData]);
        }
    };

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    const closeModal = () => {
        setModal({ add: false })
        resetForm();
    };
    const [formData, setFormData] = useState({
        nis: "",
        nuptk: "",
        fotoData: null,
        nama: "",
        jk: "Laki-Laki",
        status: "Active",
        notelp: "",
        email: "",
        tlahir: "",
        tgllahir: '',
        tglmt: "",
        nik: "",
        alamat: "",
    });
    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            balance: 0,
            phone: "",
            jk: "Laki-Laki",
            status: "Active",
        });
    };

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
    return (
        <React.Fragment>
            <Head title="Mutasi Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Mutasi Siswa
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
                                                <span>Download Data Mutasi</span>
                                            </Button>
                                        </li>
                                        {/* <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="reports"></Icon>
                                                <span>Reports</span>
                                            </Button>
                                        </li> */}
                                        <li >
                                            <Link to='/siswa/add-mutasi-siswa'>
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Data Mutasi</div>
                                            </Button>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block size="lg">
                    <DataTable className="card-stretch">
                        <div className="card-inner position-relative card-tools-toggle">
                            <div className="card-title-group">
                                <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                        <div className="from-wrap">
                                            <RSelect
                                                option={filterThn}
                                                className="w-150px"
                                                placeholder="Tahun Ajran Aktif"
                                                onChange={(e) => onActionText(e)}
                                            />
                                        </div>
                                        <div className="from-wrap">
                                            <RSelect
                                                option={filterBln}
                                                className="w-150px"
                                                placeholder="Semua Bulan"
                                                onChange={(e) => onActionText(e)}
                                            />
                                        </div>
                                        <div className="from-wrap">
                                            <RSelect
                                                option={filterKls}
                                                className="w-150px"
                                                placeholder="Semua Jenjang"
                                                onChange={(e) => onActionText(e)}
                                            />
                                        </div>
                                        {/* <div className="from-wrap">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                placeholderText="Select Date"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control w-130px" // Atur gaya sesuai kebutuhan
                                            />
                                        </div> */}
                                        <div className="btn-wrap">
                                            {/* <span className="d-none d-md-block">
                                                <Button
                                                    disabled={actionText !== "" ? false : true}
                                                    color="light"
                                                    outline
                                                    className="btn-dim"
                                                    onClick={(e) => onActionClick(e)}
                                                >
                                                    Apply
                                                </Button>
                                            </span> */}
                                            <span className="d-md-none">
                                                <Button
                                                    color="light"
                                                    outline
                                                    disabled={actionText !== "" ? false : true}
                                                    className="btn-dim  btn-icon"
                                                    onClick={(e) => onActionClick(e)}
                                                >
                                                    <Icon name="arrow-right"></Icon>
                                                </Button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-tools me-n1">
                                    <ul className="btn-toolbar gx-1">
                                        <li>
                                            <a
                                                href="#search"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggle();
                                                }}
                                                className="btn btn-icon search-toggle toggle-search"
                                            >
                                                <Icon name="search"></Icon>
                                            </a>
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
                        <DataTableBody compact>
                            <DataTableHead>

                                <DataTableRow>
                                    <span className="sub-text">No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Tanggal Mutasi</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">NIS</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Nama Siswa</span>
                                </DataTableRow>

                                <DataTableRow >
                                    <span className="sub-text">Kelas</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Jenis Surat</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Aksi</span>
                                </DataTableRow>
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return (
                                        <DataTableItem key={item.id}>
                                            <DataTableRow size="md">
                                                <span>{item.id}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.tglmutasi}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.nis}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.nls}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.kls}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.jeniss}</span>
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
                {/* <Mutasi modal={modal.add} closeModal={closeModal} formData={formData} setFormData={setFormData} filterJk={filterJk} filterAgm={filterAgm} filterJp={filterJp} filterP={filterP} filterPeng={filterPeng} /> */}
            </Content>
        </React.Fragment>
    )
}

export default MutasiSiswa
