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
import { TBlogs } from 'types/TBlogs'
import BlogForm from 'pages-sections/admin/blogs/BlogForm'
import useBlogService from 'hooks/useBlogService'
import { IBlogResponse } from 'interface/IBlogResponse'
import { notifyError, notifySuccess } from 'service/toasterService'
import { useNavigate } from 'react-router-dom'

// =============================================================================
CreateBlog.getLayout = function getLayout(page: ReactElement) {
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
export default function CreateBlog() {
    const [selectedOption, setSelectedOption] = useState(0)
    const handleOptionClick = (_, value: number) => setSelectedOption(value)
    const navigate = useNavigate()
    const { BlogLoader, onCreateBlog } = useBlogService()

    const INITIAL_VALUES: TBlogs = {
        createdDate: null,
        description: '',
        id: 0,
        published: true,
        title: '',
        blogImages: [],
        blogSlides: [],
    }

    useEffect(() => {}, [])

    const handleFormSubmit = async (e: TBlogs) => {
        var Blog: TBlogs = {
            id: 0,
            title: e.title,
            published: true,
            description: e.description,
            createdDate: null,
        }
        const result = (await onCreateBlog(Blog)) as IBlogResponse
        if (result.success) {
            notifySuccess('Blog Published Successfully')
            navigate({
                pathname: `/blog/${result.blog.id}`,
            })
        } else {
            notifyError(result.message)
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
                    disabled
                    sx={{
                        fontSize: '20px',
                    }}
                />
                <Tab
                    className="inner-tab"
                    label={'Slides'}
                    disabled
                    sx={{
                        fontSize: '20px',
                    }}
                />
            </StyledTabs>
            {selectedOption === 0 && (
                <BlogForm
                    initialValues={INITIAL_VALUES}
                    handleFormSubmit={handleFormSubmit}
                />
            )}
        </Box>
    )
}
