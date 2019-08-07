import {observable} from 'mobx'
import apiService from '../services/api'

export default class EventsStore {
    @observable entities = []
    @observable loading = false
    @observable openedEventId = null

    get size() {

    }

    getEventById(id) {
        return this.entities.find((event) => event.id === id)
    }

    set openedEventId (id) {
        this.openedEventId = id
    }

    fetchAll = async () => {
        this.loading = true

        this.entities = await apiService.fetchAllEvents()

        this.loading = false
    }
}

