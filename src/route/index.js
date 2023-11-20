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
import PresensiSiswa from '../pages/presensi/Siswa';
import LayoutNoSidebar from '../layout/index-nonSidebar'
import Login from '../pages/Auth/Login';

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
        <Route path='/rapor/mapel' element={<Mapel />}></Route>
        <Route path='/rapor/mapel-kelas' element={<MapelKelas />}></Route>
        <Route path='/rapor/mapel-kkm' element={<Kkm />}></Route>
        <Route path='/presensi/siswa' element={<PresensiSiswa />}></Route>
      </Route>
      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
      <Route index element={<Login />}></Route>

      </Route>
    </Routes>
  )
}

export default Router
