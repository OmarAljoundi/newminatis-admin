import { useState } from 'react'
import SettingService from 'service/SettingService'
import { TBannerSetting } from 'types/TBannerSetting'
import { TContent } from 'types/TUsefulLinks'

const useSettingService = () => {
    const [SettingLoad, SetSettingLoad] = useState(false)

    const onGetBanners = () => {
        SetSettingLoad(true)

        return new Promise((resolve, reject) => {
            SettingService.getBannerSetting()
                .then((res) => {
                    SetSettingLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    SetSettingLoad(false)
                    reject(err)
                })
        })
    }

    const onPostBanners = (body: TBannerSetting[]) => {
        SetSettingLoad(true)

        const formData = new FormData()

        body?.map((item, index) => {
            formData.append(`BannerSettings[${index}].Id`, item.id.toString())
            formData.append(
                `BannerSettings[${index}].Action`,
                item.action.toString()
            )
            formData.append(
                `BannerSettings[${index}].ActionUrl`,
                item.actionUrl.toString()
            )
            formData.append(
                `BannerSettings[${index}].Text`,
                item.text.toString()
            )
            if (item.createdDate) {
                formData.append(
                    `BannerSettings[${index}].CreatedDate`,
                    item.createdDate.toString()
                )
            }

            formData.append(`BannerSettings[${index}].File`, item.file)
        })

        return new Promise((resolve, reject) => {
            SettingService.postBannerSetting(formData)
                .then((res) => {
                    SetSettingLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    SetSettingLoad(false)
                    reject(err)
                })
        })
    }

    const onWriteJson = (body: TContent) => {
        SetSettingLoad(true)

        return new Promise((resolve, reject) => {
            SettingService.writeJson(body)
                .then((res) => {
                    SetSettingLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    SetSettingLoad(false)
                    reject(err)
                })
        })
    }

    const onReadJson = () => {
        SetSettingLoad(true)

        return new Promise((resolve, reject) => {
            SettingService.readJson()
                .then((res) => {
                    SetSettingLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    SetSettingLoad(false)
                    reject(err)
                })
        })
    }

    return {
        onGetBanners,
        onPostBanners,
        SettingLoad,
        onWriteJson,
        onReadJson,
    }
}

export default useSettingService
