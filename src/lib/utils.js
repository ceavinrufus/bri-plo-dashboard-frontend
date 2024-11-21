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
        spk_investasi: data.nilai_spk_investasi
            ? JSON.stringify({
                  rate: parseFloat(data.spk_rate),
                  amount: parseFloat(data.nilai_spk_investasi),
                  currency: data.spk_currency,
              })
            : null,
        spk_eksploitasi: data.nilai_spk_eksploitasi
            ? JSON.stringify({
                  rate: parseFloat(data.spk_rate),
                  amount: parseFloat(data.nilai_spk_eksploitasi),
                  currency: data.spk_currency,
              })
            : null,
        anggaran_investasi: data.anggaran_investasi
            ? JSON.stringify({
                  rate: parseFloat(data.anggaran_rate),
                  amount: parseFloat(data.anggaran_investasi),
                  currency: data.anggaran_currency,
              })
            : null,
        anggaran_eksploitasi: data.anggaran_eksploitasi
            ? JSON.stringify({
                  rate: parseFloat(data.anggaran_rate),
                  amount: parseFloat(data.anggaran_eksploitasi),
                  currency: data.anggaran_currency,
              })
            : null,
        hps: data.hps
            ? JSON.stringify({
                  rate: parseFloat(data.hps_rate),
                  amount: parseFloat(data.hps),
                  currency: data.hps_currency,
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
    const totalHPS = data.reduce(
        (sum, item) => sum + item.hps?.amount * item.hps?.rate || 0,
        0,
    )
    const totalSPKInvestasi = data.reduce(
        (sum, item) =>
            sum + item.spk_investasi?.amount * item.spk_investasi?.rate || 0,
        0,
    )
    const totalSPKEksploitasi = data.reduce(
        (sum, item) =>
            sum + item.spk_eksploitasi?.amount * item.spk_eksploitasi?.rate ||
            0,
        0,
    )
    const totalSPK = totalSPKInvestasi + totalSPKEksploitasi
    const totalAnggaranInvestasi = data.reduce(
        (sum, item) =>
            sum +
                item.anggaran_investasi?.amount *
                    item.anggaran_investasi?.rate || 0,
        0,
    )
    const totalAnggaranEskploitasi = data.reduce(
        (sum, item) =>
            sum +
                item.anggaran_eksploitasi?.amount *
                    item.anggaran_eksploitasi?.rate || 0,
        0,
    )
    const totalAnggaran = totalAnggaranInvestasi + totalAnggaranEskploitasi
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
