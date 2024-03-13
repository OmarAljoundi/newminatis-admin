import { TBlogImages, TBlogSlides } from 'types/TBlogs'
import { eOrderStatus } from 'types/TOrder'
import { eColor, TProduct } from 'types/TProduct'
import { TProductImages } from 'types/TProductImages'
import { TProductVariant } from 'types/TProductVariant'
import { OrderByOptions } from 'types/TSearchQuery'

export const findDuplicates = (arr: TProductVariant[]) => {
    let sorted_arr = arr.slice().sort()

    let results = []
    let words = []

    sorted_arr.map((item) => {
        if (!words.includes(item.label)) {
            results.push(item)
            words.push(item.label)
        }
    })

    return results
}

export const findMatchingLabel = (label: string, arr: TProductVariant[]) => {
    let sorted_arr = arr.slice().sort()
    const _label = arr.find((x) => x.label == label)

    let results = []
    if (_label) {
        sorted_arr.map((item) => {
            if (_label.label === item.label) {
                results.push(item)
            }
        })
    }

    return results
}

export const variantsLookUp = ['Size']

export const buildOrderBy = (order: 'asc' | 'desc', orderBy: string) => {
    var OrderByOptions: OrderByOptions[] = []
    if (orderBy != 'noOrderBy') {
        var eOrder = order == 'asc' ? 1 : 2

        OrderByOptions.push({
            MemberName: orderBy,
            SortOrder: eOrder,
        })
    }
    return OrderByOptions
}

export const MapColors = (n: number) => {
    switch (n) {
        case eColor.Black as Number:
            return 'Black'
        case eColor.Gray as Number:
            return 'Gray'
        case eColor.White as Number:
            return 'White'
        case eColor.Beige as Number:
            return 'Beige'
    }
}

export const MapStatus = (n: number) => {
    switch (n) {
        case eOrderStatus.Processing as Number:
            return 'Processing'
        case eOrderStatus.Delieverd as Number:
            return 'Delieverd'
        case eOrderStatus.Canceled as Number:
            return 'Canceled'
        case eOrderStatus.UnderDelievery as Number:
            return 'Under Delievery'
        default:
            return 'Unknown Status'
    }
}

export const convertArrayToString = (value: string | string[]) => {
    if (Array.isArray(value)) {
        if (value.length > 0) {
            return (value as string[]).join(',')
        }
        return ''
    }
    return value
}

export const convertStringToArray = (value: string | string[]) => {
    if (Array.isArray(value)) {
        return value
    }
    if (value != null && value != '') {
        return (value as string).split(',')
    }
    return []
}

export const isDuplicateOrder = (values: TProductImages[]) => {
    var valueArr = values.map(function (item) {
        return item.imageOrder
    })

    var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx
    })

    return isDuplicate
}

export const isDuplicateBlogsOrder = (
    values: TBlogImages[] | TBlogSlides[]
) => {
    var valueArr = values.map(function (item) {
        return item.sortOrder
    })

    var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx
    })

    return isDuplicate
}
