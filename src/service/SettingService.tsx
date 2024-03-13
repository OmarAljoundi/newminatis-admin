import { http, httpFormData } from './httpService'
import axios from 'axios'
import { IBannerSetting } from 'interface/IBannerSetting'
import { TProductUpdateRequest } from 'types/TUpdateProductRequest'
import { IBaseResponse } from 'interface/IBaseResponse'
import { TContent } from 'types/TUsefulLinks'
import { IContentResponse } from 'interface/IContentResponse'

class SettingService {
    getBannerSetting() {
        return http(axios.create()).get<IBannerSetting>(`/Setting/Banner`)
    }

    postBannerSetting(data: FormData) {
        return httpFormData(axios.create()).post<IBannerSetting>(
            `/Setting/Banner`,
            data
        )
    }
    updateProductSale(request: TProductUpdateRequest) {
        return http(axios.create()).put<IBaseResponse>(
            `/Setting/UpdateProducts`,
            request
        )
    }

    readJson() {
        return http(axios.create()).get<IContentResponse>(`/Setting/Read`)
    }
    writeJson(request: TContent) {
        return http(axios.create()).post<IContentResponse>(
            `/Setting/Write`,
            request
        )
    }
}

export default new SettingService()
