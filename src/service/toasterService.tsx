import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Flip } from 'react-toastify'
const notifySuccess = (message: string) =>
    toast.success(
        <div>
            <span style={{ display: 'block' }}>Success</span>
            <span style={{ display: 'block', fontSize: '0.75rem' }}>
                {message}
            </span>
        </div>,
        {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            transition: Flip,
            progressStyle: { backgroundColor: '#6fbda9' },
            theme: 'dark',
        }
    )

const notifyError = (message: string) =>
    toast.error(
        <div>
            <span style={{ display: 'block' }}>Error</span>
            <span style={{ display: 'block', fontSize: '0.75rem' }}>
                {message}
            </span>
        </div>,
        {
            position: 'top-right',
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            bodyClassName: 'PrimaryFont text-right pe-3',
            className: 'PrimaryFont text-right pe-3',
            transition: Flip,
            theme: 'dark',
        }
    )

export { ToastContainer, notifySuccess, notifyError }
