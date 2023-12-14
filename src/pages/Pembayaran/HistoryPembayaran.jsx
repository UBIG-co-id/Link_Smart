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
import { filterKls, filterMpl, filterSmt, filterStatus, filterSts, historyPembayaran, penilaianSikap, filterJk } from '../../component/user/UserData'
import AddModal from '../../component/modal/pegawai/AddModal'


const HistoryPembayaran = () => {
  const [data, setData] = useState(historyPembayaran);
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
            const apiUrl = `https://linksmart-1-t2560421.deta.app/histori-cari?${queryString}`;
    
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


    const [sm, updateSm] = useState(false);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const toggle = () => setonSearch(!onSearch);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setNumUrutan((pageNumber - 1) * itemPerPage + 1);
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
  const onFilterChange = (e) => {
      setSearchText(e.target.value);
  };
  const [modal, setModal] = useState({
      edit: false,
      add: false,
  });

  const [editId, setEditedId] = useState();
    const [formData, setFormData] = useState({
       nama: "",
       kelas: "",
       tgl: "",
       pembayaran: "",
       jumlah: "",
       terbayar: "",
       jenis: "",
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
    const {nama, kelas, tgl, pembayaran, jumlah, terbayar, jenis, via } = submitData;
    let submittedData = {
        id: data.length + 1,
        nama: nama,
        kelas: kelas,
        tgl: tgl,
        pembayaran: pembayaran,
        jumlah: jumlah,
        terbayar: terbayar,
        jenis: jenis,
    };
    setData([submittedData, ...data]);
    resetForm();
    setModal({ edit: false }, { add: false });
};
const onEditClick = (id) => {
    data.forEach((item) => {
        if (item.id === id) {
            setEditFormData({
              id: item.id,
              nama: item.nama,
              kelas: item.kelas,
              tgl: item.tgl,
              pembayaran: item.pembayaran,
              jumlah: item.jumlah,
              terbayar: item.terbayar,
              jenis: item.jenis,

            });
            setModal({ edit: true }, { add: false });
            setEditedId(id);
        }
    });
};

const onEditSubmit = (submitData) => {
    const { nama, kelas, tgl, pembayaran, jumlah, terbayar, jenis, via } = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
        if (item.id === editId) {
            submittedData = {
              id: item.id,
              nama: item.nama,
              kelas: item.kelas,
              tgl: item.tgl,
              pembayaran: item.pembayaran,
              jumlah: item.jumlah,
              terbayar: item.terbayar,
              jenis: item.jenis,
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
                                History Pembayaran
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
                                {/* <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
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
                                </div> */}
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block size="lg">
                    <DataTable className="card-stretch">
                        <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title">Data Histori Pembayaran</h5>
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
                                    <span>Nama Siswa</span>
                                </DataTableRow>
                                <DataTableRow size="lg">
                                    <span>Kelas</span>
                                </DataTableRow>
                                <DataTableRow >
                                    <span>Tanggal</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Pembayaran</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Jumlah</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Terbayar</span>
                                </DataTableRow>
                                <DataTableRow size="sm" >
                                    <span>Jenis</span>
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
                                                    <span>{item.nm}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.kls}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.tglByr}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.bayar}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.tagihan}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.totalByr}</span>
                                                </div>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <div className="tb-lead">
                                                    <span>{item.type}</span>
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
                                                    {/* <li containerClassName="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" onClick={() => onEditClick(item.id)}>
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
                                                    </li> */}
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
                {/* <AddModal modal={modal.add} formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterStatus={filterStatus} filterJk={filterJk} /> */}
            </Content>
        </React.Fragment>
  )
}

export default HistoryPembayaran
