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

export const formatDateMY = dateString => {
    if (!dateString) return null

    const date = new Date(dateString)

    const month = date.toLocaleString('default', { month: 'long' }) // Full month name
    const year = date.getFullYear()

    return `${month} ${year}`
}

export const formatDateWithWords = dateString => {
    if (!dateString) return null

    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = date.toLocaleString('default', { month: 'long' })
    const year = String(date.getFullYear())
    return `${day} ${month} ${year}`
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
        pengadaan_log: (() => {
            const newMethod = data.metode
            const oldMethod = previousData.metode
            const newStages =
                newMethod && progress[newMethod] ? progress[newMethod] : []

            if (newMethod !== oldMethod) {
                // Method has changed, map stages with conditional merging
                return newStages.map(stage => {
                    // Find the matching stage from old stages
                    const oldStageData = previousData.pengadaan_log?.find(
                        log => log.stage === stage,
                    )
                    return oldStageData
                        ? { ...oldStageData } // Retain old data
                        : { stage, tanggal: undefined, document: undefined } // New data
                })
            } else {
                // Method has not changed, retain existing log
                return previousData.pengadaan_log || []
            }
        })(),
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
        verification_alert_at: data.verification_completed_at
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
        nodin_ip_pengadaans: emptyOrNullArray([
            ...(previousData.nodin_ip_pengadaans
                ? previousData.nodin_ip_pengadaans
                : []),
            ...(!previousData.nodin_ip_pengadaans ||
            previousData.nodin_ip_pengadaans.length === 0 ||
            previousData.nodin_ip_pengadaans[
                previousData.nodin_ip_pengadaans.length - 1
            ].nodin !== data.nodin_ip_pengadaan
                ? data.nodin_ip_pengadaan
                    ? [
                          {
                              nodin: data.nodin_ip_pengadaan,
                              tanggal_nodin: data.tanggal_nodin_ip_pengadaan,
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
        nodin_alert_at: data.verification_completed_at
            ? null
            : generateNodinAlert(previousData, data),
        pic_id: previousData.pic?.id,
        pic: {
            id: previousData.pic?.id,
            name: previousData.pic?.name,
        },
    }

    return transformedData
}

export const transformDokumenSpkDataForSubmit = (previousData, data) => {
    const transformedData = {
        ...data,
        tanggal_spk_diterima: formatDateYMD(data.tanggal_spk_diterima),
        spk: data.nilai_spk
            ? JSON.stringify({
                  rate: parseFloat(data.spk_rate),
                  amount: parseFloat(data.nilai_spk),
                  currency: data.spk_currency,
              })
            : null,
        tanggal_spk: formatDateYMD(data.tanggal_spk),
        pic_legal_id: previousData.pic_legal
            ? previousData.pic_legal.id
            : data.pic_legal?.id,
        pic_legal: {
            id: previousData.pic_legal
                ? previousData.pic_legal.id
                : data.pic_legal?.id,
            name: previousData.pic_legal
                ? previousData.pic_legal.name
                : data.pic_legal?.name,
        },
        pic_pengadaan_id: data.pic_pengadaan
            ? JSON.parse(data.pic_pengadaan)?.id
            : previousData.pic_pengadaan?.id,
        pic_pengadaan: data.pic_pengadaan || previousData.pic_pengadaan,
        pelaksana_pekerjaan: JSON.stringify({
            name: data.pelaksana_pekerjaan || '',
            address: data.alamat_pelaksana_pekerjaan || '',
            phone_number: data.no_telpon_pelaksana_pekerjaan || '',
        }),
    }

    return transformedData
}

export const transformDokumenJaminanDataForSubmit = (previousData, data) => {
    const transformedData = {
        ...data,
        tanggal_diterima: formatDateYMD(data.tanggal_diterima),
        nilai: data.nilai_amount
            ? JSON.stringify({
                  rate: parseFloat(data.nilai_rate),
                  amount: parseFloat(data.nilai_amount),
                  currency: data.nilai_currency,
              })
            : null,
        waktu_mulai: formatDateYMD(data.waktu_mulai),
        waktu_berakhir: formatDateYMD(data.waktu_berakhir),
    }

    return transformedData
}

export const transformDokumenPerjanjianDataForSubmit = (previousData, data) => {
    const transformedData = {
        ...data,
        tanggal_permohonan_diterima: formatDateYMD(
            data.tanggal_permohonan_diterima,
        ),
        spk: data.nilai_spk
            ? JSON.stringify({
                  rate: parseFloat(data.spk_rate),
                  amount: parseFloat(data.nilai_spk),
                  currency: data.spk_currency,
              })
            : null,
        tanggal_spk: formatDateYMD(data.tanggal_spk),
        pic_legal_id: previousData.pic_legal?.id,
        pic_legal: {
            id: previousData.pic_legal?.id,
            name: previousData.pic_legal?.name,
        },
        pic_pengadaan_id: data.pic_pengadaan
            ? JSON.parse(data.pic_pengadaan)?.id
            : previousData.pic_pengadaan?.id,
        pic_pengadaan: data.pic_pengadaan || previousData.pic_pengadaan,
        pelaksana_pekerjaan: JSON.stringify({
            name: data.pelaksana_pekerjaan || '',
            address: data.alamat_pelaksana_pekerjaan || '',
            phone_number: data.no_telpon_pelaksana_pekerjaan || '',
        }),
        tanggal_kontrak: formatDateYMD(data.tanggal_kontrak),
    }

    return transformedData
}

export const transformRekapPembayaranSubmit = (previousData, data) => {
    const transformedData = {
        ...data,
        spk: data.nilai_spk
            ? JSON.stringify({
                  rate: parseFloat(data.spk_rate),
                  amount: parseFloat(data.nilai_spk),
                  currency: data.spk_currency,
              })
            : null,
        invoice: data.nilai_invoice
            ? JSON.stringify({
                  rate: parseFloat(data.invoice_rate),
                  amount: parseFloat(data.nilai_invoice),
                  currency: data.invoice_currency,
              })
            : null,
        tanggal_spk: formatDateYMD(data.tanggal_spk),
        pic_pc_id: previousData.pic_pc?.id,
        pic_pc: {
            id: previousData.pic_pc?.id,
            name: previousData.pic_pc?.name,
        },
        pic_pay_id: data.pic_pay_id,
        pic_pay: data.pic_pay,
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

export const calculateJatuhTempoMetrics = (
    pekerjaanData,
    calculateWorkingDays,
) => {
    const today = new Date().toISOString().split('T')[0]

    const metrics = {
        selesai: 0,
        overdue: 0,
        under45Days: 0,
        overOrEqual45Days: 0,
        not_started: 0,
    }

    pekerjaanData.forEach(pekerjaan => {
        if (pekerjaan.is_pekerjaan_selesai) {
            metrics.selesai += 1
            return
        }

        const jatuhTempos = pekerjaan.jatuh_tempos || []
        if (jatuhTempos.length === 0) {
            metrics.not_started += 1
            return
        }

        const lastJatuhTempo = jatuhTempos[jatuhTempos.length - 1]
        const diffWithToday = calculateWorkingDays(
            today,
            lastJatuhTempo.tanggal_akhir,
        )

        if (diffWithToday < 0) {
            metrics.overdue += 1
        } else if (diffWithToday < 45) {
            metrics.under45Days += 1
        } else {
            metrics.overOrEqual45Days += 1
        }
    })

    return {
        ...metrics,
        totalWorks:
            pekerjaanData.length - metrics.selesai - metrics.not_started,
    }
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
