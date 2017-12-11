function spawnAlert(alert) {
    window.alert(`${alert.type}: ${alert.message}`)
}

export function alert({ message, type }) {
    if (typeof message !== 'string') {
        return Promise.reject(Error(`Error message must be a string. Received message:\n${message}`))
    }

    if (['success', 'info', 'warning', 'error'].indexOf(type) < 0) {
        return Promise.reject(Error(`Alert util must have a valid type. Received type: ${type}`))
    }

    spawnAlert({ message, type })

    return Promise.resolve()
}