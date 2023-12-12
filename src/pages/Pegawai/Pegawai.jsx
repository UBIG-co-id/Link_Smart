import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { UserContext } from '../../component/user/UserContext'
import AddModal from '../../component/modal/pegawai/AddModal'
import EditModal from '../../component/modal/pegawai/EditModal'
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
} from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { transactionData, filterStatus, filterJk } from '../../component/user/UserData'
import { Link } from 'react-router-dom'
const Pegawai = () => {
    // const [data, setData] = useState([]);
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
    // GET DATA
    // GET DATA
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
        const apiUrl = `https://linksmart-1-t2560421.deta.app/ptk-cari?${queryString}`;

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
}, [sort, itemPerPage]); // Menambahkan dependensi sort dan itemPerPage ke dalam useEffect


    // GET DATA

    const [sm, updateSm] = useState(false);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const toggle = () => setonSearch(!onSearch);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setNumUrutan((pageNumber - 1) * itemPerPage + 1);
    };

    

    // const onApproveClick = (id) => {
    //     let newData = data;
    //     let index = newData.findIndex((item) => item.id === id);
    //     newData[index].status = "Completed";
    //     setData([...newData]);
    // };
    const onRejectClick = (id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = "Rejected";
        setData([...newData]);
    };
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    // const { contextData } = useContext(UserContext);
    // const [data, setData] = contextData;
    const [editId, setEditedId] = useState();
    const [formData, setFormData] = useState({
        namaptk: "",
        nip: "",
        nuptk: "",
        nik: "",
        jenis_kelamin: "Laki-Laki",
        status_ptk: "Active",
        foto: "",
        notelp: "",
        email: "",
        tgl_lahir: '',
        tempat_lahir: "",
        tgl_mulaitugas: "",
        alamat: "",
    });

    const [editFormData, setEditFormData] = useState({
        namaptk: "",
        nip: "",
        nuptk: "",
        nik: "",
        jenis_kelamin: "",
        status_ptk: "",
        foto: "",
        notelp: "",
        email: "",
        tgl_lahir: "",
        tempat_lahir: "",
        tgl_mulaitugas: "",
        alamat: "",
        // name: "",
        // email: "",
        // balance: 0,
        // phone: "",
        // status: "",
    });
    const resetForm = () => {
        setFormData({
            namaptk: "",
            nip: "",
            nuptk: "",
            nik: "",
            jenis_kelamin: "Laki-Laki",
            status_ptk: "Active",
            foto: "",
            notelp: "",
            email: "",
            tgl_lahir: "",
            tempat_lahir: "",
            tgl_mulaitugas: "",
            alamat: "",

        });
    };

    // const closeModal = () => {
    //     setModal({ add: false })
    //     resetForm();
    // };
    const closeEditModal = () => {
        setModal({ edit: false })
        resetForm();
    };

    // const onFormSubmit = (submitData) => {
    //     const { nuptk, nip, namaptk, notelp, email, tlahir, tgl_lahir, tempat_lahir, nik, tgl_mulaitugas, alamat } = submitData;
    //     let submittedData = {
    //         id: data.length + 1,
    //         namaptk: namaptk,
    //         nip: nip,
    //         nuptk: nuptk,
    //         nik: nik,
    //         jenis_kelamin: "Laki-Laki",
    //         status_ptk: "Active",
    //         foto: '',
    //         notelp: notelp,
    //         email: email,
    //         tgl_lahir: tgl_lahir,
    //         tempat_lahir: tempat_lahir,
    //         tgl_mulaitugas: tgl_mulaitugas,
    //         alamat: alamat,

    //     };
    //     setData([submittedData, ...data]);
    //     resetForm();
    //     setModal({ edit: false }, { add: false });
    // };
    const onEditClick = (id) => {
        data.forEach((item) => {
            if (item.id === id) {
                setEditFormData({
                    namaptk: item.namaptk,
                    nip: item.nip,
                    nuptk: item.nuptk,
                    nik: item.nik,
                    jenis_kelamin: item.jenis_kelamin,
                    status_ptk: item.status_ptk,
                    foto: item.foto,
                    notelp: item.notelp,
                    email: item.email,
                    tgl_lahir: item.tgl_lahir,
                    tempat_lahir: item.tempat_lahir,
                    tgl_mulaitugas: item.tgl_mulaitugas,
                    alamat: item.alamat,

                });
                setModal({ edit: true }, { add: false });
                setEditedId(id);
            }
        });
    };

    const onEditSubmit = (submitData) => {
        const { namaptk, nip, nuptk, nik, tgl_lahir, tempat_lahir, tgl_mulaitugas, alamat, email, foto, notelp } = submitData;
        let submittedData;
        let newitems = data;
        newitems.forEach((item) => {
            if (item.id === editId) {
                submittedData = {
                    namaptk: namaptk,
                    nip: nip,
                    nuptk: nuptk,
                    nik: nik,
                    jenis_kelamin: editFormData.jenis_kelamin,
                    status_ptk: editFormData.status_ptk,
                    foto: foto,
                    notelp: notelp,
                    email: email,
                    tgl_lahir: tgl_lahir,
                    tempat_lahir: tempat_lahir,
                    tgl_mulaitugas: tgl_mulaitugas,
                    alamat: alamat,
                };
            }
        });
        let index = newitems.findIndex((item) => item.id === editId);
        newitems[index] = submittedData;
        setModal({ edit: false });
    };

    return (
        <React.Fragment>
            <Head title="Pegawai"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Pegawai
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
                                                <span>Template Import PTK</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="download-cloud"></Icon>
                                                <span>Download Data PTK</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="upload-cloud"></Icon>
                                                <span>Import Data</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="user"></Icon>
                                                <span>Status PTK</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Link to="/pegawai/add-pegawai">
                                                <Button color="primary">
                                                    <Icon name="plus">
                                                    </Icon>
                                                    {/* <div>Tambah PTK </div> */}
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
                        <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title">Data Pegawai</h5>
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
                                                    <Icon name="setting"></Icon>
                                                </DropdownToggle>
                                                <DropdownMenu end className="dropdown-menu-xs">
                                                    <ul className="link-check">
                                                        <li>
                                                            <span>Show</span>
                                                        </li>
                                                        <li className={itemPerPage === 10 ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setItemPerPage(10);
                                                                }}
                                                            >
                                                                10
                                                            </DropdownItem>
                                                        </li>
                                                        <li className={itemPerPage === 15 ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setItemPerPage(15);
                                                                }}
                                                            >
                                                                15
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                    <ul className="link-check">
                                                        <li>
                                                            <span>Order</span>
                                                        </li>
                                                        <li className={sort === "dsc" ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setSortState("dsc");
                                                                    sortFunc("dsc");
                                                                }}
                                                            >
                                                                DESC
                                                            </DropdownItem>
                                                        </li>
                                                        <li className={sort === "asc" ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setSortState("asc");
                                                                    sortFunc("asc");
                                                                }}
                                                            >
                                                                ASC
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                </DropdownMenu>
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
                                    <span>NIP</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span>Nama Lengkap</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Email</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Jenis Kelamin</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Status </span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>No Telp</span>
                                </DataTableRow>
                                <DataTableRow className="nk-tb-col-tools">Aksi</DataTableRow>
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
                                                    <span>{item.nip}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nm}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.email}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.jk}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.status}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.notelp}</span>
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



                                                    <li className="" onClick={() => onEditClick(item.id)}>
                                                        <TooltipComponent
                                                            tag="a"
                                                            containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                                            id={item.ref + "edit"}
                                                            icon="edit"
                                                            direction="top"
                                                            text="edit"
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
                {/* <AddModal modal={modal.add} formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterStatus={filterStatus} filterJk={filterJk} /> */}
                <EditModal modal={modal.edit} formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit} filterStatus={filterStatus} />
            </Content>
        </React.Fragment>
    )
}

export default Pegawai
