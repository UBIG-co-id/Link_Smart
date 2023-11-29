import React, { useState, useContext } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { UserContext } from '../../component/user/UserContext'
import AddModal from '../../component/modal/pegawai/AddModal'
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
const Pegawai = () => {
    const [data, setData] = useState(transactionData);
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
    // const { contextData } = useContext(UserContext);
    // const [data, setData] = contextData;
    const [editId, setEditedId] = useState();
    const [formData, setFormData] = useState({
        nip: "",
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
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        balance: 0,
        phone: "",
        status: "",
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

    const closeModal = () => {
        setModal({ add: false })
        resetForm();
    };
    const closeEditModal = () => {
        setModal({ edit: false })
        resetForm();
    };

    const onFormSubmit = (submitData) => {
        const { nip, nuptk, nama, notelp, email, tlahir, tgllahir, tglmt, nik, alamat } = submitData;
        let submittedData = {
            id: data.length + 1,
            nip: nip,
            nuptk: nuptk,
            fotoData: null,
            nama: nama,
            jk: "Laki-Laki",
            status: "Active",
            notelp: notelp,
            email: email,
            tlahir: tlahir,
            tgllahir: tgllahir,
            tglmt: tglmt,
            nik: nik,
            alamat: alamat,

        };
        setData([submittedData, ...data]);
        resetForm();
        setModal({ edit: false }, { add: false });
    };
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
        const { name, email, phone } = submitData;
        let submittedData;
        let newitems = data;
        newitems.forEach((item) => {
            if (item.id === editId) {
                submittedData = {
                    id: item.id,
                    avatarBg: item.avatarBg,
                    name: name,
                    image: item.image,
                    role: item.role,
                    email: email,
                    balance: editFormData.balance,
                    phone: phone,
                    emailStatus: item.emailStatus,
                    kycStatus: item.kycStatus,
                    lastLogin: item.lastLogin,
                    status: editFormData.status,
                    country: item.country,
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
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Tambah PTK </div>
                                            </Button>
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
                                                    <span>{item.id}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nip}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nama}</span>
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

                                                    {/* <li className="" onClick={() => setModal({ add: true })}>
                                                        <TooltipComponent
                                                            tag="a"
                                                            containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                                            id={item.ref + "add"}
                                                            icon="plus"
                                                            direction="top"
                                                            text="add"
                                                        />
                                                    </li> */}
                                                    <li containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" onClick={() => onEditClick(item.id)}>
                                                        <DropdownItem
                                                            tag="a"
                                                            href="#edit"
                                                            direction="top"
                                                            ClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                            }}
                                                        >
                                                            <Icon name="edit"></Icon>

                                                        </DropdownItem>
                                                    </li>
                                                    <li className="" onClick={() => onEditClick(item.id)}>
                                                        <TooltipComponent
                                                            tag="a"
                                                            containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                                            id={item.ref + "approve"}
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
                                                {/* <ul className="nk-tb-actions gx-1">
                          <li
                            className="nk-tb-action-hidden"
                            onClick={() => {
                              loadDetail(item.id);
                              toggleModalDetail();
                            }}
                          >
                            <TooltipComponent
                              tag="a"
                              containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                              id={item.ref + "details"}
                              icon="eye"
                              direction="top"
                              text="Details"
                            />
                          </li>
                          {item.status !== "Completed" && item.status !== "Rejected" && (
                            <React.Fragment>
                              <li className="nk-tb-action-hidden" onClick={() => onApproveClick(item.id)}>
                                <TooltipComponent
                                  tag="a"
                                  containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                  id={item.ref + "approve"}
                                  icon="done"
                                  direction="top"
                                  text="approve"
                                />
                              </li>
                              <li className="nk-tb-action-hidden" onClick={() => onRejectClick(item.id)}>
                                <TooltipComponent
                                  tag="a"
                                  containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip"
                                  id={item.ref + "reject"}
                                  icon="cross-round"
                                  direction="top"
                                  text="Reject"
                                />
                              </li>
                            </React.Fragment>
                          )}
                          <li>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  tag="a"
                                  className="dropdown-toggle bg-white btn btn-sm btn-outline-light btn-icon"
                                >
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    {item.status !== "Completed" && item.status !== "Rejected" && (
                                      <React.Fragment>
                                        <li onClick={() => onApproveClick(item.id)}>
                                          <DropdownItem
                                            tag="a"
                                            href="#approve"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="done"></Icon>
                                            <span>Approve</span>
                                          </DropdownItem>
                                        </li>
                                        <li onClick={() => onRejectClick(item.id)}>
                                          <DropdownItem
                                            tag="a"
                                            href="#reject"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="cross-round"></Icon>
                                            <span>Reject</span>
                                          </DropdownItem>
                                        </li>
                                      </React.Fragment>
                                    )}
                                    <li
                                      onClick={() => {
                                        loadDetail(item.id);
                                        toggleModalDetail();
                                      }}
                                    >
                                      <DropdownItem
                                        tag="a"
                                        href="#details"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="eye"></Icon>
                                        <span>Details</span>
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                        </ul> */}
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
                    </Card> */}
                </Block>
                <AddModal modal={modal.add} formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterStatus={filterStatus} filterJk={filterJk} />
            </Content>
        </React.Fragment>
    )
}

export default Pegawai
