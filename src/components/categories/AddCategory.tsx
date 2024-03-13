import { Button, Card, Grid, Modal, TextField } from '@mui/material'
import { FC, KeyboardEventHandler, useState } from 'react'
import { TProductCategory } from 'types/TProductCategory'
import * as yup from 'yup'
import { Formik, useFormik } from 'formik'
import { Assign, ObjectShape } from 'yup/lib/object'
import { H3 } from 'components/Typography'
import CreatableSelect from 'react-select/creatable'
import { TProductSubCategory } from 'types/TProductSubCategory'

// ===============================================================
type AddCategoryProps = {
    open: boolean
    handleClose: () => void
    initialValues: TProductCategory
    handleFormSubmit: (values: TProductCategory) => void
    validationSchema: yup.ObjectSchema<Assign<ObjectShape, any>>
    textAction: string
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    boxShadow: 24,
}

const components = {
    DropdownIndicator: null,
}

const createOption = (
    label: string,
    categoryId: number
): TProductSubCategory => ({
    name: label,
    description: label.replaceAll(' ', '-').replaceAll("'", ''),
    id: 0,
    productCategoryId: categoryId,
    seoDescription: null,
    seoTags: null,
    seoTitle: null,
})
// ===============================================================

const AddCategory: FC<AddCategoryProps> = (props) => {
    const {
        open,
        handleClose,
        handleFormSubmit,
        initialValues,
        validationSchema,
        textAction,
    } = props

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
    })

    const [inputValue, setInputValue] = useState('')
    const [value, setValue] = useState<readonly TProductSubCategory[]>(
        initialValues.productSubCategory
    )

    const handleKeyDown: KeyboardEventHandler = (event) => {
        console.log(createOption(inputValue, initialValues.id))
        if (!inputValue) return
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev) => [
                    ...prev,
                    createOption(inputValue, initialValues.id),
                ])
                setInputValue('')
                event.preventDefault()
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    width: '700px',
                },
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{ ...style, p: 6 }}>
                <H3 mb={2}>{textAction}</H3>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                color="info"
                                size="small"
                                placeholder="Name"
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={
                                    !!formik.touched.name &&
                                    !!formik.errors.name
                                }
                                helperText={
                                    (formik.touched.name &&
                                        formik.errors.name) as string
                                }
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                fullWidth
                                color="info"
                                size="small"
                                name="description"
                                onBlur={formik.handleBlur}
                                disabled
                                placeholder="Description"
                                onChange={formik.handleChange}
                                value={formik.values.description ?? null}
                                label="Category Permalink"
                            />
                        </Grid>

                        <Grid item sm={12} xs={12}>
                            <CreatableSelect
                                components={components}
                                inputValue={inputValue}
                                isClearable
                                isMulti
                                menuIsOpen={false}
                                onChange={(newValue) => setValue(newValue)}
                                onInputChange={(newValue) =>
                                    setInputValue(newValue)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Type something and press enter to add new sub category"
                                value={value}
                                getOptionLabel={(x) => x.name}
                                getOptionValue={(x) => x.description}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <Button
                                variant="contained"
                                color="info"
                                type="submit"
                            >
                                Save Category
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Modal>
    )
}

export default AddCategory
