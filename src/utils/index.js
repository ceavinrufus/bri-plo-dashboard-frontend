export function calculateDaysDifference(startDate, endDate) {
    // Get the time difference in milliseconds
    const timeDifference = Math.abs(
        new Date(endDate).getTime() - new Date(startDate).getTime(),
    )

    // Convert milliseconds to days
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    return differenceInDays
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
