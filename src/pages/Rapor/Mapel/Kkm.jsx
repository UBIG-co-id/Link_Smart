import React, { useState, useContext, useEffect } from 'react'
import Content from '../../../layout/Content/Content'
import Head from '../../../layout/Head'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import AddModal from '../../../component/modal/kkm/AddModal'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../../component/table/DataTable'
import { kkmData, filterStatus, filterJk, filterMpl } from '../../../component/user/UserData'
import { Link } from 'react-router-dom'
const Kkm = () => {
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
            const apiUrl = `https://linksmart-1-t2560421.deta.app/kkm-cari?${queryString}`;
    
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

    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const toggle = () => setonSearch(!onSearch);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setNumUrutan((pageNumber - 1) * itemPerPage + 1);
    };
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    
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
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };
    const [editId, setEditedId] = useState();
    const [editFormData, setFormData] = useState({
        mapel: "",
        kelas: "",
        kkm: "",
    });
    const resetForm = () => {
        setFormData({
            mapel: "",
            kelas: "",
            kkm: "",

        });
    };
    const closeModal = () => {
        setModal({ add: false })
        resetForm();
    };
    const closeEditModal = () => {
        setModal({ edit: false })
        resetForm();
    }

    const onFormSubmit = (submitData) => {
        const { mapel, kelas, kkm } = submitData;
        let submittedData = {
            id: data.length + 1,
            mapel: mapel,
            kelas: kelas,
            kkm: kkm,
        };
        setData([submitData, ...data]);
        resetForm();
        setModal({ edit: false , add: false });
    };

    // const onEditSubmit = (submitData) => {
    //     const { mapel, kelas, nilai_kkm} = submitData;
    //     let submittedData;
    //     let newitems = data;
    //     newitems.forEach((item) => {
    //         if (item.id === editId) {
    //             submittedData = {
    //                 id: item.id,
    //                 avatarBg: item.avatarBg,
    //                 image: item.image,
    //                 role: item.role,
    //                 balance: item.balance,
    //                 kycStatus: item.kycStatus,
    //                 lastLogin: item.lastLogin,
    //                 status: item.status,
    //                 country: item.country,
    //                 mapel: mapel, // Tambahkan properti mapel, kelas, dan kkm
    //                 kelas: kelas,
    //                 nilai_kkm: nilai_kkm,
    //             };
    //         }
    //     });
    //     let index = newitems.findIndex((item) => item.id === editId);
    //     newitems[index] = submittedData;
    //     setModal({ edit: false });
    // };
    

    return (
        <React.Fragment>
            <Head title="KKM"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                KKM - Mata Pelajaran
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
                                        <li >
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Mata Pelajaran</div>
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
                        <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title">KKM </h5>
                                </div>
                                <div className="card-tools me-n1">
                                    
                                    <ul>
                                        <li className="nk-block-tools-opt mb-2">
                                            <Link to ='/rapor/add-kkm'>
                                            <Button color="primary" >
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Set Nilai KKM</div>
                                            </Button>
                                            </Link>
                                        </li>
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
                                        
                                    </ul>
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
                                            onChange={() => onFilterChange()}
                                        />
                                        <Button className="search-submit btn-icon">
                                            <Icon name="search"></Icon>
                                        </Button>
                                    </div>
                                    
                                </div>
                                    <div className="form-inline flex-nowrap gx-3">

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
                                    <span className="sub-text">Mata Pelajaran</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Kelas</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">KKM</span>
                                </DataTableRow>
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return (
                                        <DataTableItem key={item.id}>
                                            <DataTableRow size="md">
                                                <span>{item.nomor_urutan}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.mapel}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.nm}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.kkm}</span>
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
                {/* <AddModal modal={modal.add} FormData={FormData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterMpl={filterMpl} /> */}
            </Content>
        </React.Fragment>
    )
}

export default Kkm
