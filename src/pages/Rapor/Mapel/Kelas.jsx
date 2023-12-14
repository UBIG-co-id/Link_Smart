import React, { useState, useContext } from 'react'
import Content from '../../../layout/Content/Content'
import Head from '../../../layout/Head'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
// import { UserContext } from '../../component/user/UserContext'
import AddModal from '../../../component/modal/klsmapel/AddModal'
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
} from '../../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../../component/table/DataTable'
import { mapelKelas } from '../../../component/user/UserData'
import { Link } from 'react-router-dom'
const Kelas = () => {
    const [data, setData] = useState(mapelKelas);
    const [sm, updateSm] = useState(false);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const toggle = () => setonSearch(!onSearch);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    const [editId, setEditedId] = useState();
    const [formData, setFormData] = useState({
        kls: "",
        mapel: "",
    });
    const [editFormData, setEditFormData] = useState({
        kls: "",
        mapel: "",
    });
    const resetForm = () => {
        setFormData({
            kls: "",
            mapel: "",
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

    const onFormSubmit = (submitData) => {
        const { kls, mapel } = submitData;
        let submittedData = {
            id: data.length + 1,
            kls: kls,
            mapel: mapel,
        };
        setData([submittedData, ...data]);
        resetForm();
        setModal({ edit: false }, { add: false });
    };

    const onEditSubmit = (submitData) => {
        const { kls, mapel } = submitData;
        let submittedData;
        let newitems = data;
        newitems.forEach((item) => {
            if (item.id === editId) {
                submittedData = {
                    id: item.id,
                    avatarBg: item.avatarBg,
                    balance: editFormData.balance,
                    kycStatus: item.kycStatus,
                    lastLogin: item.lastLogin,
                    status: editFormData.status,
                    country: item.country,
                    kls: item.kls,
                    mapel: item.mapel,
                };
            }
        });
        let index = newitems.findIndex((item) => item.id === editId);
        newitems[index] = submittedData;
        setModal({ edit: false });
    };
    return (
        <React.Fragment>
            <Head title="Kelas"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Kelas-Mapel
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
                                                <span>Template Mata Pelajaran</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="upload-cloud"></Icon>
                                                <span>Import Mata Pelajaran</span>
                                            </Button>
                                        </li>
                                        <li >
                                            <Link to='/rapor/add-mapel-kelas'>
                                                <Button color="primary" onClick={() => setModal({ add: true })}>
                                                    <Icon name="plus">
                                                    </Icon>
                                                    <div>Tambah Mata Pelajaran</div>
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
                                    <h5 className="title"></h5>
                                <div className="card-tools me-n1">
                                    <ul className="nk-block-tools g-3">
                                        <li className="nk-block-tools-opt mb-2">
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="download-cloud"></Icon>
                                                <span>Template Mata Pelajaran-Kelas</span>
                                            </Button>
                                        </li>
                                        <li className="nk-block-tools-opt mb-2">
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="upload-cloud"></Icon>
                                                <span>Import Mata Pelajaran-Kelas</span>
                                            </Button>
                                        </li>
                                        <li className="nk-block-tools-opt mb-2">
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Mapel Tahun Sebelumnya</div>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                                </div>
                                    <div className='mr-1'>
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
                        <DataTableBody compact>
                            <DataTableHead>

                                <DataTableRow>
                                    <span className="sub-text">No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Kelas</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Mata Pelajaran</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Detail</span>
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
                                                <span>{item.kls}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.mapel}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.detail}</span>
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
                <AddModal modal={modal.add} FormData={FormData} setFormData={setFormData} closeModal={closeModal} />
            </Content>
        </React.Fragment>
    )
}
export default Kelas;