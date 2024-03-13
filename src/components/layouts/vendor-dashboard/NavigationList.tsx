import duotone from 'components/icons/duotone'

export const navigations = [
    { type: 'label', label: 'Admin' },
    { name: 'Dashboard', icon: duotone.Dashboard, path: '/' },

    {
        name: 'Products',
        icon: duotone.Products,
        children: [
            { name: 'Product List', path: '/product-list' },
            { name: 'Create Product', path: '/product' },
            { name: 'Category', path: '/categories' },
            { name: 'Vouchers', path: '/voucher-list' },
            { name: 'Review', path: '/review-list' },
        ],
    },
    {
        name: 'Blogs & Articles',
        icon: duotone.BookIcon,
        children: [
            { name: 'Articles', path: '/articles' },
            { name: 'Blogs', path: '/blog-list' },
            { name: 'Create New Blog', path: '/blog' },
        ],
    },

    {
        name: 'Order List',
        icon: duotone.Order,
        path: '/orders',
    },

    { name: 'Customers', icon: duotone.Customers, path: '/customers' },

    {
        name: 'Site Setting',
        icon: duotone.SiteSetting,
        path: '/site-settings',
    },
    {
        name: ' Useful Links',
        icon: duotone.ElementHub,
        path: '/useful-links',
    },
    {
        name: 'Logout',
        icon: duotone.Session,
        path: '/logout',
        type: 'logout_action',
    },
]
