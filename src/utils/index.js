export function calculateDaysDifference(date1, date2) {
    // Get the time difference in milliseconds
    const timeDifference = Math.abs(
        new Date(date2).getTime() - new Date(date1).getTime(),
    )

    // Convert milliseconds to days
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    return differenceInDays
}
