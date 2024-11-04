import { z } from 'zod'

// Progress pengadaan form validation
export const ProgressPengadaanFormValidation = z.object({
    kode_user: z
        .string()
        .min(3, { message: 'Minimum 3 characters.' })
        .max(3, { message: 'Maximum 3 characters.' }),
    nodin_user: z.string().nullable().optional(),
    tanggal_nodin_user: z.union([z.string(), z.date()]).nullable().optional(),
    tim: z.string(),
    departemen: z.enum(['bcp', 'igp', 'psr']),
    proyek: z.string().nullable().optional(),
    perihal: z.string().min(1, { message: 'Perihal is required.' }),
    metode: z
        .enum([
            'Lelang',
            'Pemilihan Langsung',
            'Seleksi Langsung',
            'Penunjukkan Langsung',
        ])
        .nullable()
        .optional(),
    is_verification_complete: z.boolean().nullable().optional(),
    nodin_plo: z.string().nullable().optional(),
    tanggal_nodin_plo: z.union([z.string(), z.date()]).nullable().optional(),
    proses_pengadaan: z.string().nullable().optional(),
    tanggal_acuan: z.union([z.string(), z.date()]).nullable().optional(),
    nomor_spk: z.string().nullable().optional(),
    tanggal_spk: z.union([z.string(), z.date()]).nullable().optional(),
    nilai_spk: z.union([z.string(), z.number()]).nullable().optional(),
    pelaksana_pekerjaan: z.string().nullable().optional(),
    tanggal_permohonan_anggaran: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    tanggal_permohonan_hps: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    tanggal_terima_anggaran: z
        .union([z.string(), z.date()])
        .nullable()
        .optional(),
    tanggal_terima_hps: z.union([z.string(), z.date()]).nullable().optional(),
    anggaran: z.union([z.string(), z.number()]).nullable().optional(),
    hps: z.union([z.string(), z.number()]).nullable().optional(),
    tkdn_percentage: z.union([z.string(), z.number()]).nullable().optional(),
    catatan: z.string().nullable().optional(),
})

// Default values validation
export const ProjectFormValidation = z.object({
    kode: z.string().min(3, { message: 'Minimum 3 characters.' }),
    nama: z.string().min(3, { message: 'Minimum 3 characters.' }),
    jenis: z.string().min(3, { message: 'Minimum 3 characters.' }),
})
