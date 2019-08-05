import {observable} from 'mobx'
import apiService from '../services/api'

export default class EventsStore {
    @observable entities = []
    @observable loading = false

    get size() {

    }

    fetchAll = async () => {
        this.loading = true

        this.entities = await apiService.fetchAllEvents()

        this.loading = false
    }
}

