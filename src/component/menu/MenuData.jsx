const menu = [
  {
    text: "Dashboards",
    subMenu: [
      {
        text: "Dashboard",
        link: "/dashboard",
      },
      {
        text: "Pegawai",
        active: false,
        subMenu: [
          {
            text: "PTK",
            link: "/pegawai",
          },
          {
            text: "Mutasi PTK",
            link: "/pegawai/mutasi-ptk",
          },
        ],
      },
      {
        text: "Kelas",
        active: false,
        subMenu: [
          {
            text: "Ruang Kelas",
            link: "/kelas/ruang",
          },
          {
            text: "Kenaikan Kelas",
            link: "/kelas/Kenaikan-kelas",
          },

        ],
      },
      {
        text: "Siswa",
        // link: "/siswa",
        active: false,
        subMenu: [
          {
            text: "Siswa",
            link: "/siswa",
          },
          {
            text: "Akses Edit Siswa",
            link: "/siswa/akses-edit-siswa",
          },
          {
            text: "Mutasi Siswa",
            link: "/siswa/mutasi-siswa",
          },
        ],
      },

    ],
  },
  {
    text: "Applications",
    subMenu: [
      {
        text: "Rapor",
        active: false,
        subMenu: [
          {
            header: "Setup Rapor",
          },
          {
            text: "Mata Pelajaran",
            link: "/rapor/mapel",
            active: false,
            subMenu: [
              {
                text: "Mata Pelajaran",
                link: "/rapor/mapel",
              },
              {
                text: "Kelas - Mata Pelajaran",
                link: "/rapor/mapel-kelas",
              },
              {
                text: "KKM - Mata Pelajaran",
                link: "/rapor/mapel-kkm",
              }
            ]
          },
          {
            text: "Cover",
            link: "/rapor/cetak-cover",
          },
          {
            text: "Penilaian",
            link: "/rapor/penilaian#aspek",
            active: false,
            subMenu: [
              {
                text: "Aspek",
                link: "/rapor/penilaian-aspek",
              },
              {
                text: "KD",
                link: "/rapor/penilaian-kd",
              },
              {
                text: "Sikap",
                link: "/rapor/penilaian-sikap",
              },
              {
                text: "Lain",
                link: "/rapor/penilaian-lain",
              }
            ]
          },
          {
            text: "Template Rapor",
            link: "/rapor/template",
          },
          {
            text: "Pengaturan",
            link: "/rapor/settings-umum",
            active: false,
            subMenu: [
              {
                text: "Umum",
                link: "/rapor/setting-umum",
              },
              {
                text: "Tampilkan Rapor",
                link: "/rapor/setting-tampilkan",
              },
              {
                text: "Rentang Nilai",
                link: "/rapor/setting-rentang",
              },
              {
                text: "KKM Batas",
                link: "/rapor/penilaian-kkm-batas",
              }
            ]
          },
          {
            header: "Rapor",
          },
          {
            text: "Rapor Kurikulum 2013",
            link: "rapor/kurikulum",
          },
          {
            text: "Rekap Nilai Semester",
            link: "/rapor/rekap-nilai",
          },
        ],

      },
      {
        text: "Presensi",
        active: false,
        subMenu: [
          {
            text: "Presensi Siswa",
            link: "/presensi/siswa",
          },
          {
            text: "Presensi Siswa Manual",
            link: "/presensi/siswa-manual",
          },
          {
            text: "Presensi Pegawai",
            link: "/presensi/pegawai",
          },
        ],

      },
      {
        text: "Pengumuman",
        link: "/pengumuman",
      },
      {
        text: "Pembayaran",
        active: false,
        subMenu: [
          {
            text: "Tagihan Siswa",
            link: "/pembayaran/get-all-tagihan-siswa",
          },
          {
            text: "Tagihan SPP",
            link: "/pembayaran/spp",
          },
          {
            text: "Biaya Lain",
            link: "/pembayaran/tagihan-siswa",
          },
          {
            text: "Kustom Spp Siswa",
            link: "/pembayaran/kustom-spp",
          },
          {
            text: "Pembayaran Manual",
            link: "/pembayaran/bayar-tagihan",
          },
          {
            text: "History Pembayaran",
            link: "/pembayaran/histori-pembayaran",
          },
        ],

      },
      {
        text: "Chat",
        link: "/chat",
      },
      {
        text: "PPDB",
        active: false,
        subMenu: [
          {
            text: "Data PPDB",
            link: "/ppdb",
          },
          {
            text: "Pengaturan PPDB",
            link: "/ppdb/setting-pendaftaran",
          },

        ],

      },

    ],
  },   
  {
    text: "Penilaian",
    subMenu: [
      
        {
          text: "Pengetahuan",
          link: "/penilaian/pengetahuan",
        },
        {
          text: "Keterampilan",
          link: "/penilaian/keterampilan",
        },
        {
          text: "Spiritual dan Sosial",
          link: "/penilaian/spiritualdansosial",
        },
        {
          text: "Penilaian Lain",
          link: "/penilaian/nilailain",
        },
        {
          text: "Catatan Wali Kelas",
          link: "/penilaian/catatanwalas",
        },
    ],
  },
  {
    text: "Laporan",
    subMenu: [
      {
        text: "Presensi Siswa",
        link: "/laporan/siswa"
      },
      {
        text: "Presensi Pegawai",
        link: "/laporan/pegawai"
      },
      {
        text: "Pembayaran SPP",
        link: "/laporan/spp"
      },
      {
        text: "Rekap SPP Siswa",
        link: "/laporan/spp-rekap"
      },
      {
        text: "Rekap Presensi Siswa",
        link: "/laporan/rekappresensisiswa"
      },
      
    ]
  },
  {
    text: "Pengaturan",
    subMenu: [
      {
        text: "Data Pengguna",
        link: "pengaturan/pengguna"
      },
      {
        text: "Pengaturan",
        active: false,
        subMenu: [
          {
            text: "Server Lokal",
            link: "/pengaturan/lokal",
          },
          {
            text: "Identitas",
            link: "/pengaturan/identitas",
          },
          {
            text: "PPDB",
            link: "/pengaturan/pengaturanppdb",
          },
          {
            text: "Profile",
            link: "/pengaturan/profile",
          },
          {
            text: "Presensi",
            link: "/pengaturan/presensi",
          },
          {
            text: "Pembayaran",
            link: "/pengaturan/pembayaran",
          },
          {
            text: "Tahun Ajaran",
            link: "/pengaturan/tahunajaran",
          },

        ],
      }
    ],
  },
];
export default menu;
