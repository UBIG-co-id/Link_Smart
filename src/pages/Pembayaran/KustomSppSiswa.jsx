import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, Label, UncontrolledDropdown } from 'reactstrap'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { bulkActionOptions } from '../../utils/Utils'

const KustomSppSiswa = () => {
    const [sm, updateSm] = useState(false);
    const [data, setData] = useState([]);
    const [numUrutan, setNumUrutan] = useState(1);
    const [sort, setSortState] = useState("");
    const sortFunc = (params) => {
        let defaultData = [...data]; // Clone array to avoid modifying the original data
        if (params === "asc") {
            let sortedData = defaultData.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
            setData(sortedData);
        } else if (params === "dsc") {
            let sortedData = defaultData.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
            setData(sortedData);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
    
            // Membuat objek untuk menyimpan parameter yang akan digunakan dalam URL
            const params = {
                sort_order: sort === "asc" ? "ascending" : "descending",
                page: 1, // Page selalu dimulai dari 1, Anda dapat memperbarui ini jika menggunakan halaman yang berbeda
                limit: itemPerPage,
            };
    
            // Mengubah objek parameter menjadi query string
            const queryString = Object.keys(params)
                .map(key => `${key}=${encodeURIComponent(params[key])}`)
                .join('&');
    
            // Menggabungkan URL dengan query string
            const apiUrl = `https://linksmart-1-t2560421.deta.app/sppkustom-cari?${queryString}`;
    
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // ... (tambahkan konfigurasi lainnya sesuai kebutuhan)
            });
    
            const result = await response.json();
            console.log("ini Data", result.Data)
            let updatedNumUrutan = numUrutan;
    
            const updatedData = result.Data.map((item) => {
                return { ...item, nomor_urutan: updatedNumUrutan++ };
            });
    
            setData(updatedData);
            setNumUrutan(updatedNumUrutan);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        setNumUrutan(1);
        fetchData();
    }, [sort, itemPerPage]);

    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    
    const [actionText, setActionText] = useState("");
    const toggle = () => setonSearch(!onSearch);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setNumUrutan((pageNumber - 1) * itemPerPage + 1);
    };

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
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

    const [editId, setEditedId] = useState();
    const [formData, setFormData] = useState({
        nm: "",
        nis: "",
        kelas: "",
        kustomSpp: "",
        start: "",
        batas: "",
    });
    const [editFormData, setEditFormData] = useState({
        nm: "",
        nis: "",  
        kelas: "",
        kustomSpp: "",
        start: "",
        batas: "",
    });
    const resetForm = () => {
        setFormData({
            nm: "",
            nis: "",
            kelas: "",
            kustomSpp: "",
            start: "",
            batas: "",

        });
    };
    const closeEditModal = () => {
        setModal({ edit: false })
        resetForm();
    };
    const onEditClick = (id) => {
        data.forEach((item) => {
            if (item.id === id) {
                setEditFormData({
                    nm: item.nm,
                    nis: item.nis,
                    kelas: item.kelas,
                    kustomSpp: item.kustomSpp,
                    start: item.start,
                    batas: item.batas,
                });
                setModal({ edit: true }, { add: false });
                setEditedId(id);
            }
        });
    };
    const onEditSubmit = (submitData) => {
        const {nm, nis, kelas, kustomSpp, start, batas } = submitData;
        let submittedData;
        let newitems = data;
        newitems.forEach((item) => {
            if (item.id === editId) {
                submittedData = {
                    nm: nm,
                    nis: nis,
                    kelas: kelas,
                    kustomSpp: kustomSpp,
                    start: start,
                    batas: batas,
                };
            }
        });
        let index = newitems.findIndex((item) => item.id === editId);
        newitems[index] = submittedData;
        setModal({ edit: false });
    };

    return (
        <React.Fragment>
            <Head title="Kustom SPP Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Kustom SPP Siswa
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
                                                <span>Template Import Kustom SPP</span>
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
                                                <Icon name="reports"></Icon>
                                                <span>Reports</span>
                                            </Button>
                                        </li> */}
                                        {/* <li className="nk-block-tools-opt">
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
                                    <h5 className="title">Data Pegawai</h5>
                                </div> */}
                                <div className="card-tools">
                                <label className="text-bold">PERHATIAN!!</label>
                                <label className="text-bold">Jika Kustom SPP Kosong.Batas Kustom Kosong </label>
                                    {/* <label className="text-bold">PERHATIAN!!</label> */}
                                    <div className="form-inline flex-nowrap gx-3">
                                        <div className="from-wrap">
                                            <RSelect
                                                option={bulkActionOptions}
                                                className="w-130px"
                                                placeholder="Semua Kelas"
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

                        {/* <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title">Data Pegawai</h5>
                                </div>
                                <div className="card-tools">
                                <label className="text-bold">PERHATIAN!!</label>
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
                        </div> */}
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
                                    <span>Kustom SPP</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Start Kustom</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Batas Kustom</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Ubah SPP</span>
                                </DataTableRow>
                                {/* <DataTableRow className="nk-tb-col-tools">Aksi</DataTableRow> */}
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return (
                                        <DataTableItem key={item.id}>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nomor_urutan}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nis}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nm}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.kls}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.kustomSpp}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.start}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.batas}</span>
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

export default KustomSppSiswa
