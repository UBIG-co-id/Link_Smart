import React, { useState, useEffect, useRef } from 'react'
import Head from '../../layout/Head'
import Content from '../../layout/Content/Content'
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
  RSelect,
  TooltipComponent,
  PaginationComponent,
  Col,
  PreviewAltCard,
} from '../../component/Component'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { filterKls, filterMpl, filterSmt, filterStatus, filterSts, penilaianSikap } from '../../component/user/UserData'

const PembayaranManual = () => {
  const [sm, updateSm] = useState(false);
  const [data, setData] = useState(penilaianSikap);
  const [cardHeight, setCardHeight] = useState(800); // Tinggi awal kartu
  const cardRef = useRef();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const [onSearchText, setSearchText] = useState("");
  const toggle = () => setonSearch(!onSearch);
  const [onSearch, setonSearch] = useState(true);

  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    // Mengukur tinggi konten dan menetapkan tinggi kartu
    if (cardRef.current) {
      const contentHeight = cardRef.current.scrollHeight;
      setCardHeight(contentHeight);
    }
  }, [data]); 
  return (
    <React.Fragment>
      <Head title="Penilaian Sikap"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Bayar Tagihan
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Link Smart</p>
              </BlockDes>
              
                <ul>
                  <li>NIS</li>
                  <li>Nama</li>
                  <li>Kelas</li>
                  <li></li>
                </ul>
              
              <BlockHeadContent>
                <div className="toggle-wrap nk-block-tools-toggle">
                  <Button
                    className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                    onClick={() => updateSm(!sm)}
                  >
                    <Icon name="more-v"></Icon>
                  </Button>
                  {/* <div className="toggle-expand-content" style={{ display: sm ? 'block' : 'none' }}>
                    <ul className="nk-block-tools g-3">
                      <li className="nk-block-tools-opt">
                        <Button color="primary mb-2" onClick={() => setModal({ add: true })}>
                          <Icon name="plus"></Icon>
                          <div>Skenario Penilaian Sikap</div>
                        </Button>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </BlockHeadContent>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block size="lg">
          <DataTable className="card-stretch">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Bayar Tagihan</h5>
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
                    className="border-transparent form-focus-none form-control form-control-sm" // Tambahkan kelas form-control-sm
                    placeholder="Cari berdasarkan Nama/NIS"
                    value={onSearchText}
                    onChange={(e) => onFilterChange(e)}
                  />
                  <Button className="search-submit btn-icon">
                    <Icon name="search"></Icon>
                  </Button>
                </div>
              </div>
            </div>
            <DataTableBody bodyclass="nk-tb-tnx">
              {/* <DataTableHead>
                <DataTableRow>
                  <span>NIS</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Nama</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Kelas</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Deskripsi Sikap</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools">Aksi</DataTableRow>
              </DataTableHead> */}
              {/* {currentItems.length > 0
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
                          <span>{item.nama}</span>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="tb-lead">
                          <span>{item.kelas}</span>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="tb-lead">
                          <span>{item.desnilai}</span>
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
                }) : null} */}
            </DataTableBody>
          </DataTable>
        </Block>
        <Col md="12" xxl="4">
          <PreviewAltCard className="card-full mt-3">
            <div className='form-group' style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                Silahkan Pilih Nama/NIS untuk menampilkan data
            </div>
          </PreviewAltCard>
        </Col>
      </Content>
    </React.Fragment>
  )
}

export default PembayaranManual
