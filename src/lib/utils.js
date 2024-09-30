import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const formatDate = date => {
    if (!date) return null
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${year}-${month}-${day}`
}

export const transformPengadaanDataForSubmit = data => {
    const transformedData = {
        ...data,
        tanggal_nodin_user: formatDate(data.tanggal_nodin_user),
        tanggal_spk: formatDate(data.tanggal_spk),
        nilai_spk: data.nilai_spk ? parseInt(data.nilai_spk) : null,
        anggaran: data.anggaran ? parseInt(data.anggaran) : null,
        hps: data.hps ? parseInt(data.hps) : null,
        tkdn_percentage: data.tkdn_percentage
            ? parseInt(data.tkdn_percentage)
            : null,
        verification_alert_at: data.is_verification_complete
            ? null
            : formatDate(new Date(Date.now() + 86400000)), // Add 1 day in milliseconds
    }
    return transformedData
}
