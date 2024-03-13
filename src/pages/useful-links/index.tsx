import { ReactElement, useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Card, styled, Tab } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import TopbarForm from 'pages-sections/site-settings/TopbarForm'
import FooterForm from 'pages-sections/site-settings/FooterForm'
import GeneralForm from 'pages-sections/site-settings/GeneralForm'
import BannerSlider from 'pages-sections/site-settings/BannerSlider'
import ShippingVatForm from 'pages-sections/site-settings/ShippingVatForm'
import SocialLinksForm from 'pages-sections/site-settings/SocialLinksForm'
import { AccordingForm } from 'pages-sections/useful-links/AccordingForm'
import { useFormik } from 'formik'
import { TContent } from 'types/TUsefulLinks'
import { LoadingButton } from 'components/LoadingButton'
import useSettingService from 'hooks/useSettingService'
import { IContentResponse } from 'interface/IContentResponse'
import { useSnackbar } from 'notistack'
import { OurStoryForm } from 'pages-sections/useful-links/OurStoryForm'

// styled components
const StyledTabPanel = styled(TabPanel)(() => ({
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
}))

const StyledTabList = styled(TabList)(({ theme }) => ({
    '& .MuiTab-root.Mui-selected': { color: theme.palette.info.main },
    '& .MuiTabs-indicator': { background: theme.palette.info.main },
}))

// =============================================================================
UsefulLinks.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function UsefulLinks() {
    const [selectTab, setSelectTab] = useState('our-story')
    const [content, setContent] = useState<TContent>({
        faqs: [],
        ourStory: {},
        privacyPolicy: [],
        returnPolicy: [],
        shippingInformation: [],
        termsAndCondition: [],
    })
    const { SettingLoad, onReadJson, onWriteJson } = useSettingService()

    const loadContent = async () => {
        const result = (await onReadJson()) as IContentResponse
        if (result.success) {
            setContent(result.content)
        }
    }
    useEffect(() => {
        loadContent()
    }, [])

    const { enqueueSnackbar } = useSnackbar()
    const handleFormSubmit = async (e: TContent) => {
        const result = (await onWriteJson(e)) as IContentResponse
        if (result.success) {
            enqueueSnackbar(`Content Updated Successfully`)
        } else {
            enqueueSnackbar(`Error while update the content, ${result.message}`)
        }
    }
    const formik = useFormik({
        initialValues: content,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    })
    return (
        <Box py={4}>
            <Card sx={{ px: 3, py: 2, overflow: 'visible' }} elevation={6}>
                <TabContext value={selectTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'grey.300' }}>
                        <StyledTabList
                            onChange={(_, value) => setSelectTab(value)}
                            variant="scrollable"
                        >
                            <Tab
                                label="Our Story"
                                value="our-story"
                                disableRipple
                            />
                            <Tab
                                label="Terms and Condition"
                                value="terms-and-condition"
                                disableRipple
                            />
                            <Tab
                                label="Privacy Policy"
                                value="privacy-policy"
                                disableRipple
                            />
                            <Tab
                                label="Shipping Information"
                                value="shipping-information"
                                disableRipple
                            />
                            <Tab
                                label="Return Policy"
                                value="return-policy"
                                disableRipple
                            />
                            <Tab label="FAQs" value="faqs" disableRipple />
                            <LoadingButton
                                content="Save"
                                loading={SettingLoad}
                                variant="contained"
                                color="info"
                                onClick={formik.submitForm}
                                type="submit"
                                className="inner-tab"
                                sx={{
                                    width: 'auto',
                                    px: 6,
                                    borderRadius: 0,
                                    position: 'absolute',
                                    right: '0',
                                }}
                            />
                        </StyledTabList>
                    </Box>

                    <StyledTabPanel value="our-story">
                        {!SettingLoad && <OurStoryForm formik={formik} />}
                    </StyledTabPanel>

                    <StyledTabPanel value="terms-and-condition">
                        <AccordingForm
                            formik={formik}
                            parameter={'termsAndCondition'}
                        />
                    </StyledTabPanel>

                    <StyledTabPanel value="privacy-policy">
                        <AccordingForm
                            formik={formik}
                            parameter={'privacyPolicy'}
                        />
                    </StyledTabPanel>

                    <StyledTabPanel value="shipping-information">
                        <AccordingForm
                            formik={formik}
                            parameter={'shippingInformation'}
                        />
                    </StyledTabPanel>

                    <StyledTabPanel value="return-policy">
                        <AccordingForm
                            formik={formik}
                            parameter={'returnPolicy'}
                        />
                    </StyledTabPanel>

                    <StyledTabPanel value="faqs">
                        <AccordingForm formik={formik} parameter={'faqs'} />
                    </StyledTabPanel>
                </TabContext>
            </Card>
        </Box>
    )
}
