import React, { useState, useContext, useEffect } from 'react'
import Content from '../../../layout/Content/Content'
import Head from '../../../layout/Head'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import AddModal from '../../../component/modal/mapel/AddModal'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../../component/table/DataTable'
import { mapel } from '../../../component/user/UserData'
import { Link } from 'react-router-dom'
const Mapel = () => {
    const [data, setData] = useState(mapel);
    const [sm, updateSm] = useState(false);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const toggle = () => setonSearch(!onSearch);
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
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

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };
    const [editId, setEditedId] = useState();
    const [FormData, setFormData] = useState({
        mapel: "",
        singkat: "",
    });
    // const [editFormData, setEditFormData] = useState({
    //     mapel: "",
    //     singkat: "",
    // });
    const resetForm = () => {
        setFormData({
        mapel: "",
        singkat: "",  
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
        console.log(submitData);
        const { mapel, singkat} = submitData;
        let submittedData = {
            id: data.length + 1,
            mapel: mapel,
            singkat: singkat,
        };
        setData([submittedData, ...data]);
        resetForm();
        setModal({ edit: false , add: false });
    };

    // const onEditSubmit = (submitData) => {
    //     const { mapel, singkat} = submitData;
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
    //                 status: editFormData.status,
    //                 country: item.country,
    //                 mapel: item.mapel, // Tambahkan properti mapel, kelas, dan kkm
    //                 singkat: item.singkat,
    //             };
    //         }
    //     });
    //     let index = newitems.findIndex((item) => item.id === editId);
    //     newitems[index] = submittedData;
    //     setModal({ edit: false });
    // };

    return (
        <React.Fragment>
            <Head title="Mapel"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Mata Pelajaran
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
                                                <span>Expor</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="reports"></Icon>
                                                <span>Reports</span>
                                            </Button>
                                        </li>
                                        
                                        <li>
                                        <Link to ='/rapor/add-mapel'>
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Mata Pelajaran</div>
                                            </Button>
                                        </Link>
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
                                    <h5 className="title"></h5>
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
                        <DataTableBody compact>
                            <DataTableHead>

                                <DataTableRow>
                                    <span className="sub-text">No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Mata Pelajaran</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Singkatan</span>
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
                                                <span>{item.mapel}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.singkat}</span>
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
                {/* <AddModal modal={modal.add} FormData={FormData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit}/> */}
            </Content>
        </React.Fragment>
    )
}

export default Mapel