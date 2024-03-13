import { useCallback, useState, FC } from 'react'
import { Button, Card, CardProps, Box, styled, TextField } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { H1, H6 } from 'components/Typography'
import EyeToggleButton from './EyeToggleButton'
import { FlexBox, FlexRowCenter } from 'components/flex-box'
import useUserService from 'hooks/useUserService'
import { RegisterType, Role, TUser } from 'types/TUser'
import { IUserResponse } from 'interface/IUserResponse'
import { useAppDispatch } from 'hooks/useRedux'
import { SetUser } from 'store/Auth/Auth-action'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'

type WrapperProps = { passwordVisibility?: boolean }

export const Wrapper = styled<FC<WrapperProps & CardProps>>(
    ({ children, passwordVisibility, ...rest }) => (
        <Card {...rest}>{children}</Card>
    )
)<CardProps>(({ theme, passwordVisibility }) => ({
    width: 500,
    padding: '2rem 3rem',
    margin: '15em auto',
    [theme.breakpoints.down('sm')]: { width: '100%' },
    '.passwordEye': {
        color: passwordVisibility
            ? theme.palette.grey[600]
            : theme.palette.grey[400],
    },
}))

const Login: FC = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const { onAuthByEmail } = useUserService()
    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisibility((visible) => !visible)
    }, [])
    const dispatch = useAppDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const route = useNavigate()
    const handleFormSubmit = async (values: TUser) => {
        values.type = RegisterType.Self
        const result = (await onAuthByEmail(values)) as IUserResponse
        if (result.success) {
            if (result.user.role != Role.Admin) {
                enqueueSnackbar('You are not authorized to view this content', {
                    autoHideDuration: 3000,
                })
                return
            } else {
                dispatch(SetUser(result.user))
                Cookies.set('token', result.token)
                enqueueSnackbar('Logged in successfully', {
                    autoHideDuration: 3000,
                })
                route('/')
            }
        } else {
            enqueueSnackbar(result.message, {
                autoHideDuration: 3000,
            })
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            onSubmit: handleFormSubmit,
            validationSchema: formSchema,
        })

    return (
        <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
            <form onSubmit={handleSubmit}>
                <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
                    Login To Newminatis Admin
                </H1>

                <TextField
                    sx={{ mb: 1.5 }}
                    fullWidth
                    name="email"
                    size="small"
                    type="email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    label="Email"
                    placeholder="example@mail.com"
                    error={!!touched.email && !!errors.email}
                    helperText={(touched.email && errors.email) as string}
                />

                <TextField
                    sx={{ mb: 1.5 }}
                    fullWidth
                    size="small"
                    name="password"
                    label="Password"
                    autoComplete="on"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="*********"
                    type={passwordVisibility ? 'text' : 'password'}
                    error={!!touched.password && !!errors.password}
                    helperText={(touched.password && errors.password) as string}
                    InputProps={{
                        endAdornment: (
                            <EyeToggleButton
                                show={passwordVisibility}
                                click={togglePasswordVisibility}
                            />
                        ),
                    }}
                />

                <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ height: 44 }}
                >
                    Login
                </Button>
            </form>

            <FlexBox
                justifyContent="center"
                bgcolor="grey.900"
                borderRadius="4px"
                py={2.5}
                mt="1.25rem"
                color={'white'}
            >
                Forgot your password?
                <Link to="/reset-password">
                    <a style={{ fontFamily: 'Semi-Bold' }}>
                        <H6
                            ml={1}
                            borderBottom="1px solid"
                            color={'white'}
                            fontFamily={'Semi-Bold'}
                        >
                            Reset It
                        </H6>
                    </a>
                </Link>
            </FlexBox>
        </Wrapper>
    )
}

const initialValues = {
    email: '',
    password: '',
}

const formSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    email: yup.string().email('invalid email').required('Email is required'),
})

export default Login
