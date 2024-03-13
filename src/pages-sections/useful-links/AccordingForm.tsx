import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    TextField,
} from '@mui/material'
import { FormikProps } from 'formik'
import { FC } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import { FlexBetween } from '../../components/flex-box'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { H4 } from 'components/Typography'
import { TContent, TUsefulLinks } from 'types/TUsefulLinks'
type Props = {
    formik: FormikProps<TContent>
    parameter:
        | 'faqs'
        | 'ourStory'
        | 'privacyPolicy'
        | 'returnPolicy'
        | 'shippingInformation'
        | 'termsAndCondition'
        | string
}
export const AccordingForm: FC<Props> = ({ formik, parameter }) => {
    const handleGenericChange = (action: 'DELETE' | 'ADD', index?: number) => {
        var section: TUsefulLinks = {
            description: '',
            title: 'New Title',
        }
        switch (parameter) {
            case 'faqs':
                if (action == 'ADD') {
                    formik.setValues({
                        ...formik.values,
                        faqs: [...formik.values.faqs, section as TUsefulLinks],
                    })
                } else if (action == 'DELETE') {
                }

                break

            case 'privacyPolicy':
                if (action == 'ADD') {
                    formik.setValues({
                        ...formik.values,
                        privacyPolicy: [
                            ...formik.values.privacyPolicy,
                            section as TUsefulLinks,
                        ],
                    })
                } else if (action == 'DELETE') {
                    var privacyPolicy_list: TUsefulLinks[] = []
                    formik.values.privacyPolicy.map((i, ind) => {
                        if (index !== ind) {
                            privacyPolicy_list.push(i)
                        }
                    })

                    formik.setValues({
                        ...formik.values,
                        privacyPolicy: privacyPolicy_list,
                    })
                }
                break
            case 'returnPolicy':
                if (action == 'ADD') {
                    formik.setValues({
                        ...formik.values,
                        returnPolicy: [
                            ...formik.values.returnPolicy,
                            section as TUsefulLinks,
                        ],
                    })
                } else if (action == 'DELETE') {
                    var returnPolicy_list: TUsefulLinks[] = []
                    formik.values.returnPolicy.map((i, ind) => {
                        if (index !== ind) {
                            returnPolicy_list.push(i)
                        }
                    })

                    formik.setValues({
                        ...formik.values,
                        returnPolicy: returnPolicy_list,
                    })
                }
                break
            case 'shippingInformation':
                if (action == 'ADD') {
                    formik.setValues({
                        ...formik.values,
                        shippingInformation: [
                            ...formik.values.shippingInformation,
                            section as TUsefulLinks,
                        ],
                    })
                } else if (action == 'DELETE') {
                    var shippingInformation_list: TUsefulLinks[] = []
                    formik.values.shippingInformation.map((i, ind) => {
                        if (index !== ind) {
                            shippingInformation_list.push(i)
                        }
                    })

                    formik.setValues({
                        ...formik.values,
                        shippingInformation: shippingInformation_list,
                    })
                }
                break
            case 'termsAndCondition':
                if (action == 'ADD') {
                    formik.setValues({
                        ...formik.values,
                        termsAndCondition: [
                            ...formik.values.termsAndCondition,
                            section as TUsefulLinks,
                        ],
                    })
                } else if (action == 'DELETE') {
                    var faqs_List: TUsefulLinks[] = []
                    formik.values.faqs.map((i, ind) => {
                        if (index !== ind) {
                            faqs_List.push(i)
                        }
                    })

                    formik.setValues({
                        ...formik.values,
                        faqs: faqs_List,
                    })
                }
                break
        }
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <FlexBetween justifyContent={'flex-end'} mb={2}>
                <Button
                    onClick={() => handleGenericChange('ADD')}
                    color="secondary"
                    variant="contained"
                    endIcon={<AddIcon />}
                >
                    ِAdd new section
                </Button>
            </FlexBetween>
            {formik.values[parameter]?.map((item, index) => (
                <Accordion sx={{ bgcolor: 'white', mb: 2 }} elevation={8}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <H4 sx={{ color: 'black' }}>{item.title}</H4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            fullWidth
                            name={`[${parameter}][${index}].title`}
                            label="Title"
                            color="info"
                            size="small"
                            placeholder="Title"
                            value={
                                formik.values[parameter][index].title ?? null
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            multiline
                            sx={{ mt: 2 }}
                            rows={6}
                            name={`[${parameter}][${index}].description`}
                            label="description"
                            color="info"
                            size="small"
                            placeholder="description"
                            value={
                                formik.values[parameter][index].description ??
                                null
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </AccordionDetails>
                    <FlexBetween justifyContent={'flex-end'} mb={2} mr={2}>
                        <Button
                            onClick={() => handleGenericChange('DELETE', index)}
                            color="error"
                            variant="contained"
                            endIcon={<DeleteOutlineIcon />}
                        >
                            Delete Section
                        </Button>
                    </FlexBetween>
                </Accordion>
            ))}
        </Box>
    )
}
