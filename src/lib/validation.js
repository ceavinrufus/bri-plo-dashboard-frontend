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

// Dokumen SPK form validation
export const DokumenSPKFormValidation = z.object({
    tanggal_spk_diterima: z.union([z.string(), z.date()]).nullable().optional(),
    tim_pemrakarsa: z
        .string()
        .min(1, { message: 'Tim Pemrakarsa is required.' }),
    nomor_spk: z.string().min(1, { message: 'Nomor SPK is required.' }),
    tanggal_spk: z.union([z.string(), z.date()]),
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

// Dokumen Perjanjian form validation
export const DokumenPerjanjianFormValidation = z.object({
    tanggal_permohonan_diterima: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    tim_pemrakarsa: z
        .string()
        .min(1, { message: 'Tim Pemrakarsa is required.' }),
    nomor_spk: z.string().min(1, { message: 'Nomor SPK is required.' }),
    tanggal_spk: z.union([z.string(), z.date()]),
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
    nomor_kontrak: z.string().min(1, { message: 'Nomor Kontrak is required.' }),
    tanggal_kontrak: z.union([z.string(), z.date()]),
})

// Dokumen Jaminan form validation
export const DokumenJaminanFormValidation = z.object({
    type: z
        .enum(['JUM', 'Jampel', 'JBayar', 'JPelihara'])
        .nullable()
        .optional(),
    tanggal_diterima: z.union([z.string(), z.date()]).nullable().optional(),
    penerbit: z.string().min(1, { message: 'Penerbit is required.' }),
    nomor_jaminan: z.string().min(1, { message: 'Nomor Jaminan is required.' }),
    dokumen_keabsahan: z.string().nullable().optional(),
    nilai_amount: z.union([z.string(), z.number()]).nullable().optional(),
    nilai_currency: z.string().nullable().optional(),
    nilai_rate: z.union([z.string(), z.number()]).nullable().optional(),
    waktu_mulai: z.union([z.string(), z.date()]).nullable().optional(),
    waktu_berakhir: z.union([z.string(), z.date()]).nullable().optional(),
})

// Pembayaran form validation
export const RekapPembayaranFormValidation = z.object({
    pic_pay_id: z.string().nullable().optional(),
    tanggal_terima: z.union([z.string(), z.date()]).nullable().optional(),
    nomor_spk: z.string(),
    tanggal_spk: z.union([z.string(), z.date()]),
    nomor_perjanjian: z.string().nullable().optional(),
    tanggal_perjanjian: z.union([z.string(), z.date()]).nullable().optional(),
    perihal: z.string().nullable().optional(),
    nilai_spk: z.union([z.string(), z.number()]).nullable().optional(),
    spk_currency: z.string().nullable().optional(),
    spk_rate: z.union([z.string(), z.number()]).nullable().optional(),
    vendor: z.string().nullable().optional(),
    tkdn: z.union([z.string(), z.number()]).nullable().optional(),
    nomor_invoice: z.string().nullable().optional(),
    nilai_invoice: z.union([z.string(), z.number()]).nullable().optional(),
    invoice_currency: z.string().nullable().optional(),
    invoice_rate: z.union([z.string(), z.number()]).nullable().optional(),
    nomor_rekening: z.string().nullable().optional(),
    nota_fiat: z.string().nullable().optional(),
    tanggal_fiat: z.union([z.string(), z.date()]).nullable().optional(),
    sla: z.union([z.string(), z.date()]).nullable().optional(),
    hari_pengerjaan: z.number().nullable().optional(),
    status_pembayaran: z.string().nullable().optional(),
    tanggal_pembayaran: z.union([z.string(), z.date()]).nullable().optional(),
    keterangan: z.string().nullable().optional(),
})
