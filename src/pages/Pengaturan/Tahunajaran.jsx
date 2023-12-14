import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { tahunAjaran } from '../../component/user/UserData'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'


const Tahunajaran = () => {
    const [sm, updateSm] = useState(false);
    const [data, setData] = useState(tahunAjaran);
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
            const apiUrl = `https://linksmart-1-t2560421.deta.app/thnajaran-cari?${queryString}`;
    
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
    const [onSearchText, setSearchText] = useState("");
    const toggle = () => setonSearch(!onSearch);
    const [onSearch, setonSearch] = useState(false);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setNumUrutan((pageNumber - 1) * itemPerPage + 1);
    };

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
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
        tajar: "",
        pergan: "",
        pergen: "",
        semester: "",
        status: "",
    });
    const [editFormData, setEditFormData] = useState({
        tajar: "",
        pergan: "",
        pergen: "",
        semester: "",
        status: "",
    });
    const resetForm = () => {
        setFormData({
            tajar: "",
            pergan: "",
            pergen: "",
            semester: "",
            status: "",

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
                    tajar: item.tajar,
                    pergan: item.pergan,
                    pergen: item.pergen,
                    semester: item.semester,
                    status: item.status,
                });
                setModal({ edit: true }, { add: false });
                setEditedId(id);
            }
        });
    };
    const onEditSubmit = (submitData) => {
        const { tajar, pergan, pergen, semester, status } = submitData;
        let submittedData;
        let newitems = data;
        newitems.forEach((item) => {
            if (item.id === editId) {
                submittedData = {
                    tajar: tajar,
                    pergan: pergan,
                    pergen: pergen,
                    semester: semester,
                    status: status,
                };
            }
        });
        let index = newitems.findIndex((item) => item.id === editId);
        newitems[index] = submittedData;
        setModal({ edit: false });
    };
    return (
        <React.Fragment>
            <Head title="Pengaturan Tahun Ajaran"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Tahun Ajaran
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
                                        </li> */}
                                        <li className="nk-block-tools-opt">
                                            <Button color="primary " onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Tambah Tahun Ajaran</div>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block size="lg">
                    <DataTable className="card-stretch" >
                        <DataTableBody bodyclass="nk-tb-tnx">
                            <DataTableHead>
                                <DataTableRow>
                                    <span>No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Tahun Ajaran</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Periode Gajil</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Periode Genap</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Semester</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Status</span>
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
                                                    <span>{item.thnAjrn}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.startGnjl}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.startGnap}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.periode}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.isAktif}</span>
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

export default Tahunajaran
