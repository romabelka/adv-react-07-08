import {observable} from 'mobx'
import apiService from '../services/api'

export default class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    signIn = async () => {
        this.user = await apiService.signIn(this.email, this.password)
        this.email = ''
        this.password = ''
    }
}
