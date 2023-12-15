import React,{useState, useEffect} from 'react'
import Head from '../../layout/Head'
import Content from '../../layout/Content/Content'
import { Block, BlockBetween, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Button, Icon, PaginationComponent, RSelect, TooltipComponent } from '../../component/Component'
import { sppBulan, filterStt } from '../../component/user/UserData'
import { DataTable, DataTableBody, DataTableHead, DataTableItem, DataTableRow } from '../../component/table/DataTable'
import { DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { Link } from 'react-router-dom'
const SppBulan = () => {
  const [sm, updateSm] = useState(false);
  const [data, setData] = useState([])
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
        const apiUrl = `https://linksmart-1-t2560421.deta.app/sppbulan-cari?${queryString}`;

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


  const toggle = () => setonSearch(!onSearch);
  const [onSearchText, setSearchText] = useState("");
  const [onSearch, setonSearch] = useState(true);

  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  
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

  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    nis: "",
    nls: "",
    kls: "",
    sppgan: "",
    sppgen: "",
    tl: "",
    total: "",
  });
  const [editFormData, setEditFormData] = useState({
    nis: "",
    nls: "",
    kls: "",
    sppgan: "",
    sppgen: "",
    tl: "",
    total: "",
});
const resetForm = () => {
    setFormData({
      nis: "",
      nls: "",
      kls: "",
      sppgan: "",
      sppgen: "",
      tl: "",
      total: "",

    });
};
const closeEditModal = () => {
    setModal({ edit: false })
    resetForm();
};
const onEditClick = (id) => {
    data.forEach((item) => {
        if (item.id === id) {
            setEditFormData({
              nis: item.nis,
              nls: item.nls,
              kls: item.kls,
              sppgan: item.sppgan,
              sppgen: item.sppgen,
              tl: item.tl,
              total: item.total,
            });
            setModal({ edit: true }, { add: false });
            setEditedId(id);
        }
    });
};
const onEditSubmit = (submitData) => {
    const { nis, nls, kls, sppgan, sppgen, tl, total } = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
        if (item.id === editId) {
            submittedData = {
              nis: nis,
              nls: nls,
              kls: kls,
              sppgan: sppgan,
              sppgen: sppgen,
              tl: tl,
              total: total,
            };
        }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
};
  return (
    <React.Fragment>
      <Head title="Spp Bulanan"></Head>
      <Content>
      <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Spp Bulanan
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
                        <span>Export Semua Tagihan Siswa</span>
                      </Button>
                    </li>
                    {/* <li>
                        <Button color="primary" outline className="btn-dim btn-white">
                            <Icon name="reports"></Icon>
                            <span>Reports</span>
                        </Button>
                    </li> */}
                    <li className="nk-block-tools-opt">
                      <Link to='/pembayaran/add-spp-bulan'>
                        <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                            <Icon name="plus"></Icon>
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
                {/* <div className="card-title">
                                    <h5 className="title">Data Histori Pembayaran</h5>
                                </div> */}
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">
                    <div className="from-wrap w-150px">
                      <RSelect
                        options={filterStt}
                        placeholder="Semua Status"
                        // value={{
                        //     value: formData.kls,
                        //     label: formData.kls,
                        // }}
                        onChange={(e) => setFormData({ ...formData, kls: e.value })}
                      />
                    </div>
                  </div>
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
                  <span>NIS</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Nama Siswa</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Kelas</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Bulan</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Tagihan</span>
                </DataTableRow>
                <DataTableRow >
                  <span>Tanggal Bayar</span>
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
                          <span>{item.nis}</span>
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
                          <span>{item.bulan}</span>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="tb-lead">
                          <span>{item.tagihan}</span>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="tb-lead">
                          <span>{item.tglByr}</span>
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

export default SppBulan
