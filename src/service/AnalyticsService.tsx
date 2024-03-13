import { http } from './httpService'
import axios from 'axios'
import { TAnalyticsOrder } from 'types/TAnalytics'
import { IOrderAnalyticsResponse } from 'interface/IOrderAnalyticsResponse'

class AnalyticsService {
    orders() {
        return http(axios.create()).get<IOrderAnalyticsResponse>(
            `/Analytics/Orders`
        )
    }
}

export default new AnalyticsService()
