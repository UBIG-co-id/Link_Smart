import React, { useLayoutEffect } from 'react'
import Layout from '../layout'
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Pegawai from '../pages/Pegawai/Pegawai';
import { UserContextProvider } from '../component/user/UserContext';
// SISWA
import KenaikanKelas from '../pages/Kelas/KenaikanKelas';
import AksesEditSiswa from '../pages/Siswa/AksesEditSiswa';
// END SISWA
import MapelKelas from '../pages/Rapor/Mapel/Kelas'
import AddMapelKelas from '../component/modal/klsmapel/AddMapel'
import LayoutNoSidebar from '../layout/index-nonSidebar'
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PresensiSiswaManual from '../pages/Presensi/SiswaManual';

//add mutasi siswa
import MutasiSiswa from '../pages/Siswa/MutasiSiswa';
import AddMutasiSiswa from '../component/modal/siswa/Mutasi';

//add mutasi ptk
import PTK from '../pages/Pegawai/MutasiPtk'

//add ruang kelas
import RuangKelas from '../pages/Kelas/RuangKelas';
import AddRuangKelas from '../component/modal/ruangKelas/AddModal';

//add data siswa
import Siswa from '../pages/Siswa/Siswa';
import AddSiswa from '../component/modal/siswa/AddModal';

//add presensi pegawai
import PresensiPegawai from '../pages/Presensi/Pegawai';
import AddPresensipegawai from '../component/modal/presensi-pegawai/AddModal';

//add presensi siswa
import PresensiSiswa from '../pages/Presensi/Siswa';
import AddPresensiSiswa from '../component/modal/presesensi-siswa/AddModal';

//add kkm
import Kkm from '../pages/Rapor/Mapel/Kkm';
import AddKkm from '../component/modal/kkm/AddModal';

//add mapel
import Mapel from '../pages/Rapor/Mapel/Mapel';
import AddMapel from '../component/modal/mapel/AddModal';

//add penilaian sikap
import PenilaianSikap from '../pages/Rapor/Penilaian/Sikap';
import AddPenilaianSikap from '../component/modal/penilaian-sikap/AddPenilaianSikap';

//add penilaian lain
import PenilaianLain from '../pages/Rapor/Penilaian/Lain';
import AddPenilaianLain from '../component/modal/Penilaian-lain/AddPenilaianLain';

//add penilaian aspek
import PenilaianAspek from '../pages/Rapor/Penilaian/Aspek';
import AddPenilaianAspek from '../component/modal/penilaian-aspek/AddPenilaianAspek';

//add template rapor
import TemplateRapor from '../pages/Rapor/Template/TemplateRapor';
import AddTemplateRapor from '../component/modal/template-rapor/AddTemplateRapor';

//add rentang nilai
import RentangNilai from '../pages/Rapor/Setting/RentangNilai';
import AddRentangNilai from '../component/modal/rentang-nilai/AddRentangNilai';

// add kkm batas
import KkmBatas from '../pages/Rapor/Setting/KkmBatas';
import AddKkmBatas from '../component/modal/kkm-batas/AddKkmBatas';

//add prngaturan profile
import Profile from '../pages/Pengaturan/Profile';
import AddProfile from '../component/modal/pengaturan-profile/AddProfile';

// import PresensiSiswa from '../pages/Presensi/Siswa';
import PenilaianKd from '../pages/Rapor/Penilaian/Kd';
import SettingUmum from '../pages/Rapor/Setting/Umum';
import TampilanRapor from '../pages/Rapor/Setting/TampilanRapor';
import TagihanSiswa from '../pages/Pembayaran/TagihanSiswa';
import TagihanSpp from '../pages/Pembayaran/TagihanSpp';
import KustomSppSiswa from '../pages/Pembayaran/KustomSppSiswa';
import Pengumuman from '../pages/Pengumuman/Pengumuman';
import Ppdb from '../pages/Ppdb/Ppdb';
import LaporanSiswa from '../pages/Laporan/PresensiSiswa';
import LaporanPegawai from '../pages/Laporan/PresensiPegawai';
import PembayaranSpp from '../pages/Laporan/PembayaranSpp';
import Identitas from '../pages/Pengaturan/Identitas';
import AddPegawai from '../component/modal/pegawai/AddModal'
import AddMutasi from '../component/modal/mutasiPTK/AddModal'
import Pengetahuan from '../pages/Penilaian/Pengetahuan';
import Keterampilan from '../pages/Penilaian/Keterampilan';
import Nilailain from '../pages/Penilaian/Nilailain';
import Spiritualdansosial from '../pages/Penilaian/Spiritualdansosial';
import CatatanWalas from '../pages/Penilaian/Catatanwalas';
import RaporKurikulum from '../pages/Rapor/RaporKurikulum/RaporKurikulum';
import RekapNilai from '../pages/Rapor/RaporKurikulum/RekapNilai';
import Cover from '../pages/Rapor/Cover/CetakCover';
import PembayaranManual from '../pages/Pembayaran/PembayaranManual';
import HistoryPembayaran from '../pages/Pembayaran/HistoryPembayaran';
import Tahunajaran from '../pages/Pengaturan/Tahunajaran';
import SettingPpdb from '../pages/Pengaturan/Pengaturanppdb';
import Pembayaran from '../pages/Pengaturan/Pembayaran';


//DATA PENGGUNA
import DataPengguna from '../pages/Pengaturan/DataPengguna';
import AddDatapengguna from '../component/modal/data-pengguna/AddModal'

//REKAP PRESENSI & SPP SISWA
import RekapPresensiSiswa from '../pages/Laporan/RekapPresensiSiswa';
import RekapSppSiswa from '../pages/Laporan/RekapSppSiswa';
import Presensi from '../pages/Pengaturan/Presensi';

const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Routes>
      <Route path={`${process.env.PUBLIC_URL}`} element={<Layout />}>
        <Route path='/dashboard' element={<Dashboard />}></Route>

        <Route element={<UserContextProvider />}>
          <Route path='/pegawai' element={<Pegawai />}></Route>
          <Route path='/pegawai/add-pegawai' element={<AddPegawai />}></Route>
          <Route path='/pegawai/add-mutasi' element={<AddMutasi />}></Route>
        </Route>

        <Route path='/kelas/Kenaikan-kelas' element={<KenaikanKelas />}></Route>

        <Route path='/siswa/akses-edit-siswa' element={<AksesEditSiswa />}></Route>
        <Route path='/siswa/add-siswa' element={<AddSiswa />}></Route>
        

        {/* PRESENSI */}
        {/* <Route path='/presensi/siswa' element={<PresensiSiswa />}></Route> */}
        {/* END PRESENSI */}

        {/* RAPOR */}
        <Route path='/presensi/siswa-manual' element={<PresensiSiswaManual/>}></Route>
        <Route path='/rapor/penilaian-kd' element={<PenilaianKd />}></Route>
        <Route path='/rapor/setting-umum' element={<SettingUmum />}></Route>
        <Route path='/rapor/setting-tampilkan' element={<TampilanRapor />}></Route>
        <Route path='/rapor/kurikulum' element={<RaporKurikulum/>}></Route>
        <Route path='/rapor/rekap-nilai' element={<RekapNilai/>}></Route>
        <Route path='/rapor/cetak-cover' element={<Cover/>}></Route>
        {/* END RAPOR */}

        {/* ADD KELAS MAPEL */}
        <Route path='/rapor/mapel-kelas' element={<MapelKelas />}></Route>
        <Route path='/rapor/add-mapel-kelas' element={<AddMapelKelas />}></Route>
        {/* ADD KELAS MAPEL */}

        {/* ADD KKM BATAS */}
        <Route path='/rapor/penilaian-kkm-batas' element={<KkmBatas />}></Route>
        <Route path='/rapor/add-penilaian-kkm-batas' element={<AddKkmBatas />}></Route>
        {/* ADD KKM BATAS */}

        {/* ADD RENTANG NILAI */}
        <Route path='/rapor/setting-rentang' element={<RentangNilai />}></Route>
        <Route path='/rapor/add-rentang' element={<AddRentangNilai />}></Route>
        {/* ADD RENTANG NILAI */}

        {/* ADD TEMPLATE RAPOR */}
        <Route path='/rapor/template' element={<TemplateRapor />}></Route>
        <Route path='/rapor/add-template' element={<AddTemplateRapor />}></Route>
        {/* ADD TEMPLATE RAPOR */}

        {/* ADD MUTASI SISWA */}
        <Route path='/siswa/mutasi-siswa' element={<MutasiSiswa />}></Route>
        <Route path='/siswa/add-mutasi-siswa' element={<AddMutasiSiswa />}></Route>
        {/* ADD MUTASI SISWA */}

        {/* ADD RUANG KELAS */}
        <Route path='/kelas/ruang' element={<RuangKelas />}></Route>
        <Route path='/kelas/add-ruang' element={<AddRuangKelas />}></Route>
        {/* ADD RUANG KELAS */}

        {/* ADD PRESENSI PEGAWAI */}
        <Route path='/presensi/pegawai' element={<PresensiPegawai/>}></Route>
        <Route path='/presensi/add-presensi-pegawai' element={<AddPresensipegawai/>}></Route>
        {/* ADD PRESENSI PEGAWAI */}

        {/* ADD PRESENSI SISWA */}
        <Route path='/presensi/siswa' element={<PresensiSiswa/>}></Route>
        <Route path='/presensi/add-presensi-siswa' element={<AddPresensiSiswa/>}></Route>
        {/* ADD PRESENSI SISWA */}

        {/* ADD PENILAIAN SIKAP */}
        <Route path='/rapor/penilaian-sikap' element={<PenilaianSikap />}></Route>
        <Route path='/rapor/add-penilaian-sikap' element={<AddPenilaianSikap />}></Route>
        {/* ADD PENILAIAN SIKAP */}

        {/* ADD PENILAIAN LAIN */}
        <Route path='/rapor/penilaian-lain' element={<PenilaianLain />}></Route>
        <Route path='/rapor/add-penilaian-lain' element={<AddPenilaianLain />}></Route>
        {/* ADD PENILAIAN LAIN */}

        {/* ADD PENILAIAN ASPEK */}
        <Route path='/rapor/penilaian-aspek' element={<PenilaianAspek />}></Route>
        <Route path='/rapor/add-penilaian-aspek' element={<AddPenilaianAspek />}></Route>
        {/* ADD PENILAIAN ASPEK */}

        {/* ADD SISWA */}
        <Route path='/siswa' element={<Siswa />}></Route>
        <Route path='/siswa/add-siswa' element={<AddSiswa />}></Route>
        {/* ADD SISWA */}

        {/* ADD KKM */}
        <Route path='/rapor/mapel-kkm' element={<Kkm />}></Route>
        <Route path='/rapor/add-kkm' element={<AddKkm/>}></Route>
        {/* ADD KKM */}

        {/* ADD MAPEL */}
        <Route path='/rapor/mapel' element={<Mapel />}></Route>
        <Route path='/rapor/add-mapel' element={<AddMapel/>}></Route>
        {/* ADD MAPEL */}

        {/* ADD MUTASI PTK */}
        <Route path='/pegawai/mutasi-ptk' element={<PTK />}></Route>
        <Route path='/pegawai/add-mutasi-ptk' element={<AddMutasi />}></Route>
        {/* ADD MUTASI PTK */}

        {/* PEMBAYARAN */}
        <Route path='/pembayaran/get-all-tagihan-siswa' element={<TagihanSiswa />}></Route>
        <Route path='/pembayaran/spp' element={<TagihanSpp />}></Route>
        <Route path='/pembayaran/kustom-spp' element={<KustomSppSiswa />}></Route>
        <Route path='/pembayaran/bayar-tagihan' element={<PembayaranManual />}></Route>
        <Route path='/pembayaran/histori-pembayaran' element={<HistoryPembayaran/>}></Route>
        {/* END PEMBAYARAN */}

        {/* PENGUMUMAN */}
        <Route path='/pengumuman' element={<Pengumuman />}></Route>
        {/* END PENGUMUMAN */}

        {/* PPDB */}
        <Route path='/ppdb' element={<Ppdb />}></Route>
        {/* END PPDB */}

        {/* LAPORAN */}
        <Route path='/laporan/siswa' element={<LaporanSiswa />}></Route>
        <Route path='/laporan/pegawai' element={<LaporanPegawai />}></Route>
        <Route path='/laporan/spp' element={<PembayaranSpp />}></Route>
        <Route path='/laporan/rekappresensisiswa' element={<RekapPresensiSiswa/>}></Route>
        <Route path='/laporan/spp-rekap' element={<RekapSppSiswa />}></Route>
        {/* END LAPORAN */}

        {/* PENGATURAN */}
        <Route path='/pengaturan/identitas' element={<Identitas/>}></Route>
        <Route path='/pengaturan/tahunajaran' element={<Tahunajaran/>}></Route>
        <Route path='/pengaturan/pengaturanppdb' element={<SettingPpdb />}></Route>
        <Route path='/pengaturan/pembayaran' element={<Pembayaran />}></Route>
        <Route path='/pengaturan/presensi' element={<Presensi/>}></Route>
        {/* PENGATURAN */}
        
        {/* PENILAIAN */}
        <Route path='/penilaian/pengetahuan' element={<Pengetahuan />}></Route>
        <Route path='/penilaian/keterampilan' element={<Keterampilan />}></Route>
        <Route path='/penilaian/nilailain' element={<Nilailain />}></Route>
        <Route path='/penilaian/spiritualdansosial' element={<Spiritualdansosial />}></Route>
        <Route path='/penilaian/catatanwalas' element={<CatatanWalas />}></Route>
        {/* END PENILAIAN */}

        {/* ADD DATA PENGATURAN PROFILE*/}
        <Route path='/pengaturan/profile' element={<Profile />}></Route>
        <Route path='/pengaturan/add-profile' element={<AddProfile />}></Route>
        {/* ADD DATA PENGATURAN PROFILE */}

        {/* ADD DATA PENGGUNA */}
        <Route path='/pengaturan/pengguna' element={<DataPengguna />}></Route>
        <Route path='/pengaturan/add-pengguna' element={<AddDatapengguna />}></Route>
        {/* ADD DATA PENGGUNA */}


      </Route>
      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
        <Route index element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

      </Route>
    </Routes>
  )
}

export default Router
