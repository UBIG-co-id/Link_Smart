import React, { useState } from 'react'
import Head from '../../layout/Head'
import { bulkActionOptions } from '../../utils/Utils'
import Content from '../../layout/Content/Content'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import {
    Block,
    BlockHead,
    BlockBetween,
    BlockHeadContent,
    BlockTitle,
    BlockDes,
    Button,
    Icon,
    SpecialTable,
    DataTable,
    TooltipComponent,
    PaginationComponent,
    RSelect
} from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { presensiSiswa, filterKls, filterSts } from '../../component/user/UserData'
import AddModal from '../../component/modal/presesensi-siswa/AddModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles
// import { filterKls} from '../../component/user/UserData'


const Siswa = () => {
    const [data, setData] = useState(presensiSiswa);
    const [sm, updateSm] = useState(false);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [selectedDate, setSelectedDate] = useState(null);
    const [tablesm, updateTableSm] = useState(false);

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
    const toggle = () => setonSearch(!onSearch);
    const [actionText, setActionText] = useState("");

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

    const [editId, setEditedId] = useState();
    const [formData, setFormData] = useState({
        nis: "",
        nlp: "",
        kls: "",
        tgl: "",
        masuk: "",
        pulang: "",
        status_in: "",
        keterangan: "",
    });

    const [editFormData, setEditFormData] = useState({
        nlp: "",
        kls: "",
        status: "",
    })

    const resetForm = () => {
        setFormData({
            nis: "",
            nlp: "",
            kls: "",
            tgl: "",
            masuk: "",
            pulang: "",
            status_in: "Masuk",
            keterangan: "",
        });
    };

    const closeModal = () => {
        setModal({ add: false })
        resetForm();
    };

    const onFormSubmit = (submitData) => {
        const { nis, nlp, kls, tgl, masuk, pulang, status_in, status_out, keterangan } = submitData;
        let submittedData = {
            id: data.length + 1,
            nis: nis,
            nlp: nlp,
            kls: "XII",
            tgl: tgl,
            masuk: masuk,
            status_in: status_in,
            pulang: pulang,
            status_out: status_out,
            keterangan: keterangan,

        };
        setData([submittedData, ...data]);
        resetForm();
        setModal({ edit: false }, { add: false });
    };
    return (
        <React.Fragment>
            <Head title="Presensi Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Data Presensi Siswa
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
                                        {/* <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="download-cloud"></Icon>
                                                <span>Template Import PTK</span>
                                            </Button>
                                        </li> */}
                                        <li >
                                            <Button color="warning" onClick={() => setModal({ add: true })}>
                                                <Icon name="list">
                                                </Icon>
                                                <div>Set Presensi 1 Semester </div>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="download-cloud"></Icon>
                                                <span>Ekspor Presensi Siswa</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="upload-cloud"></Icon>
                                                <span>Import Data</span>
                                            </Button>
                                        </li>
                                        {/* <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="user"></Icon>
                                                <span>Status PTK</span>
                                            </Button>
                                        </li> */}
                                        <li>
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Tambah Presensi </div>
                                            </Button>
                                        <li>
                                                {/* <li>
                                                <Button color="primary" onClick={() => setModal({ add: true })}>
                                                    <Icon name="pdf">
                                                    </Icon>
                                                    <div>Presensi Manual</div>
                                                </Button>
                                            </li> */}
                                            </li>
                                        </li>
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
                                    <h5 className="title">Data Pegawai</h5>
                                </div> */}
                                <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                        <div className="from-wrap">
                                            <RSelect
                                                option={bulkActionOptions}
                                                className="w-130px"
                                                placeholder="Semua Kelas"
                                                onChange={(e) => onActionText(e)}
                                            />
                                        </div>
                                        <div className="from-wrap">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                placeholderText="Select Date"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control w-130px" // Atur gaya sesuai kebutuhan
                                            />
                                        </div>
                                        <div className="btn-wrap">
                                            <span className="d-none d-md-block">
                                                <Button
                                                    disabled={actionText !== "" ? false : true}
                                                    color="light"
                                                    outline
                                                    className="btn-dim"
                                                    onClick={(e) => onActionClick(e)}
                                                >
                                                    Apply
                                                </Button>
                                            </span>
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
                        <DataTableBody bodyclass="nk-tb-tnx">
                            <DataTableHead>
                                <DataTableRow>
                                    <span>No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>NIS</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span>Nama Lengkap</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Kelas</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Tanggal</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Masuk</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Status</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Pulang</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Status</span>
                                </DataTableRow>
                                {/* <DataTableRow size="sm" >
                                    <span>In </span>
                                </DataTableRow> */}
                                {/* <DataTableRow size="sm" >
                                    <span>Status </span>
                                </DataTableRow> */}
                                {/* <DataTableRow size="sm" >
                                    <span>Out </span>
                                </DataTableRow> */}
                                {/* <DataTableRow size="sm" >
                                    <span>Status </span>
                                </DataTableRow> */}
                                <DataTableRow size="sm" >
                                    <span>Keterangan </span>
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
                                                    <span>{item.nlp}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.kls}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.tgl}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.masuk}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.status_in}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.pulang}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.status_out}</span>
                                                </div>
                                            </DataTableRow>
                                            {/* <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.in}</span>
                                                </div>
                                            </DataTableRow> */}
                                            {/* <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.status}</span>
                                                </div>
                                            </DataTableRow> */}
                                            {/* <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.out}</span>
                                                </div>
                                            </DataTableRow> */}
                                            {/* <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.status_out}</span>
                                                </div>
                                            </DataTableRow> */}
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.keterangan}</span>
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
                <AddModal modal={modal.add} formData={formData} setFormData={setFormData} onSubmit={onFormSubmit} closeModal={closeModal} filterKls={filterKls} filterSts={filterSts} />
            </Content>
        </React.Fragment>
    )
}

export default Siswa
