import axios, { AxiosResponse } from 'axios'
import { useRef, useState } from 'react'
import fileDownload from 'js-file-download'
interface DownloadFileProps {
    readonly apiDefinition: () => Promise<AxiosResponse<Blob>>
}

interface DownloadedFileInfo {
    readonly download: () => Promise<void>
    readonly ref: React.MutableRefObject<HTMLAnchorElement | null>
    readonly url: string | undefined
}

export const useDownloadFile = ({
    apiDefinition,
}: DownloadFileProps): DownloadedFileInfo => {
    const ref = useRef<HTMLAnchorElement | null>(null)
    const [url, setFileUrl] = useState<string>()

    const download = async () => {
        try {
            axios
                .get('https://localhost:7220/api/Order/ExportToExcel', {
                    responseType: 'blob',
                })
                .then((res) => {
                    debugger
                    console.log(res)
                    fileDownload(res.data, 'orders.xlsx')
                })
                .catch((e) => {
                    console.log('AAA', e)
                })

            // const url = URL.createObjectURL(new Blob([data]))
            // setFileUrl(url)
            // ref.current?.click()
            // URL.revokeObjectURL(url)
        } catch (error) {
            console.log(error)
        }
    }

    return { download, ref, url }
}
