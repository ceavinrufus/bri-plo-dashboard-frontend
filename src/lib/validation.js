import { z } from 'zod'

// Progress pengadaan form validation
export const ProgressPengadaanFormValidation = z.object({
    kode_user: z
        .string()
        .min(3, { message: 'Minimum 3 characters.' })
        .max(3, { message: 'Maximum 3 characters.' }),
    nodin_user: z.string().optional(),
    tanggal_nodin_user: z.union([z.string(), z.date()]).optional(),
    tim: z.string(),
    departemen: z.enum(['bcp', 'igp', 'psr']),
    perihal: z.string().min(1, { message: 'Perihal is required.' }),
    metode: z
        .enum([
            'Lelang',
            'Pemilihan Langsung',
            'Seleksi Langsung',
            'Penunjukkan Langsung',
        ])
        .optional(),
    is_verification_complete: z.boolean().optional(),
    nodin_plo: z.string().optional(),
    tanggal_nodin_plo: z.union([z.string(), z.date()]).optional(),
    proses_pengadaan: z.string().optional(),
    nomor_spk: z.string().optional(),
    tanggal_spk: z.union([z.string(), z.date()]).optional(),
    nilai_spk: z.union([z.number(), z.null()]).optional(),
    pelaku_pekerjaan: z.string().optional(),
    anggaran: z.union([z.number(), z.null()]).optional(),
    hps: z.union([z.number(), z.null()]).optional(),
    tkdn_percentage: z.union([z.number(), z.null()]).optional(),
    catatan: z.string().optional(),
})
