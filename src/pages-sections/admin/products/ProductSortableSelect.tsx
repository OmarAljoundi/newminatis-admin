import { FormikProps } from 'formik'
import React, { FC, MouseEventHandler, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Select, {
    components,
    MultiValueGenericProps,
    MultiValueProps,
    OnChangeValue,
    Props,
} from 'react-select'
import {
    SortableContainer,
    SortableContainerProps,
    SortableElement,
    SortEndHandler,
    SortableHandle,
} from 'react-sortable-hoc'
import { TProduct } from 'types/TProduct'

function arrayMove<T>(array: readonly T[], from: number, to: number) {
    const slicedArray = array.slice()
    slicedArray.splice(
        to < 0 ? array.length + to : to,
        0,
        slicedArray.splice(from, 1)[0]
    )
    return slicedArray
}

const SortableMultiValue = SortableElement(
    (props: MultiValueProps<TProduct>) => {
        // this prevents the menu from being opened/closed when the user clicks
        // on a value to begin dragging it. ideally, detecting a click (instead of
        // a drag) would still focus the control and toggle the menu, but that
        // requires some magic with refs that are out of scope for this example
        const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
            e.preventDefault()
            e.stopPropagation()
        }
        const innerProps = { ...props.innerProps, onMouseDown }
        return <components.MultiValue {...props} innerProps={innerProps} />
    }
)

const SortableMultiValueLabel = SortableHandle(
    (props: MultiValueGenericProps) => <components.MultiValueLabel {...props} />
)

const SortableSelect = SortableContainer(Select) as React.ComponentClass<
    Props<TProduct, true> & SortableContainerProps
>

type MultiSelectSortProp = {
    formik: FormikProps<TProduct>
    products: TProduct[]
}
const MultiSelectSort: FC<MultiSelectSortProp> = ({ formik, products }) => {
    const [selected, setSelected] = React.useState<readonly TProduct[]>()
    const { id } = useParams()

    const onChange = (selectedOptions: OnChangeValue<TProduct, true>) =>
        setSelected(selectedOptions)

    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex)
        setSelected(newValue)
    }

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            relatedProducts: selected?.map((i) => i.id).join(','),
        })
    }, [selected])

    useEffect(() => {
        var relatedItems: TProduct[] = []
        if (formik.values?.relatedProducts != '') {
            formik.values?.relatedProducts?.split(',').map((i, index) => {
                relatedItems[index] = products.find(
                    (x) => x.id == (i as unknown as number)
                )
            })
        }
        setSelected(relatedItems)
    }, [])

    return (
        <SortableSelect
            useDragHandle
            axis="xy"
            onSortEnd={onSortEnd}
            distance={4}
            getHelperDimensions={({ node }) => node.getBoundingClientRect()}
            isMulti
            options={products.filter((x) => x.id != (id as unknown as number))}
            getOptionLabel={(x) => x.friendlyName}
            getOptionValue={(x) => x.id.toString()}
            placeholder="Related Items"
            value={selected}
            onChange={onChange}
            components={{
                // @ts-ignore
                MultiValue: SortableMultiValue,
                // @ts-ignore
                MultiValueLabel: SortableMultiValueLabel,
            }}
            closeMenuOnSelect={false}
        />
    )
}

export default MultiSelectSort
