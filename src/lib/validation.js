import { z } from 'zod'

// Progress pengadaan form validation
export const ProgressPengadaanFormValidation = z.object({
    kode_user: z
        .string()
        .min(3, { message: 'Minimum 3 characters.' })
        .max(3, { message: 'Maximum 3 characters.' }),
    nodin_user: z.string(),
    tanggal_nodin_user: z.union([z.string(), z.date()]),
    tim: z.string(),
    departemen: z.enum(['bcp', 'igp', 'psr']),
    proyek: z.string().nullable().optional(),
    perihal: z.string().min(1, { message: 'Perihal is required.' }),
    metode: z
        .enum([
            'Lelang',
            'Pemilihan Langsung',
            'Seleksi Langsung',
            'Penunjukan Langsung',
        ])
        .nullable()
        .optional(),
    verification_completed_at: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    nodin_ip_pengadaan: z.string().nullable().optional(),
    tanggal_nodin_ip_pengadaan: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    nodin_plo: z.string().nullable().optional(),
    tanggal_nodin_plo: z.union([z.string(), z.date()]).nullable().optional(),
    proses_pengadaan: z.string().nullable().optional(),
    tanggal_acuan: z.union([z.string(), z.date()]).nullable().optional(),
    nomor_spk: z.string().nullable().optional(),
    tanggal_spk: z.union([z.string(), z.date()]).nullable().optional(),
    nilai_spk_investasi: z
        .union([z.string(), z.number()])
        .nullable()
        .optional(),
    nilai_spk_eksploitasi: z
        .union([z.string(), z.number()])
        .nullable()
        .optional(),
    spk_currency: z.string().nullable().optional(),
    spk_rate: z.union([z.string(), z.number()]).nullable().optional(),
    pelaksana_pekerjaan: z.string().nullable().optional(),
    anggaran_investasi: z.union([z.string(), z.number()]).nullable().optional(),
    anggaran_eksploitasi: z
        .union([z.string(), z.number()])
        .nullable()
        .optional(),
    anggaran_currency: z.string().nullable().optional(),
    anggaran_rate: z.union([z.string(), z.number()]).nullable().optional(),
    hps: z.union([z.string(), z.number()]).nullable().optional(),
    hps_currency: z.string().nullable().optional(),
    hps_rate: z.union([z.string(), z.number()]).nullable().optional(),
    tkdn_percentage: z.union([z.string(), z.number()]).nullable().optional(),
    catatan: z.string().nullable().optional(),
})

// Default values validation
export const ProjectFormValidation = z.object({
    kode: z.string().min(3, { message: 'Minimum 3 characters.' }),
    nama: z.string().min(3, { message: 'Minimum 3 characters.' }),
    jenis: z.string().min(3, { message: 'Minimum 3 characters.' }),
})

// Dokumen form validation
export const DokumenSPKFormValidation = z.object({
    tanggal_spk_diterima: z.union([z.string(), z.date()]).nullable().optional(),
    tim_pemrakarsa: z
        .string()
        .min(1, { message: 'Tim Pemrakarsa is required.' }),
    nomor_spk: z.string().min(1, { message: 'Nomor SPK is required.' }),
    tanggal_spk: z.union([z.string(), z.date()]).nullable().optional(),
    jenis_pekerjaan: z
        .string()
        .min(1, { message: 'Jenis Pekerjaan is required.' }),
    nilai_spk: z.union([z.string(), z.number()]).nullable().optional(),
    spk_currency: z.string().nullable().optional(),
    spk_rate: z.union([z.string(), z.number()]).nullable().optional(),
    jangka_waktu: z.string().nullable().optional(),
    pelaksana_pekerjaan: z.string().nullable().optional(),
    alamat_pelaksana_pekerjaan: z.string().nullable().optional(),
    no_telpon_pelaksana_pekerjaan: z.string().nullable().optional(),
    pic_pengadaan: z.string().nullable().optional(),
    pic_pelaksana_pekerjaan: z.string().nullable().optional(),
    dokumen_pelengkap: z.array(z.string()).nullable().optional(),
    tanggal_info_ke_vendor: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    tanggal_pengambilan: z.union([z.string(), z.date()]).nullable().optional(),
    identitas_pengambil: z.string().nullable().optional(),
    tanggal_pengembalian: z.union([z.string(), z.date()]).nullable().optional(),
    dokumen_yang_dikembalikan: z.array(z.string()).nullable().optional(),
    tkdn_percentage: z.union([z.string(), z.number()]).nullable().optional(),
    tanggal_penyerahan_dokumen: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    penerima_dokumen: z.string().nullable().optional(),
    catatan: z.string().nullable().optional(),
})
