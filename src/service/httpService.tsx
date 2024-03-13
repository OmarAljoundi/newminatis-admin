import {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import Cookies from 'js-cookie'
import { ref } from 'theme/MuiTheme'

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    ref.current?.continuousStart()
    const token = Cookies.get('token')
    const url =
        process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_URL_DEVELOPMENT
            : process.env.REACT_APP_URL_PRODUCTION
    return {
        ...config,
        baseURL: `${url}`,
        timeout: 500000,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }
}
const onRequestBlob = (config: AxiosRequestConfig): AxiosRequestConfig => {
    ref.current?.continuousStart()
    const token = Cookies.get('token')
    const url =
        process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_URL_DEVELOPMENT
            : process.env.REACT_APP_URL_PRODUCTION
    return {
        ...config,
        baseURL: `${url}`,
        timeout: 500000,
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }
}

const onRequestFormData = (config: AxiosRequestConfig): AxiosRequestConfig => {
    ref.current?.continuousStart()
    const token = Cookies.get('token')
    const url =
        process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_URL_DEVELOPMENT
            : process.env.REACT_APP_URL_PRODUCTION
    return {
        ...config,
        baseURL: `${url}`,
        timeout: 500000,
        headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    }
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    ref.current?.continuousStart()
    return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    ref.current?.complete()
    return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    ref.current?.complete()
    return Promise.reject(error)
}

export function http(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)

    return axiosInstance
}
export function httpBlob(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequestBlob, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)

    return axiosInstance
}

export function httpFormData(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequestFormData, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)

    return axiosInstance
}
