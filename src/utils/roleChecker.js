export const canCheckAllPengadaanData = user => {
    return user.role === 'admin' || user.role === 'team-admin'
}

export const canEditThisData = (user, data) => {
    if (user.role === 'admin') return true
    if (user.role === 'team-admin') return data.departemen === user.departemen
    // if (user.role === 'maker') return data.pic?.id === user?.id
    if (user.role === 'maker') return data.departemen === user.departemen
    return false
}

export const canManageProjects = user => {
    return user.departemen === 'bcp' || user.role === 'admin'
}

export const canSeeMonitoringDokumen = user => {
    return (
        user.role === 'admin' ||
        (user.departemen === 'psr' && user.tim === 'leg')
    )
}

export const canSeeMonitoringPekerjaan = user => {
    return user.role === 'admin' || user.tim === 'igm' || user.tim === 'bcg'
}

export const canSeeRekapPembayaran = user => {
    return (
        user.role === 'admin' ||
        (user.departemen === 'psr' && user.tim === 'psg')
    )
}
