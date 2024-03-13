import { TAnalyticsOrder } from 'types/TAnalytics'

export interface IOrderAnalyticsResponse {
    totalTodaySale: number
    result: Result[]
    resultPlace: Result[]
    resultYM: ResultYM[]
}

export type Result = {
    title: string
    nameVsCount: TAnalyticsOrder[]
}

export type ResultYM = {
    title: string
    color: string
    total: number
    amount: number
}
