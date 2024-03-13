import { Box, Grid, TextField } from '@mui/material'
import TextEditor from 'components/TextEditor'
import { H4, H6 } from 'components/Typography'
import { FormikProps } from 'formik'
import { FC } from 'react'
import { TContent, TUsefulLinks } from 'types/TUsefulLinks'
type Props = {
    formik: FormikProps<TContent>
}
export const OurStoryForm: FC<Props> = ({ formik }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Grid item container rowSpacing={2} columnSpacing={4}>
                <Grid xs={12} item>
                    {/* <TextField
                        fullWidth
                        multiline
                        rows={8}
                        name={`ourStory.ourMission`}
                        label="Our Mission"
                        color="info"
                        size="small"
                        placeholder="Our Mission"
                        value={formik.values.ourStory.ourMission ?? null}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    /> */}
                    <H4 sx={{ paddingLeft: 1, paddingY: 1 }}>Our Mission</H4>
                    <TextEditor
                        initialValue={formik.values.ourStory?.ourMission}
                        onEditorChange={(e) =>
                            formik.setFieldValue('ourStory.ourMission', e)
                        }
                        height={350}
                    />
                </Grid>
                <Grid xs={12} item>
                    {/* <TextField
                        fullWidth
                        multiline
                        rows={8}
                        name={`ourStory.ourVision`}
                        label="Our Vision"
                        color="info"
                        size="small"
                        placeholder="Our Vision"
                        value={formik.values.ourStory.ourVision ?? null}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    /> */}
                    <H4 sx={{ paddingLeft: 1, paddingY: 1 }}>Our Vision</H4>
                    <TextEditor
                        initialValue={formik.values.ourStory?.ourVision}
                        onEditorChange={(e) =>
                            formik.setFieldValue('ourStory.ourVision', e)
                        }
                        height={350}
                    />
                </Grid>

                <Grid xs={12} item>
                    {/* <TextField
                        fullWidth
                        multiline
                        rows={8}
                        name={`ourStory.whoWeAre`}
                        label="Who We Are"
                        color="info"
                        size="small"
                        placeholder="Who We Are"
                        value={formik.values.ourStory.whoWeAre ?? null}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    /> */}
                    <H4 sx={{ paddingLeft: 1, paddingY: 1 }}>Who We Are</H4>
                    <TextEditor
                        initialValue={formik.values.ourStory?.whoWeAre}
                        onEditorChange={(e) =>
                            formik.setFieldValue('ourStory.whoWeAre', e)
                        }
                        height={350}
                    />
                </Grid>

                <Grid xs={12} item>
                    {/* <TextField
                        fullWidth
                        multiline
                        rows={8}
                        name={`ourStory.ourContribution`}
                        label="Our Contribution"
                        color="info"
                        size="small"
                        placeholder="Our Contribution"
                        value={formik.values.ourStory.ourContribution ?? null}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    /> */}
                    <H4 sx={{ paddingLeft: 1, paddingY: 1 }}>
                        Our Contribution
                    </H4>
                    <TextEditor
                        initialValue={formik.values.ourStory?.ourContribution}
                        onEditorChange={(e) =>
                            formik.setFieldValue('ourStory.ourContribution', e)
                        }
                        height={350}
                    />
                </Grid>

                <Grid xs={12} item>
                    {/* <TextField
                        fullWidth
                        multiline
                        rows={8}
                        name={`ourStory.ourContribution`}
                        label="Our Contribution"
                        color="info"
                        size="small"
                        placeholder="Our Contribution"
                        value={formik.values.ourStory.ourContribution ?? null}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    /> */}
                    <H4 sx={{ paddingLeft: 1, paddingY: 1 }}>
                        Shipping Info Single
                    </H4>
                    <TextEditor
                        initialValue={
                            formik.values.ourStory?.shippingInfoSingle
                        }
                        onEditorChange={(e) =>
                            formik.setFieldValue(
                                'ourStory.shippingInfoSingle',
                                e
                            )
                        }
                        height={350}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
