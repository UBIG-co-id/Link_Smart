import React from 'react'
import Head from '../../layout/Head'
import Content from '../../layout/Content/Content'
import { Block, BlockBetween, BlockDes, BlockHead, BlockHeadContent, BlockTitle } from '../../component/Block'
import { Button } from 'reactstrap'
import Icon from '../../component/Icon'
import { Link } from 'react-router-dom'

const StatusPtk = () => {
    const [sm, updateSm] = useState(false);
    
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
                                            <Link to="/pegawai/add-pegawai">
                                                <Button color="primary">
                                                    <Icon name="plus">
                                                    </Icon>
                                                    {/* <div>Tambah PTK </div> */}
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
                                                    <span>{item.nm}</span>
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
                                                    <span>{item.status_ptk}</span>
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

            </Content>
        </React.Fragment>
    )
}

export default StatusPtk
