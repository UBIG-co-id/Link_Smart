import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { bulkActionOptions } from '../../utils/Utils'
import { UserContext } from '../../component/user/UserContext'
import { filterJp, filterP, filterPeng, filterAgm, filterJk } from '../../component/user/UserData'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import EditModal from '../../component/modal/siswa/EditModal'
import { siswaData } from '../../component/user/UserData'
import AddModal from '../../component/modal/siswa/AddModal'

const Siswa = () => {
    const [sm, updateSm] = useState(false);
    const [data, setData] = useState(siswaData);

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
    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
    return (
        <React.Fragment>
            <Head title="Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Siswa
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
                                                <span>Template Import Siswa</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="upload-cloud"></Icon>
                                                <span>Import Data</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus"></Icon>
                                                <div>Tambah Siswa</div>
                                            </Button>
                                        </li>
                                        {/* <li className="nk-block-tools-opt">
                                            <Button color="primary" className="btn-dim btn-white" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Tambah Siswa</div>
                                            </Button>
                                        </li> */}
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="user"></Icon>
                                                <span>Status Siswa</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button color="primary" outline className="btn-dim btn-white">
                                                <Icon name="download-cloud"></Icon>
                                                <span>Download Data Siswa</span>
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
                                            id="uid"
                                        />
                                        <label className="custom-control-label" htmlFor="uid"></label>
                                    </div>
                                </DataTableRow>
                                <DataTableRow>
                                    <span className="sub-text">No</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">NIS</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">User Id</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Nama Lengap Siswa</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Usia</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Kelas</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Jenis Kelamin</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Nama Orang Tua</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span className="sub-text">Aksi</span>
                                </DataTableRow>
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return (
                                        <DataTableItem key={item.id}>
                                            <DataTableRow className="nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        defaultChecked={item.checked}
                                                        id={item.id + "uid1"}
                                                        key={Math.random()}
                                                        onChange={(e) => onSelectChange(e, item.checkeds)}
                                                    />
                                                    <label className="custom-control-label" htmlFor={item.checkeds + "uid1"}></label>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.id}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.nis}</span>
                                            </DataTableRow>
                                            <DataTableRow size="sm">
                                                <span>{item.userId}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.nls}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.usia} Tahun</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.kls}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.jk}</span>
                                            </DataTableRow>
                                            <DataTableRow size="md">
                                                <span>{item.namor}</span>
                                            </DataTableRow>
                                            {/* <DataTableRow>
                                                <span
                                                    className={`tb-status text-${item.status === "Active" ? "success" : item.status === "Pending" ? "warning" : "danger"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </DataTableRow> */}

                                            <DataTableRow >
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
                    </DataTable>
                </Block>
                <AddModal modal={modal.add} closeModal={closeModal} filterJk={filterJk} filterAgm={filterAgm} filterJp={filterJp} filterP={filterP} filterPeng={filterPeng} />
                {/* <EditModal modal={modal.edit}/> */}
            </Content>
        </React.Fragment>
    )
}

export default Siswa
