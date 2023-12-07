import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Row, Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { bulkActionOptions } from '../../utils/Utils'
import { UserContext } from '../../component/user/UserContext'
import { userData, filterPtk, filterStatus, filterThn, filterBln } from '../../component/user/UserData'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import EditModal from '../../component/modal/mutasiPTK/EditModal'
import AddModal from '../../component/modal/mutasiPTK/AddModal'
import { Link } from 'react-router-dom'

const Pegawai = () => {
    const [data, setData] = useState(userData);
    const [sm, updateSm] = useState(false);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const toggle = () => setonSearch(!onSearch);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [selectedDate, setSelectedDate] = useState(null);
    const [tablesm, updateTableSm] = useState(false);
    const [actionText, setActionText] = useState("");
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
    const onRejectClick = (id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = "Rejected";
        setData([...newData]);
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

    const onFormSubmit = (submitData) => {
        const { tgl, nama, jm, tahun, alasan } = submitData;
        let submittedData = {
            id: data.length + 1,
            tgl: tgl,
            ptk: nama,
            jm: jm,
            tahun: tahun,
            alasan: alasan,
            file: null,
        };
        setData([submittedData, ...data]);
        resetForm();
        setModal({ edit: false }, { add: false });
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

    // const toggle = () => setonSearch(!onSearch);
    const onActionText = (e) => {
        setActionText(e.value);
    };
    useEffect(() => {
        if (onSearchText !== "") {
            const filteredObject = userData.filter((item) => {
                return (
                    item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
                    item.email.toLowerCase().includes(onSearchText.toLowerCase())
                );
            });
            setData([...filteredObject]);
        } else {
            setData([...userData]);
        }
    }, [onSearchText, setData]);
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].checked = e.currentTarget.checked;
        setData([...newData]);
    };

    const selectorCheck = (e) => {
        let newData;
        newData = data.map((item) => {
            item.checked = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
    };
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    const [formData, setFormData] = useState({
        tgl: "",
        ptk: "",
        jm: "",
        tahun: "",
        alasan: "",
        file: null,
    });
    const resetForm = () => {
        setFormData({
            nip: "",
            namaptk: "",
            status: "Active",
            jnmutasi: "",
        });
    };
    const closeModal = () => {
        setModal({ add: false })
        resetForm();
    };

    const closeEditModal = () => {
        setModal({ edit: false })
        resetForm();
    };
    // EDIT DATA
    const [editId, setEditedId] = useState();
    const [editFormData, setEditFormData] = useState({
        nip: "",
        namaptk: "",
        status: "",
        jnmutasi: "",
    });
    const onEditClick = (id) => {
        data.forEach((item) => {
            if (item.id === id) {
                setEditFormData({
                    nip: item.nip,
                    namaptk: item.namaptk,
                    status: item.status,
                    jnmutasi: item.jnmutasi,

                });
                setModal({ edit: true }, { add: false });
                setEditedId(id);
            }
        });
    };

    const onEditSubmit = (submitData) => {
        const { nameptk, } = submitData;
        let submittedData;
        let newitems = data;
        newitems.forEach((item) => {
            if (item.id === editId) {
                submittedData = {
                    id: item.id,
                    tgl: item.tgl,
                    nip: item.nip,
                    nameptk: nameptk,
                    status: editFormData.status,
                    jnmutasi: item.jnmutasi,

                };
            }
        });
        let index = newitems.findIndex((item) => item.id === editId);
        newitems[index] = submittedData;
        setModal({ edit: false });
    };
    // END EDIT DATA
    // Get current list, pagination
    

    return (
        <React.Fragment>
            <Head title="Mutasi PTK"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Mutasi PTK
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
                                        <Link to="/pegawai/add-mutasi">
                                            <Button color="primary" className="btn-icon" >
                                                <Icon name="plus"></Icon>
                                        </li> */}
                                        <li>
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Tambah Mutasi </div>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <DataTable className="card-stretch">
                        <div className="card-inner position-relative card-tools-toggle">
                            <div className="card-title-group">
                                <div className="card-tools">
                                    <div className="form-inline flex-nowrap gx-3">
                                        {/* <div className="form-wrap">
                                            <RSelect
                                                options={bulkActionOptions}
                                                className="w-130px"
                                                placeholder="Bulk Action"
                                                onChange={(e) => onActionText(e)}
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
                                            <Row>
                                                <div className="from-wrap w-200px">
                                                    <RSelect
                                                        options={filterThn}
                                                        placeholder="Tahun Ajaran Aktif"
                                                        onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                                    />
                                                </div>
                                                <div className="from-wrap w-200px">
                                                    <RSelect
                                                        options={filterBln}
                                                        placeholder="Semua Bulan"
                                                        onChange={(e) => setFormData({ ...formData, kls: e.value })}
                                                    />
                                                </div>
                                            </Row>
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
                            </div>
                            <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                                <div className="card-body">
                                    <div className="search-content">
                                        <Button
                                            className="search-back btn-icon toggle-search active"
                                            onClick={() => {
                                                setSearchText("");
                                                toggle();
                                            }}
                                        >
                                            <Icon name="arrow-left"></Icon>
                                        </Button>
                                        <input
                                            type="text"
                                            className="border-transparent form-focus-none form-control"
                                            placeholder="Search by user or email"
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
                                <DataTableRow className="nk-tb-col-check">
                                    {/* <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            onChange={(e) => selectorCheck(e)}
                                            id="uid"
                                        />
                                        <label className="custom-control-label" htmlFor="uid"></label>
                                    </div> */}
                                </DataTableRow>
                                <DataTableRow>
                                    <span className="sub-text">No</span>
                                </DataTableRow>
                                <DataTableRow size="md">
                                    <span className="sub-text">Tanggal</span>
                                </DataTableRow>
                                <DataTableRow size="sm">
                                    <span className="sub-text">NIP</span>
                                </DataTableRow>
                                <DataTableRow size="md">
                                    <span className="sub-text">Nama PTK</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span className="sub-text">Status PTK</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span className="sub-text">Jenis Mutasi</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span className="sub-text">Aksi</span>
                                </DataTableRow>
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return (
                                        <DataTableItem key={item.id}>
                                            <DataTableRow className="nk-tb-col-check">
                                                {/* <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        defaultChecked={item.checked}
                                                        id={item.id + "uid1"}
                                                        key={Math.random()}
                                                        onChange={(e) => onSelectChange(e, item.checkeds)}
                                                    />
                                                    <label className="custom-control-label" htmlFor={item.checkeds + "uid1"}></label>
                                                </div> */}
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.id}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.tgl}</span>
                                            </DataTableRow>
                                            <DataTableRow size="sm">
                                                <span>{item.nip}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.namaptk}</span>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <span
                                                    className={`tb-status text-${item.status === "Active" ? "success" : item.status === "Pending" ? "warning" : "danger"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </DataTableRow>
                                            <DataTableRow size="lg">
                                                <span>{item.jnmutasi}</span>
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
                {/* <Block size="lg"> */}
                {/* <BlockHead>
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Transaction List - With Action</BlockTitle>
                            <p>
                                The following table can be use for <strong className="text-primary">invoice, payment history</strong>{" "}
                                related transaction.
                            </p>
                        </BlockHeadContent>
                    </BlockHead> */}
                {/* <Card className="card-bordered card-preview">
                        <SpecialTable action={true} />
                    </Card>
                </Block> */}
                {/* <AddModal modal={modal.add} formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterStatus={filterStatus} filterPtk={filterPtk} filterThn={filterThn}/> */}
                <EditModal modal={modal.edit} formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit} filterStatus={filterStatus} />
            </Content>
        </React.Fragment>
    )
}

export default Pegawai
