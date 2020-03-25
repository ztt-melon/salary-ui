import Constants from './constants'

export default class PermissionButton {
    static store(value) {
        sessionStorage.setItem(Constants.PERMISSIONS, JSON.stringify(value))
    }

    static get(route) {
        try {
            const permissions = JSON.parse(sessionStorage.getItem(Constants.PERMISSIONS))
            const data = permissions[route]
            if (!data) {
                window.location.href =Constants.projectName+ '/login'
            }
            return data
        } catch (e) {
            window.location.href = Constants.projectName+'/login'
        }

    }
}