import styled from '@emotion/styled'
import { alpha, Box, Card, Chip, Skeleton } from '@mui/material'
import BazaarImage from 'components/BazaarImage'
import { FlexBox } from 'components/flex-box'
import { H3, H4, H5, Span } from 'components/Typography'
import type { Identifier, XYCoord } from 'dnd-core'
import { calculateDiscount, currency } from 'lib'
import { FileType } from 'pages-sections/site-settings/BannerSlider'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { Clear } from '@mui/icons-material'
import { white } from 'theme/themeColors'
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    height: '100%',
}
const UploadImageBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '8px',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(white.main, 0.1),
}))

const StyledClear = styled(Clear)(() => ({
    top: 5,
    right: 5,
    fontSize: 14,
    cursor: 'pointer',
    position: 'absolute',
}))

export interface CardProps {
    id: any
    file: FileType
    index: number
    handleFileDelete: (file: FileType) => void
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const ProductCard: FC<CardProps> = ({
    id,
    file,
    index,
    moveCard,
    handleFileDelete,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     return
            // }

            // // Dragging upwards
            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //     return
            // }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            data-handler-id={handlerId}
        >
            <UploadImageBox
                key={index}
                sx={{
                    width: '100%',
                    height: '250px',
                }}
            >
                <BazaarImage
                    src={(file as unknown as any)?.preview}
                    width="100%"
                />
                <StyledClear onClick={() => handleFileDelete(file)} />
            </UploadImageBox>
        </div>
    )
}
