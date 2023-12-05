import React, { useState, useContext, useEffect } from 'react'
import Content from '../../layout/Content/Content'
import Head from '../../layout/Head'
import { Col, Block, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, BlockDes, Button, Icon, SpecialTable, DataTable, RSelect, TooltipComponent, PaginationComponent } from '../../component/Component'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { rekapPresensiSiswa, filterThn, filterBln, filterKls  } from '../../component/user/UserData'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

const RekapPresensiSiswa = () => {
  const [sm, updateSm] = useState(false);
    const [data, setData] = useState(rekapPresensiSiswa);
    const toggle = () => setonSearch(!onSearch);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [actionText, setActionText] = useState("");

    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const onActionText = (e) => {
        setActionText(e.value);
    };

    const [modal, setModal] = useState({
        edit: false,
        add: false,
    });
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
  return (
    <React.Fragment>
            <Head title="Rekap Presensi Siswa"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Rekap Presensi Siswa
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
                                        {/* <li className="nk-block-tools-opt">
                                            <Button color="primary" onClick={() => setModal({ add: true })}>
                                                <Icon name="plus">
                                                </Icon>
                                                <div>Rentang</div>
                                            </Button>
                                        </li> */}
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
                                    <h5 className="title">Data Rekap Presensi</h5>
                                </div>
                                <div className="card-tools me-n1">
                                    <ul>
                                        <li>     
                                        <div className="from-wrap">
                                            <RSelect
                                                option={filterThn}
                                                className="w-150px"
                                                placeholder="Tahun Ajran Aktif"
                                                onChange={(e) => onActionText(e)}
                                            />
                                        </div>
                                        </li>
                                        <li>
                                        <div className="from-wrap">
                                            <RSelect
                                                option={filterBln}
                                                className="w-150px"
                                                placeholder="Semua Bulan"
                                                onChange={(e) => onActionText(e)}
                                            />
                                        </div>
                                        </li>
                                        <li>
                                        <div className="from-wrap">
                                            <RSelect
                                                option={filterKls}
                                                className="w-150px"
                                                placeholder="Semua Jenjang"
                                                onChange={(e) => onActionText(e)}
                                            />
                                        </div>
                                        </li>
                                    </ul>
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
                                {/* <DataTableRow>
                                    <span>No</span>
                                </DataTableRow> */}
                                <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        siswa
                                        </div>
                                    <DataTableRow>
                                        <span>No</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>nis</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>nama</span>
                                    </DataTableRow>
                                </DataTableRow>
                                <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        Juli
                                        </div>
                                    <DataTableRow>
                                        <span>M</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>S</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>I</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>A</span>
                                    </DataTableRow>
                                </DataTableRow>
                                <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        Agustus
                                        </div>
                                    <DataTableRow>
                                        <span>M</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>S</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>I</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>A</span>
                                    </DataTableRow>
                                </DataTableRow>
                                <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        September
                                        </div>
                                    <DataTableRow>
                                        <span>M</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>S</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>I</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>A</span>
                                    </DataTableRow>
                                </DataTableRow>
                                <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        Oktober
                                        </div>
                                    <DataTableRow>
                                        <span>M</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>S</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>I</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>A</span>
                                    </DataTableRow>
                                </DataTableRow>
                                 <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        November
                                        </div>
                                    <DataTableRow>
                                        <span>M</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>S</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>I</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>A</span>
                                    </DataTableRow>
                                </DataTableRow>
                                 <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        Desember
                                        </div>
                                    <DataTableRow>
                                        <span>M</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>S</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>I</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>A</span>
                                    </DataTableRow>
                                </DataTableRow>
                                 <DataTableRow >
                                    <div style={{ display: "flex", marginLeft:"35px", fontSize:'15px'}}>
                                        Jumlah
                                        </div>
                                    <DataTableRow>
                                        <span>M</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>S</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>I</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>A</span>
                                    </DataTableRow>
                                </DataTableRow>
                                <DataTableRow className="nk-tb-col-tools">Aksi</DataTableRow>
                            </DataTableHead>
                            {currentItems.length > 0
                                ? currentItems.map((item) => {
                                    return (
                                        <DataTableItem key={item.id}>
                                            {/* <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.id}</span>
                                                </div>
                                            </DataTableRow> */}
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.juli}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.agust}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.sept}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.okt}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.nov}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.des}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.jml}</span>
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

export default RekapPresensiSiswa
