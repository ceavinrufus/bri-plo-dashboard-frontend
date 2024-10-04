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

// Modified generateNodinAlert function
const generateNodinAlert = (defaultValues, data) => {
    // Jika nodin_plos belum ada, return null
    if (!data.nodin_plo) {
        return null
    }

    // Jika nodin_plos telah diubah dari nilai default-nya,
    // generate alert 14 hari setelah hari ini
    if (
        data.nodin_plo !==
        defaultValues.nodin_plos[defaultValues.nodin_plos.length - 1].nodin
    ) {
        return formatDate(new Date(Date.now() + 86400000 * 14)) // 14 hari dalam milliseconds
    }

    // Jika nodin_plos tidak diubah, biarkan nilainya tetap
    return defaultValues.nodin_alert_at || null
}

export const transformPengadaanDataForSubmit = (previousData, data) => {
    const transformedData = {
        ...data,
        tanggal_spk: formatDate(data.tanggal_spk),
        nilai_spk: data.nilai_spk ? parseInt(data.nilai_spk) : null,
        anggaran: data.anggaran ? parseInt(data.anggaran) : null,
        hps: data.hps ? parseInt(data.hps) : null,
        tkdn_percentage: data.tkdn_percentage
            ? parseInt(data.tkdn_percentage)
            : null,
        verification_alert_at: data.is_verification_complete
            ? null
            : previousData.verification_alert_at
              ? previousData.verification_alert_at
              : formatDate(new Date(Date.now() + 86400000)), // Add 1 day in milliseconds
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
    }

    return transformedData
}

const emptyOrNullArray = array => {
    if (array.length === 0) {
        return null
    } else {
        return array
    }
}
