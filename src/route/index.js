import React, { useLayoutEffect } from 'react'
import Layout from '../layout'
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Pegawai from '../pages/Pegawai/Pegawai';
import PTK from '../pages/Pegawai/MutasiPtk'
import { UserContextProvider } from '../component/user/UserContext';
import RuangKelas from '../pages/Kelas/RuangKelas';
import Siswa from '../pages/Siswa/Siswa';
import KenaikanKelas from '../pages/Kelas/KenaikanKelas';
import AksesEditSiswa from '../pages/Siswa/AksesEditSiswa';
import MutasiSiswa from '../pages/Siswa/MutasiSiswa';
import Mapel from '../pages/Rapor/Mapel/Mapel';
import MapelKelas from '../pages/Rapor/Mapel/Kelas'
import Kkm from '../pages/Rapor/Mapel/Kkm';
import PenilaianAspek from '../pages/Rapor/Penilaian/Aspek';
import LayoutNoSidebar from '../layout/index-nonSidebar'
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PresensiSiswa from '../pages/presensi/Siswa';
import PresensiPegawai from '../pages/presensi/Pegawai';
import PresensiSiswaManual from '../pages/presensi/SiswaManual';

// import PresensiSiswa from '../pages/Presensi/Siswa';
import PenilaianKd from '../pages/Rapor/Penilaian/Kd';
import PenilaianSikap from '../pages/Rapor/Penilaian/Sikap';
import PenilaianLain from '../pages/Rapor/Penilaian/Lain';
import TemplateRapor from '../pages/Rapor/Template/TemplateRapor';
import SettingUmum from '../pages/Rapor/Setting/Umum';
import TampilanRapor from '../pages/Rapor/Setting/TampilanRapor';
import RentangNilai from '../pages/Rapor/Setting/RentangNilai';
import KkmBatas from '../pages/Rapor/Setting/KkmBatas';
import TagihanSiswa from '../pages/Pembayaran/TagihanSiswa';
import TagihanSpp from '../pages/Pembayaran/TagihanSpp';
import KustomSppSiswa from '../pages/Pembayaran/KustomSppSiswa';
import Pengumuman from '../pages/Pengumuman/Pengumuman';
import Ppdb from '../pages/Ppdb/Ppdb';
import LaporanSiswa from '../pages/Laporan/PresensiSiswa';
import LaporanPegawai from '../pages/Laporan/PresensiPegawai';
import PembayaranSpp from '../pages/Laporan/PembayaranSpp';
import Pengetahuan from '../pages/Penilaian/Pengetahuan';
import RaporKurikulum from '../pages/Rapor/RaporKurikulum/RaporKurikulum';
import RekapNilai from '../pages/Rapor/RaporKurikulum/RekapNilai';
import Cover from '../pages/Rapor/Cover/CetakCover';
import PembayaranManual from '../pages/Pembayaran/PembayaranManual';
import HistoryPembayaran from '../pages/Pembayaran/HistoryPembayaran';

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
          <Route path='/pegawai/mutasi-ptk' element={<PTK />}></Route>
        </Route>

        <Route path='/kelas/ruang' element={<RuangKelas />}></Route>
        <Route path='/kelas/Kenaikan-kelas' element={<KenaikanKelas />}></Route>

        <Route path='/siswa' element={<Siswa />}></Route>
        <Route path='/siswa/akses-edit-siswa' element={<AksesEditSiswa />}></Route>
        <Route path='/siswa/mutasi-siswa' element={<MutasiSiswa />}></Route>

        {/* PRESENSI */}
        {/* <Route path='/presensi/siswa' element={<PresensiSiswa />}></Route> */}
        {/* END PRESENSI */}

        {/* RAPOR */}
        <Route path='/rapor/mapel' element={<Mapel />}></Route>
        <Route path='/rapor/mapel-kelas' element={<MapelKelas />}></Route>
        <Route path='/rapor/mapel-kkm' element={<Kkm />}></Route>
        <Route path='/presensi/siswa' element={<PresensiSiswa/>}></Route>
        <Route path='/presensi/pegawai' element={<PresensiPegawai/>}></Route>
        <Route path='/presensi/siswa-manual' element={<PresensiSiswaManual/>}></Route>
        <Route path='/rapor/penilaian-aspek' element={<PenilaianAspek />}></Route>
        <Route path='/rapor/penilaian-kd' element={<PenilaianKd />}></Route>
        <Route path='/rapor/penilaian-sikap' element={<PenilaianSikap />}></Route>
        <Route path='/rapor/penilaian-lain' element={<PenilaianLain />}></Route>
        <Route path='/rapor/template' element={<TemplateRapor />}></Route>
        <Route path='/rapor/setting-umum' element={<SettingUmum />}></Route>
        <Route path='/rapor/setting-tampilkan' element={<TampilanRapor />}></Route>
        <Route path='/rapor/setting-rentang' element={<RentangNilai />}></Route>
        <Route path='/rapor/penilaian-kkm-batas' element={<KkmBatas />}></Route>
        <Route path='/rapor/kurikulum' element={<RaporKurikulum/>}></Route>
        <Route path='/rapor/rekap-nilai' element={<RekapNilai/>}></Route>
        <Route path='/rapor/cetak-cover' element={<Cover/>}></Route>
        {/* END RAPOR */}

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
        {/* END LAPORAN */}

        {/* PENILAIAN */}
        <Route path='/penilaian/pengetahuan' element={<Pengetahuan />}></Route>


      </Route>
      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
        <Route index element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

      </Route>
    </Routes>
  )
}

export default Router
