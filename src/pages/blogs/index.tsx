import { ReactElement, useEffect } from 'react'
import { Backdrop, Box, CircularProgress, Grid } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useQuery } from 'react-query'
import { SearchQuery } from 'types/TSearchQuery'
import useBlogService from 'hooks/useBlogService'
import { IBlogResponse } from 'interface/IBlogResponse'
import { BlogCard } from 'pages-sections/admin/blogs/BlogCard'
import { AxiosResponse } from 'axios'
import { notifyError, notifySuccess } from 'service/toasterService'

BlogList.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default function BlogList() {
    const { BlogLoader, onSearchBlog, onDeleteBlog } = useBlogService()

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        const SearchQuery: SearchQuery = {
            FilterByOptions: [],
            OrderByOptions: [],
            PageIndex: 0,
            PageSize: 0,
        }
        return (await onSearchBlog(SearchQuery)) as IBlogResponse
    }
    const { data: _response, refetch } = useQuery([], () => fetchBlogs(), {
        refetchOnWindowFocus: false,
    })

    const handleDeleteBlog = async (id: number) => {
        const result = (await onDeleteBlog(id)) as AxiosResponse<any>
        if (result.status == 200) {
            notifySuccess('Deleted Successfully')
            refetch()
        } else {
            notifyError('Something went wrong' + result.data)
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
            <H3 mb={2}>Blog List</H3>
            <Grid container item spacing={3}>
                {_response?.blogs?.map((item) => (
                    <Grid xs={4} item>
                        <BlogCard
                            blog={item}
                            handleDeleteBlog={handleDeleteBlog}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
