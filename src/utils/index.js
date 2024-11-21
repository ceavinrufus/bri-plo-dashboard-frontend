export function calculateDaysDifference(startDate, endDate) {
    // Get the time difference in milliseconds
    const timeDifference = Math.abs(
        new Date(endDate).getTime() - new Date(startDate).getTime(),
    )

    // Convert milliseconds to days
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    return differenceInDays
}

export const calculateWorkingDaysDifference = (startDate, endDate) => {
    let count = 0
    let currentDate = new Date(startDate)
    const end = new Date(endDate)

    while (currentDate < end) {
        const dayOfWeek = currentDate.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // Skip weekends
            count++
        }
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return count
}

export function convertToCurrencyString(amount, currency) {
    return amount && currency
        ? amount.toLocaleString('id-ID', {
              style: 'currency',
              currency: currency,
              minimumFractionDigits: 0, // No decimals
              maximumFractionDigits: 0,
          })
        : ''
}
