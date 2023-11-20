import React, { useState, useContext,useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { bulkActionOptions } from '../../utils/Utils'
// import { presensiSiswa } from '../../component/user/UserData'
import { UserContext } from '../../component/user/UserContext'
import { presensiSiswa, filterStatus } from '../../component/user/UserData'
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from 'reactstrap'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
// import EditModal from '../../component/user/EditModal'



const Siswa = () => {
    const [sm, updateSm] = useState(false);
    const [actionText, setActionText] = useState("");
    // const { contextData } = useContext(UserContext);
    const [tablesm, updateTableSm] = useState(false);
    const [data, setData] = useState(presensiSiswa);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [itemPerPage, setItemPerPage] = useState(10);
    const  [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });

    const onActionText = (e) => {
        setActionText(e.value);
    };
    
    const toggle = () => setonSearch(!onSearch);
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

    useEffect(() => {
        if (onSearchText !== "") {
            const filteredObject = presensiSiswa.filter((item) => {
                return (
                    item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
                    item.email.toLowerCase().includes(onSearchText.toLowerCase())
                );
            });
            setData([...filteredObject]);
        } else {
            setData([...presensiSiswa]);
        }
    }, [onSearchText, setData]);

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const selectorCheck = (e) => {
        let newData;
        newData = data.map((item) => {
            item.checked = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
    };

    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].checked = e.currentTarget.checked;
        setData([...newData]);
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

    const closeEditModal = () => {
        setModal({ edit: false })
        resetForm();
    };

    const onEditSubmit = (submitData) => {
        const { nameptk, } = submitData;
        let submittedData;
        let newitems = data;
        newitems.forEach((item) => {
          if (item.id === editId) {
            submittedData = {
              id: item.id,
              nis: item.nis,
              nlp: item.nlp,
              kelas: item.kelas,
              tanggal: item.tgl,
              in: item.in,
              status: editFormData.status,
              out: item.out,
              status: editFormData.status,
              keterangan: item.keterangan,
            };
          }
        });
        let index = newitems.findIndex((item) => item.id === editId);
        newitems[index] = submittedData;
        setModal({ edit: false });
      };
    const [editId, setEditedId] = useState();
    const [editFormData, setEditFormData] = useState({
        id: "",
        nis: "",
        nlp: "",
        kelas: "",
        tanggal: "",
        in: "",
        status: "",
        out: "",
        status: "",
        keterangan: "",
    });

    const [formData, setFormData] = useState({
        nip: "",
        namaptk: "",
        status: "Active",
        jnmutasi: "",
    });

    const resetForm = () => {
        setFormData({
            nip: "",
            namaptk: "",
            status: "Active",
            jnmutasi: "",
        });
    };

    

  return (
    <React.Fragment>
        <Head title="Presensi Siswa"></Head>
        <Content>
        <BlockHead size="sm">
            <BlockBetween>
                <BlockHeadContent>
                    <BlockTitle page tag="h3">
                        Presensi Siswa
                    </BlockTitle>
                    <BlockDes className="text-soft">
                        <p>Welcome to Link Smart</p>
                    </BlockDes>
                </BlockHeadContent>
                <div className="toggle-wrap nk-block-tools-toggle">
                    <Button
                        className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                        onClick={() => updateSm(!sm)}
                    >
                        <Icon name="more-v"></Icon>
                    </Button>
                    <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                        <ul className="nk-block-tools g-3">
                            <li>
                                <Button color="primary" outline className="btn-dim btn-white">
                                    <Icon name="download-cloud"></Icon>
                                    <span>Export Kerangka Presensi</span>
                                </Button>
                            </li>
                            <li>
                                <Button color="primary" outline className="btn-dim btn-white">
                                        <Icon name="upload-cloud"></Icon>
                                        <span>Import Data</span>
                                </Button>
                            </li>
                            <li>
                                <Button color="primary" onClick={() => setModal({add: true})}>
                                        <Icon name="plus"></Icon>
                                        <span>Tambah Presensi</span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </BlockBetween>
        </BlockHead>

        <Block>
            <DataTable className="card-strectch">
                <div className="card-inner position-relative card-tools-toggle">
                    <div className="card-title-group">
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
                                    <div className="toggle-wrap">
                                        <Button
                                            className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                                            onClick={() => updateTableSm(true)}
                                        >
                                            <Icon name="menu-right"></Icon>
                                        </Button>
                                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                                            <ul className="btn-toolbar gx-1">
                                                <li className="toggle-close">
                                                    <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                                        <Icon name="arrow-lefft"></Icon>
                                                    </Button>
                                                </li>
                                                <li>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                                            <div className="dot dot-primary"></div>
                                                            <Icon name="filter-alt"></Icon>
                                                        </DropdownToggle>
                                                        <DropdownMenu
                                                            end
                                                            className="filter-wg deopdown-menu-x1"
                                                            style={{overflow: "visible"}}
                                                        >
                                                            <div className="dropdown-head">
                                                                <span className="sub-title dropdown-title">Filter User</span>
                                                            </div>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
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
                                    placeholder="Cari berdasarkan Nama"
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
                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    onChange={(e) => selectorCheck(e)}
                                    id="id"
                                />
                                <label className="custom=control-label" htmlFor="uid"></label>
                            </div>
                        </DataTableRow>
                        <DataTableRow>
                            <span className="sub-text">ID</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">NIS</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">Nama Lengkap</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">Kelas</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">Tanggal</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">In</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">Status</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">Out</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">Status</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="sub-text">Keterangan</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                            <span className="sub-text">Aksi</span>
                        </DataTableRow>
                    </DataTableHead>
                    {currentItems.leght > 0
                        ? currentItems.map((item) => {
                            return(
                                <DataTableItem key={item.id}>
                                    <DataTableRow className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            defaultChecked={item.checked}
                                            id={item.id + "uid1"}
                                            key={Math.random()}
                                            onChange={(e) => onSelectChange(e, item.checkeds)}
                                        />
                                        <label className="custom-control-label" htmlFor={item.checkeds + "uid1"}></label>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.id}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.nis}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.nlp}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.kelas}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.tanggal}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.in}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span
                                            className={`tb-status text-${item.status === "Active" ? "success" : item.status === "Pending" ? "warning" : "danger"
                                                        }`}
                                        >
                                            {item.status}
                                        </span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.out}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                    <span
                                        className={`tb-status text-${item.status === "Active" ? "success" : item.status === "Pending" ? "warning" : "danger"
                                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.keterangan}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <ul>
                                            <li>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                                        <Icon name="more-h"></Icon>
                                                    </DropdownToggle>
                                                    <DropdownMenu end>
                                                        <ul className="link-list-opt no-bdr">
                                                        <li onClick={() => onEditClick(item.id)}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#edit"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                }}
                                                        >
                                                                <Icon name="edit"></Icon>
                                                                <span>Edit</span>
                                                            </DropdownItem>
                                                        </li>

                                                        </ul>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </li>
                                        </ul>
                                    </DataTableRow>
                                </DataTableItem>
                            )
                        }) : null}
                </DataTableBody>
                <div className="card-inner">
                    {currentItems.leght > 0 ? (
                        <PaginationComponent
                            itemPerPage={itemPerPage}
                            totalItems={data.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    ) : (
                        <div className="text-center">
                            <span className="text-silrnt">data tidak ditemukan</span>
                        </div>
                    )}
                </div>
            </DataTable>
        </Block>
        {/* <EditModal modal={modal.edit} formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit} filterStatus={filterStatus} />         */}
        </Content>
    </React.Fragment>
  )
}

export default Siswa
