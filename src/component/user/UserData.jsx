
// PEGAWAI
export const transactionData = [
    {
        id: 1,
        nip: 123,
        nuptk: 1234,
        fotoData: null,
        nama: "Wahyu",
        jk: "Laki-Laki",
        status: "Active",
        notelp: "035464",
        email: "wahyu@gmail.com",
        tlahir: "denpasar",
        tgllahir: '31/10/2001',
        tglmt: "1/11/2002",
        nik: 321355,
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
        mapel: "Rekayasa Perangkat Lunak",
        singkat: "RPL",

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
       in: '08:00',
       status_in: 'Tepat Waktu',
       out: '17:00',
       status_out:'anda belum checkout',
       keterangan: 'Coba'
    },
]
export const penilaianAspek = [
    {
        id: 1,
       aspek: 'Keterampilan',
       ujian:'Project',
      
    },
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

export const filterStatus = [
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
    { value: "Suspend", label: "Suspend" },
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

//Aspek


