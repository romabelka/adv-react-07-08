import {observable, action} from 'mobx'
import apiService from '../services/api'

export default class EventsStore {
    @observable entities = []
    @observable loading = false

    @action setLoading = loading => this.loading = loading
    @action setEntities = entities => this.entities = entities

    getById = id => this.entities.find(event => event.id === id)

    get size() {

    }

    fetchAll = async () => {
        this.setLoading(true)

        this.setEntities(await apiService.fetchAllEvents())

        this.setLoading(false)
    }
}

