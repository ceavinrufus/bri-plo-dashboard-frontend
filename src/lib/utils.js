import { progress } from '@/data/ProgressSelection'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const formatDateYMD = date => {
    if (!date) return null
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${year}-${month}-${day}`
}

export const formatDateDMY = dateString => {
    if (!dateString) return null

    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

// Modified generateNodinAlert function
const generateNodinAlert = (defaultValues, data) => {
    // Jika nodin_plos belum ada, return null
    if (!data.nodin_plo) {
        return null
    }
    if (!defaultValues.nodin_plos || defaultValues.nodin_plos.length === 0) {
        if (data.nodin_plo) {
            return formatDateYMD(new Date(Date.now() + 86400000 * 14)) // 14 hari dalam milliseconds
        }
    }

    // Jika nodin_plos telah diubah dari nilai default-nya,
    // generate alert 14 hari setelah hari ini
    if (
        data.nodin_plo !==
        defaultValues.nodin_plos[defaultValues.nodin_plos.length - 1].nodin
    ) {
        return formatDateYMD(new Date(Date.now() + 86400000 * 14)) // 14 hari dalam milliseconds
    }

    // Jika nodin_plos tidak diubah, biarkan nilainya tetap
    return defaultValues.nodin_alert_at || null
}

export const transformPengadaanDataForSubmit = (previousData, data) => {
    const transformedData = {
        ...data,
        tanggal_spk: formatDateYMD(data.tanggal_spk),
        tanggal_acuan: formatDateYMD(data.tanggal_acuan),
        nilai_spk: data.nilai_spk ? parseFloat(data.nilai_spk) : null,
        anggaran: data.anggaran
            ? JSON.stringify({
                  amount: parseFloat(data.anggaran),
                  tanggal_permohonan: data.tanggal_permohonan_anggaran,
                  tanggal_terima: data.tanggal_terima_anggaran,
              })
            : null,
        hps: data.hps
            ? JSON.stringify({
                  amount: parseFloat(data.hps),
                  tanggal_permohonan: data.tanggal_permohonan_hps,
                  tanggal_terima: data.tanggal_terima_hps,
              })
            : null,
        tkdn_percentage: data.tkdn_percentage
            ? parseFloat(data.tkdn_percentage)
            : null,
        verification_alert_at: data.is_verification_complete
            ? null
            : previousData.verification_alert_at
              ? previousData.verification_alert_at
              : formatDateYMD(new Date(Date.now() + 86400000)), // Add 1 day in milliseconds
        nodin_users: emptyOrNullArray([
            ...(previousData.nodin_users ? previousData.nodin_users : []),
            ...(!previousData.nodin_users ||
            previousData.nodin_users.length === 0 ||
            previousData.nodin_users[previousData.nodin_users.length - 1]
                .nodin !== data.nodin_user
                ? data.nodin_user
                    ? [
                          {
                              nodin: data.nodin_user,
                              tanggal_nodin: data.tanggal_nodin_user,
                          },
                      ]
                    : []
                : []),
        ]),
        nodin_plos: emptyOrNullArray([
            ...(previousData.nodin_plos ? previousData.nodin_plos : []),
            ...(!previousData.nodin_plos ||
            previousData.nodin_plos.length === 0 ||
            previousData.nodin_plos[previousData.nodin_plos.length - 1]
                .nodin !== data.nodin_plo
                ? data.nodin_plo
                    ? [
                          {
                              nodin: data.nodin_plo,
                              tanggal_nodin: data.tanggal_nodin_plo,
                          },
                      ]
                    : []
                : []),
        ]),
        nodin_alert_at: data.is_verification_complete
            ? null
            : generateNodinAlert(previousData, data),
        pic_id: previousData.pic.id,
        pic: {
            id: previousData.pic.id,
            name: previousData.pic.name,
        },
    }

    return transformedData
}

const emptyOrNullArray = array => {
    if (array.length === 0) {
        return []
    } else {
        return array
    }
}

export function isProgressAbove(method, progress1, progress2) {
    if (!method || !progress1 || !progress2) {
        return false
    }

    const stages = progress[method]

    const index1 = stages.indexOf(progress1)
    const index2 = stages.indexOf(progress2)

    // Check if both progress steps exist in the stages
    if (index1 === -1 || index2 === -1) {
        return false
    }

    // Return true if progress1 is above progress2
    return index1 > index2
}

export function getLatestDate(dates) {
    if (!Array.isArray(dates) || dates.length === 0) {
        return null
    }

    const validDates = dates
        .map(date => new Date(date))
        .filter(date => !isNaN(date))

    if (validDates.length === 0) {
        return null
    }

    const latestDate = new Date(Math.max(...validDates))

    return latestDate
}

export const calculateMetrics = data => {
    const totalHPS = data.reduce((sum, item) => sum + item.hps?.amount || 0, 0)
    const totalSPK = data.reduce((sum, item) => sum + item.nilai_spk || 0, 0)
    const totalAnggaran = data.reduce(
        (sum, item) => sum + item.anggaran?.amount || 0,
        0,
    )
    const totalTKDN = data.reduce(
        (sum, item) => sum + (item.tkdn_percentage || 0),
        0,
    )
    const countTKDN = data.filter(item => item.tkdn_percentage !== null).length
    const totalCompletedWorks = data.filter(
        item => item.proses_pengadaan === 'Selesai',
    ).length

    // Count each proses_pengadaan
    const prosesPengadaanCounts = data.reduce((counts, item) => {
        const status = item.proses_pengadaan
        if (status !== 'Selesai') {
            if (status === null) {
                counts['Verifikasi Awal'] = (counts['Verifikasi Awal'] || 0) + 1
            } else {
                counts[status] = (counts[status] || 0) + 1
            }
        }
        return counts
    }, {})

    return {
        costEfficiencyHPS: totalHPS
            ? ((totalHPS - totalSPK) / totalHPS) * 100
            : 0,
        costEfficiencyAnggaran: totalAnggaran
            ? ((totalAnggaran - totalSPK) / totalAnggaran) * 100
            : 0,
        tkdn: countTKDN ? totalTKDN / countTKDN : 0,
        totalCompletedWorks,
        totalWorks: data.length,
        prosesPengadaanCounts,
    }
}
