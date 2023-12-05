import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { bulkActionOptions } from '../../utils/Utils'
import { UserContext } from '../../component/user/UserContext'
import { userData, filterRole, filterStatus, filterKls,filterWk } from '../../component/user/UserData'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import EditModal from '../../component/modal/ruangKelas/EditModal'
import { orderData } from '../../component/user/UserData'
import AddModal from '../../component/modal/ruangKelas/AddModal'
const RuangKelas = () => {
  
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [sm, updateSm] = useState(false);
  const toggle = () => setonSearch(!onSearch);
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  const [data, setData] = useState(orderData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [detail, setDetail] = useState({});
  const [modalDetail, setModalDetail] = useState(false);
  const toggleModalDetail = () => setModalDetail(!modalDetail);
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setDetail(data[index]);
  };
  const [modal, setModal] = useState({
    edit: false,
    add: false,
});


  // function to change to reject property for an item
  const onApproveClick = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Completed";
    setData([...newData]);
  };

  // function to change to reject property for an item
  const onRejectClick = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Rejected";
    setData([...newData]);
  };
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


  const [formData, setFormData] = useState({
    tgl: "",
    ptk: "",
    jm: "",
    tahun: "",
    alasan: "",
    file: null,
});
const closeModal = () => {
  setModal({ add: false })
  resetForm();
};
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

  return (
    <React.Fragment>
      <Head title="Kelas"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Kelas
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
                    <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                        <Icon name="plus"></Icon>
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
                                    <h5 className="title">Data Kelas</h5>
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
                                    <span>Kelas</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span>Wali Kelas</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Jumlah Siswa</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>SPP</span>
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
                                                    <span>{item.kls}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.wk}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.js} Siswa</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>Rp {item.spp}</span>
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
                   
                </Block>
        {/* <AddModal modal={modal.add} formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterStatus={filterStatus} filterKls={filterKls} filterWk={filterWk} /> */}
      </Content>
    </React.Fragment>
  )
}

export default RuangKelas
