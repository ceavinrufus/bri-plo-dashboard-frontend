import { z } from 'zod'

// Progress pengadaan form validation
export const ProgressPengadaanFormValidation = z.object({
    kode_user: z.string().min(1, { message: 'Kode user is required.' }),
    nodin_user: z.string().optional(),
    tanggal_nodin_user: z.union([z.string(), z.date()]).optional(),
    tim: z.string(),
    departemen: z.enum(['bcp', 'igp', 'psr']),
    perihal: z.string().min(1, { message: 'Perihal is required.' }),
    tanggal_spk: z.union([z.string(), z.date()]).optional(),
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
    nilai_spk: z.number().optional(),
    anggaran: z.number().optional(),
    hps: z.number().optional(),
    tkdn_percentage: z.number().optional(),
    catatan: z.string().optional(),
})
