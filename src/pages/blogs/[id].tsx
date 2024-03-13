import { ReactElement, useEffect, useState } from 'react'
import {
    Backdrop,
    Box,
    CircularProgress,
    styled,
    Tab,
    Tabs,
} from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { TBlogImages, TBlogs, TBlogSlides } from 'types/TBlogs'
import BlogForm from 'pages-sections/admin/blogs/BlogForm'
import { useParams } from 'react-router-dom'
import { IBlogResponse } from 'interface/IBlogResponse'
import useBlogService from 'hooks/useBlogService'
import { isDuplicateBlogsOrder, isDuplicateOrder } from 'helpers/Extensions'
import { notifyError, notifySuccess } from 'service/toasterService'
import { FileType } from 'pages-sections/site-settings/BannerSlider'
import BlogDropZoneImages from 'pages-sections/admin/blogs/BlogDropZoneImages'
import BlogDropZoneSlides from 'pages-sections/admin/blogs/BlogDropZoneSlides'

// =============================================================================
EditBlog.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================
const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 0,
    marginTop: 80,
    marginBottom: 24,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
    '& .inner-tab': {
        minHeight: 40,
        fontWeight: 600,
        textTransform: 'capitalize',
    },
}))
export default function EditBlog() {
    const [INITIAL_VALUES, SETINITIAL_VALUES] = useState<TBlogs>(null)
    const [imageFiles, setImageFiles] = useState<FileType[]>([])
    const [slideFiles, setSlideFiles] = useState<FileType[]>([])
    const { id } = useParams()
    const {
        GetById,
        BlogLoader,
        onCreateBlog,
        onUploadImages,
        onUploadSlides,
    } = useBlogService()

    const [selectedOption, setSelectedOption] = useState(0)
    const handleOptionClick = (_, value: number) => setSelectedOption(value)

    const fetchBlog = async () => {
        const result = (await GetById(id as unknown as number)) as IBlogResponse
        if (result.success) {
            SETINITIAL_VALUES(result.blog)
        }
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    const executeLongRunningtask = async (file: TBlogSlides | TBlogImages) => {
        const name = file.imageUrl.split('/')[4]
        return new Promise((resolve, reject) => {
            fetch(file.imageUrl, {
                headers: { 'Cache-Control': 'no-cache' },
                method: 'GET',
            })
                .then((res) => res.blob())
                .then(
                    (blob) =>
                        new File([blob], `${name}`, {
                            type: blob.type,
                        })
                )
                .then((file) => {
                    resolve(
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )
                })
        })
    }

    const executeAllLongRunningTasksForImages = async () => {
        if (
            INITIAL_VALUES?.blogImages &&
            INITIAL_VALUES?.blogImages.length > 0
        ) {
            return await Promise.all(
                INITIAL_VALUES?.blogImages?.map(executeLongRunningtask)
            )
        }
    }

    const executeAllLongRunningTasksForSlides = async () => {
        if (INITIAL_VALUES?.blogSlides && INITIAL_VALUES?.blogSlides.length > 0)
            return await Promise.all(
                INITIAL_VALUES?.blogSlides?.map(executeLongRunningtask)
            )
    }

    useEffect(() => {
        if (INITIAL_VALUES) {
            executeAllLongRunningTasksForImages().then((res) =>
                setImageFiles(res as FileType[])
            )
            executeAllLongRunningTasksForSlides().then((res) =>
                setSlideFiles(res as FileType[])
            )
        }
    }, [INITIAL_VALUES])

    const handleFormSubmit = async (e: TBlogs) => {
        var Blog: TBlogs = {
            id: e.id,
            createdDate: e.createdDate,
            published: e.published,
            description: e.description,
            title: e.title,
        }
        const result = (await onCreateBlog(Blog)) as IBlogResponse
        if (result.success) {
            delete result.blog.blogImages
            delete result.blog.blogSlides

            SETINITIAL_VALUES((prevState) => ({
                blogImages: prevState.blogImages,
                blogSlides: prevState.blogSlides,

                ...result.blog,
            }))

            notifySuccess('Product Updated Successfully')
        }
    }

    const handleUploadImage = async (e: TBlogs) => {
        if (!isDuplicateBlogsOrder(e.blogImages)) {
            let formData = new FormData()
            e.blogImages?.map((item, index) => {
                formData.append('BlogId', INITIAL_VALUES?.id.toString())
                formData.append(`BlogImages[${index}].Id`, '0')
                formData.append(`BlogImages[${index}].File`, item.file)
                formData.append(
                    `BlogImages[${index}].SortOrder`,
                    item.sortOrder.toString()
                )
                formData.append(
                    `ProductImages[${index}].BlogId`,
                    item.blogId.toString()
                )
            })
            const result = (await onUploadImages(formData)) as IBlogResponse
            if (result.success) {
                let _blog = { ...INITIAL_VALUES }
                delete _blog.blogImages
                SETINITIAL_VALUES((prevState) => ({
                    blogImages: result.blog.blogImages,
                    ..._blog,
                }))
                notifySuccess('Blog Images Uploaded Successfully')
            } else {
                notifyError(`Something went wrong ${result.message}`)
            }
        } else {
            notifyError('Some Images Order are duplicated ')
        }
    }

    const handleUploadSlides = async (e: TBlogs) => {
        if (!isDuplicateBlogsOrder(e.blogSlides)) {
            let formData = new FormData()
            e.blogSlides?.map((item, index) => {
                formData.append('BlogId', INITIAL_VALUES?.id.toString())
                formData.append(`BlogSlides[${index}].Id`, '0')
                formData.append(`BlogSlides[${index}].File`, item.file)
                formData.append(
                    `BlogSlides[${index}].SortOrder`,
                    item.sortOrder.toString()
                )
                formData.append(
                    `BlogSlides[${index}].BlogId`,
                    item.blogId.toString()
                )
                formData.append(
                    `BlogSlides[${index}].Text`,
                    item.text.toString()
                )
            })
            const result = (await onUploadSlides(formData)) as IBlogResponse
            if (result.success) {
                let _blog = { ...INITIAL_VALUES }
                delete _blog.blogSlides
                SETINITIAL_VALUES((prevState) => ({
                    blogSlides: result.blog.blogSlides,
                    ..._blog,
                }))
                notifySuccess('Blog Slides Uploaded Successfully')
            } else {
                notifyError(`Something went wrong ${result.message}`)
            }
        } else {
            notifyError('Some Images Order are duplicated ')
        }
    }

    return (
        <Box py={4}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={BlogLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <StyledTabs
                textColor="primary"
                value={selectedOption}
                indicatorColor="primary"
                onChange={handleOptionClick}
                variant="fullWidth"
            >
                <Tab
                    className="inner-tab"
                    label={'Blog Details'}
                    sx={{
                        fontSize: '20px',
                    }}
                />

                <Tab
                    className="inner-tab"
                    label={'Images'}
                    sx={{
                        fontSize: '20px',
                    }}
                />
                <Tab
                    className="inner-tab"
                    label={'Slides'}
                    sx={{
                        fontSize: '20px',
                    }}
                />
            </StyledTabs>
            {selectedOption === 0 && INITIAL_VALUES && (
                <BlogForm
                    initialValues={INITIAL_VALUES}
                    handleFormSubmit={handleFormSubmit}
                />
            )}
            {selectedOption === 1 && INITIAL_VALUES && (
                <BlogDropZoneImages
                    handleFormSubmit={handleUploadImage}
                    initalFiles={imageFiles}
                    initialValues={INITIAL_VALUES}
                />
            )}
            {selectedOption === 2 && INITIAL_VALUES && (
                <BlogDropZoneSlides
                    handleFormSubmit={handleUploadSlides}
                    initalFiles={slideFiles}
                    initialValues={INITIAL_VALUES}
                />
            )}
        </Box>
    )
}
