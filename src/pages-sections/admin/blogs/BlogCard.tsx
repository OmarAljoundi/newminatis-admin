import { Edit } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Backdrop,
    Box,
    Card,
    CircularProgress,
    Divider,
    IconButton,
} from '@mui/material'
import { H1, H3, H4, Paragraph, Span } from 'components/Typography'
import { FC } from 'react'
import { TBlogs } from 'types/TBlogs'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Link } from 'react-router-dom'
import useBlogService from 'hooks/useBlogService'

type Prop = {
    blog: TBlogs
    handleDeleteBlog: (id: number) => void
}

export const BlogCard: FC<Prop> = (props) => {
    return (
        <Card elevation={6} sx={{ height: '100%' }}>
            {props.blog.blogImages.length > 0 ? (
                <Box
                    component={'img'}
                    src={props.blog.blogImages[0].imageUrl}
                    sx={{ width: '400px', height: '400px' }}
                />
            ) : (
                <Box
                    sx={{
                        width: '400px',
                        height: '400px',
                        background: 'grey',
                    }}
                >
                    <H3 py={10} textAlign="center">
                        There are no images to display!
                    </H3>
                </Box>
            )}

            <Box display={'grid'} px={5} py={2} justifyItems="center">
                <H1>{props.blog.title}</H1>
                <Paragraph>{props.blog.description}</Paragraph>
            </Box>

            <Box display={'flex'} justifyContent="space-between" px={2} pb={2}>
                <Box display={'flex'} justifyContent="flex-start" columnGap={2}>
                    <Link to={`/blog/${props.blog.id}`}>
                        <IconButton
                            sx={{
                                background: 'rgba(0, 0, 0, 0.14)',
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </Link>
                    <IconButton
                        sx={{
                            background: 'rgba(0, 0, 0, 0.14)',
                        }}
                        onClick={() => props.handleDeleteBlog(props.blog.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Box
                    display={'flex'}
                    justifyContent="flex-end"
                    alignItems={'center'}
                >
                    <IconButton>
                        <FiberManualRecordIcon
                            sx={{
                                color: props.blog.published ? 'green' : 'gray',
                            }}
                        />
                    </IconButton>
                    <Span>{props.blog.published ? 'Published!' : 'Draft'}</Span>
                </Box>
            </Box>
        </Card>
    )
}
