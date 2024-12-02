export const canCheckAllPengadaanData = user => {
    return user.role === 'admin' || user.role === 'team-admin'
}

export const canEditThisData = (user, data) => {
    if (user.role === 'admin') return true
    if (user.role === 'team-admin') return data.departemen === user.departemen
    // if (user.role === 'maker') return data.pic.id === user.id
    if (user.role === 'maker') return data.departemen === user.departemen
    return false
}
