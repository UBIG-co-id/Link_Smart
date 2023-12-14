
// PEGAWAI
export const transactionData = [
    {
        id: 1,
        namaptk: "Wahyu",
        nip: 1234,
        nuptk: 12345,
        nik: 321355,
        jenis_kelamin: "Laki-Laki",
        status_ptk: "Active",
        foto: null,
        notelp: "035464",
        email: "wahyu@gmail.com",
        tgl_lahir: '31/10/2001',
        tempat_lahir: "Denpasar",
        tgl_mulaitugas: "1/11/2002" ,
        alamat: "malang",
    }
];
// PEGAWAI
export const userData = [
    {
        checkeds: '',
        id: 1,
        tgl: "10-10-2020",
        nip: "15464",
        namaptk: "Abu Bin Ishtiyak",
        status: "Active",
        jnmutasi: "Surat",
        checked: false,

    }
];

//HISTORY PEMBAYARAN
export const historyPembayaran = [
    {
        id: 1,
        nama: "Ulfa",
        kelas: "TKJ",
        tgl: "27-11-2023",
        pembayaran: "1.000.000",
        jumlah: "2.000.000",
        terbayar: "500.000",
        jenis: "selimut",
        via: "BRIMO"
    }
];

//BIAYA LAIN
export const biayalain = [
    {
        id: 1,
        nis: "090909",
        nlp: "Lee Jeno",
        kls: "XII-RPL 1",
        jdlbiaya: "Lomba 17 Agustusan",
        tghnbiayalain: "2.000.000",
        status: "Lunas",
    }
];


// KELAS
export const orderData = [
    {
        id: 1,
        kls: "RPL",
        wk: "Bu sa'diyah",
        js: 35,
        spp: "1.000.000",

    },
]
// KELAS


// SISWA
export const siswaData = [
    {
        id: 1,
        nis: 1,
        userId: 1234,
        nls: "Wahyu Fajar Robyasnsyah",
        usia: 20,
        kls: "RPL 1",
        jk: "Laki-Laki",
        namor: "Fajar",

    }
]

// 
export const kenaikanKelas = [
    {
        id: 1,
        nis: 1,
        nls: "Wahyu Fajar Robyasnsyah",
        jk: "Laki-Laki",
        kenaikan: "Naik Kelas",
        naikkls: "XI RPL"

    },
    {
        id: 2,
        nis: 2,
        nls: "Dika",
        jk: "Laki-Laki",
        kenaikan: "Tinggal",
        naikkls: "X RPL"

    }
]
// 
export const biodataSiswa = [
    {
        id: 1,
        nis: 1,
        nls: "Wahyu Fajar Robyasnsyah",
        kls: "XI RPL",
        tglawal: "2023-10-31",
        tglakhir: "2023-11-31",
        keterangan: "coba"


    },
]
export const mutasiSiswa = [
    {
        id: 1,
        tglmutasi: "2023-10-31",
        nis: 1,
        nls: "Wahyu Fajar Robyasnsyah",
        kls: "XI RPL",
        jeniss: "Surat Pindah",

    },
]
export const mapel = [
    {
        id: 1,
        mapel: "Matematika",
        singkat: "MTK",

    },
]
export const nilaisikap = [
    {
        id: 1,
        sikap: "sosial",
        nilai: "83",
        deskap: "coba",

    },
]
export const mapelKelas = [
    {
        id: 1,
        kls: "X RPL 1",
        mapel: "DDK"

    },
]
export const kkmData = [
    {
        id: 1,
        mapel: "DDK",
        kls: "X RPL 1",
        kkm: "75"
    },
]
export const presensiSiswa = [
    {
        id: 1,
       nis: 1,
       nlp:'Ulfa',
       kls: 'XII',
       tgl: '20-11-2023',
       masuk: '08:00',
       status_in: 'Masuk',
       pulang: '17:00',
       status_out: 'Pulang',
       keterangan: 'Coba'
    },
]
export const presensiPegawai = [
    {
        id: 1,
        nuptk: 2,
        nmpgw: "Rena",
        jbtn: "Guru",
        tgl: '22-11-2023',
        jmasuk: '07.30',
        jplng: '16.30',
        status: 'Masuk'
    }
]

export const siswaManual = [
    {
        id: 2,
        nis: 3,
        nlp: "Rina",
        kls: "XII RPL",
    }
]

export const filterSts = [
    { value: "Masuk", label: "Masuk" },
    { value: "Izin", label: "Izin" },
    { value: "Sakit", label: "Sakit" },
    { value: "Telat", label: "Telat" },
]

export const penilaianAspek = [
    {
        id: 1,
       aspek: 'Keterampilan',
       ujian:'Project',
      
    },
]
export const filtertiperapor = [
    { value: "Umum", label: "Umum" },
    { value: "Khusus", label: "Khusus" },
    { value: "Cover Rapor", label: "Cover Rapor" },
]
export const filtertipenilai = [
    { value: "Mata Pelajaran[KD]", label: "Mata Pelajaran[KD]" },
    { value: "Pengetahuan[Nilai Akhir]", label: "Pengetahuan[Nilai Akhir]" },
    { value: "Keterampilan[Nilai Akhir]", label: "Keterampilan[Nilai Akhir]" },
    { value: "Sikap", label: "Sikap" },
]
export const penilaianKd = [
    {
        id: 1,
       nokd: 123,
       deskripsi:'Coba',
      
    },
]
export const penilaianSikap = [
    {
        id: 1,
       sikap: 'Baik',
       nilai: 90,
       desnilai: 'Baik',
       
      
    },
]
export const penilaianLain = [
    {
        id: 1,
       penilaianlain: 'Ekstrakurikuler',
       kolomnilai:"Predikat",
    },
]
export const templateRapor = [
    {
        id: 1,
        namatemplate: 'Rapor Kurikulum 2013',
        tipe: 'Umum',
        aktif:"Aktif",
    },
]
export const tampilkanRapor = [
    {
        id: 1,
        nis:1,
        nls: 'Wahyu Fajar Robyansyah',
        kls: 'X RPL 1',
        tr:"Aktif",
        plh:"Nonaktifkan"
    },
]

export const rekapPresensiSiswa = [
    {
        id: 1,
        siswa: 'jeno',
        juli: "",
        agust:"",
        sept:"",
        okt:"",
        nov:"",
        des:"",
        jml:"",
    },
]

export const rekapSPP = [
    {
        id: 1,
        siswa: '',
        juli: "",
        agust:"",
        sept:"",
        okt:"",
        nov:"",
        des:"",
        jml:"",
    },
]

export const rentangNilai = [
    {
        id: 1,
        deskripsi:"Sangat Baik",
        huruf: 'A',
        
    },
    {
        id: 2,
        deskripsi:"Baik",
        huruf: 'B',
        
    },
    {
        id: 3,
        deskripsi:"Belum Optimal",
        huruf: 'C',
        
    },
    {
        id: 4,
        deskripsi:"Perlu Bimbingan",
        huruf: 'D',
        
    },
]
export const kkmBatas = [
    {
        id: 1,
        kkm: 75,
        batasd: "0-74",
        batasc: "75-83",
        batasb: "84-92",
        batasa: "93-100",
        
    },
    {
        id: 2,
        kkm: 80,
        batasd: "0-74",
        batasc: "75-83",
        batasb: "84-92",
        batasa: "93-100",
        
    },
    {
        id: 3,
        kkm: 85,
        batasd: "0-74",
        batasc: "75-83",
        batasb: "84-92",
        batasa: "93-100",
        
    },
    {
        id: 4,
        kkm: 90,
        batasd: "0-74",
        batasc: "75-83",
        batasb: "84-92",
        batasa: "93-100",
        
    },
]

export const tagihanSpp = [
    {
        id: 1,
        nis:1,
        nls: 'Wahyu Fajar Robyansyah',
        kls: 'X RPL 1',
        bts:"1.000.000",
        
    },
]
export const sppBulan = [
    {
        id: 1,
        nis:1,
        nls: 'Wahyu Fajar Robyansyah',
        kls: 'X RPL 1',
        bln:"Juli",
        tagihan:"Rp 275.000",
        tglbyr:"31/10/2001",
    },
]
export const sppSmstr = [
    {
        id: 1,
        nis:1,
        nls: 'Wahyu Fajar Robyansyah',
        kls: 'X RPL 1',
        gan:"Rp 1.200.000",
        gen:"Rp 1.275.000",
        nmsklh:"SMKN NEO CULTURE",
    },
]
export const tagihanSiswa = [
    {
        id: 1,
        nis:1,
        nls: 'Wahyu Fajar Robyansyah',
        kls: 'X RPL 1',
        sppgan:"1.000.000",
        sppgen:"1.200.000",
        tl:"200.000",
        total: "2.400.000",
    },
]
export const kustomspp = [
    {
        id: 1,
        nm: "Jonathan Joestar",
        nis: "666999",
        kelas: "X RPL 1",
        kustomSpp: "Rp 8.090",
        start: "2023-10-10T00:00:00",
        batas: "2023-12-30T00:00:00",
    },
]
export const pengumuman = [
    {
        id: 1,
        judul: "ADIWIYATA AWARDS 2023",
        wt:"2023-10-30",
        tb:"Ya"
    },
    {
        id: 2,
        judul: "SEMINAR NASIONAL",
        wt:"2023-10-29",
        tb:"Tidak"
    },
]
export const ppdb =[
    {
        id:1,
        nisn:1,
        nik:123434123423,
        ns:"Wahyu Fajar Robyansyah",
        peminatan: "RPL",
        verifikasi: "Ya",
        lulus:"Ya",
        diterima:"Ya",
    }
]

// PENGATURAN DATA PENGGUNA
export const datapengguna = [
    {
        id: 1,
        nuptk: 2,
        nlp: "lee jeno",
        npgn: "jeno",
        level: "admin",

    },
]
// PENGATURAN DATA PENGGUNA


export const pengaturanProfile = [
    {
        id: 1,
        judul: 'Struktur',
        urutan: 1,
       
      
    },
]

// PENGATURAN TAHUN AJARAN

export const tahunAjaran = [
    {
        id: 1,
        tajar: 'Struktur',
        pergan: 1,
        pergen: 2,
        semester: 2,
        status: "Active",

       
      
    },
]
//PENGATURAN TAHUN AJARAN

export const filterStatus = [
    { value: "Active", label: "Active" },
    { value: "Izin", label: "Izin" },
    { value: "Sakit", label: "Sakit" },
];
export const filterSikap = [
    { value: "Spiritual", label: "Spiritual" },
    { value: "Sosial", label: "Sosial" },
];
export const filterJk = [
    { value: "Laki-Laki", label: "Laki-Laki" },
    { value: "Perempuan", label: "Perempuan" },

];
export const filterThn = [
    { value: "2023/2024", label: "2023/2024" },
    { value: "2024/2025", label: "2024/2025" },

];
export const filterKls = [
    { value: "X", label: "X" },
    { value: "XI", label: "XI" },
    { value: "XII", label: "XII" },

];
export const filterWk = [
    { value: "Dika", label: "Dika" },
    { value: "Abdul", label: "Abdul" },
    { value: "Permana", label: "Permana" },

];
export const filterSiswa = [
    { value: "ismail ahmad kanabawi", label: "ismail ahmad kanabawi" },
    { value: "utsman abdul jalil sheisyah", label: "utsman abdul jalil sheisyah" },
    { value: "Muhammad Sumbul", label: "Muhammad Sumbul" },

];
export const filterAgm = [
    { value: "Islam", label: "Islam" },
    { value: "Hindu", label: "Hindu" },
    { value: "Budha", label: "Budha" },
    { value: "Kristen", label: "Kristen" },
    { value: "Konguchu", label: "Konguchu" },

];


export const filterPtk = [
    { value: "wahyu", label: "Wahyu" },
    { value: "fajar", label: "Fajar" },

];
export const filterJp = [
    { value: "S3", label: "S3" },
    { value: "S2", label: "S2" },
    { value: "S1", label: "S1" },
    { value: "SMA", label: "SMA" },
    { value: "SMP", label: "SMP" },
    { value: "SD", label: "SD" },

];
export const filterSt = [
    { value: "Aktif", label: "Aktif" },
    { value: "Non-Aktif", label: "Non-Aktif" },

];
export const filterP = [
    { value: "WiraSwasta", label: "WiraSwasta" },
    { value: "PNS", label: "PNS" },

];
export const filterPeng = [
    { value: "500.000", label: "500.000" },
    { value: "500.000 - 1.000.000", label: "500.000 - 1.000.000" },
    { value: "1.000.000 - 2.000.000", label: "1.000.000 - 2.000.000" },
    { value: "> 2.000.000", label: "> 2.000.000" },

];

export const countryOptions = [
    { value: "Canada", label: "Canada" },
    { value: "USA", label: "USA" },
    { value: "India", label: "India" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "France", label: "France" },
    { value: "England", label: "England" },
];
export const filterTn = [
    { value: "Tematik", label: "Tematik" },
    { value: "Tanpa Tematik", label: "Tanpa Tematik" },
];
export const filterPn = [
    { value: "Nilai KD", label: "Nilai KD" },
    { value: "Nilai Akhir Rapor", label: "Nilai Akhir Rapor" },
    { value: "Kompetensi KD", label: "Kompetensi KD" },
];
export const filterNs = [
    { value: "Skenario Penilai", label: "Skenario Penilai" },
    { value: "Sub Penilaian Sikap", label: "Sub Penilaian Sikap" },
];
export const filterMpl = [
    {value: "Matematika", label: "Matematika"},
    {value: "IPA", label: "IPA"},
    {value: "IPS", label: "IPS"},
];
export const filterSmt = [
    {value: "Ganjil", label: "Ganji"},
    {value: "Genap", label: "Genap"},
];
export const filterStt = [
    {value: "Lunas", label: "Lunas"},
    {value: "Belum Lunas", label: "Belum Lunas"},
];
export const filterSta = [
    {value: "Lulus", label: "Lulus"},
    {value: "Belum Lulus", label: "Belum Lulus"},
];
export const filterBln = [
    {value: "Januari", label: "Januari"},
    {value: "Februari", label: "Februari"},
    {value: "Maret", label: "Maret"},
    {value: "April", label: "April"},
    {value: "Mei", label: "Mei"},
    {value: "Juni", label: "Juni"},
    {value: "Juli", label: "Juli"},
    {value: "Agustus", label: "Agustus"},
    {value: "September", label: "September"},
    {value: "Oktober", label: "Oktober"},
    {value: "November", label: "November"},
    {value: "Desember", label: "Desember"},
]

export const mpl = [
    
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
]


