// import NextImage from "next/image";
import { FC, useEffect, useState } from 'react'
import { Add, Clear } from '@mui/icons-material'
import { Box, Button, Grid, styled, TextField } from '@mui/material'
import DropZone from 'components/DropZone'
import { FlexBox } from 'components/flex-box'
import { useFormik } from 'formik'
import { TBannerSetting } from '../../types/TBannerSetting'
import useSettingService from 'hooks/useSettingService'
import { IBannerSetting } from 'interface/IBannerSetting'
import BannerSliderForm from './BannerSliderForm'
import { notifySuccess } from 'service/toasterService'
// styled components
const UploadBox = styled(Box)(() => ({
    width: 170,
    height: 'auto',
    overflow: 'hidden',
    borderRadius: '8px',
    position: 'relative',
}))

const StyledClear = styled(Clear)(() => ({
    top: 5,
    right: 5,
    fontSize: 14,
    color: 'red',
    cursor: 'pointer',
    position: 'absolute',
}))

export interface FileType extends File {
    preview: string
}

const BannerSlider: FC = () => {
    const { onGetBanners } = useSettingService()
    const [banners, setBanners] = useState<TBannerSetting[]>([])
    const { onPostBanners } = useSettingService()
    const handleFormSubmit = async (e: TBannerSetting[]) => {
        const result = (await onPostBanners(e)) as IBannerSetting
        if (result.success) {
            notifySuccess('Banners Saved Successfully!')
            executeAllLongRunningTasks(result.bannersSetting).then((res) =>
                setBanners(res as TBannerSetting[])
            )
        }
    }

    const handleGetBanners = async () => {
        const result = (await onGetBanners()) as IBannerSetting
        if (result.success) {
            executeAllLongRunningTasks(result.bannersSetting).then((res) =>
                setBanners(res as TBannerSetting[])
            )
        }
    }

    const formik = useFormik({
        initialValues: banners,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    })

    useEffect(() => {
        handleGetBanners()
    }, [])

    const deleteNewImage = (name: string) => {
        const formikState = formik.values.filter((x) => x.file.name !== name)
        formik.setValues(formikState)
    }

    const handleChangeDropZone = (files: File[]) => {
        var init: TBannerSetting[] = []
        files.forEach((file) => {
            var x: TBannerSetting = {
                id: 0,
                action: '',
                actionUrl: '',
                banner: '',
                createdDate: null,
                file: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
                text: '',
            }
            init.push(x)
        })

        formik.setValues((p) => [...p, ...init])
    }

    const executeLongRunningtask = async (item: TBannerSetting) => {
        const name = item.banner.split('/')[4]
        return new Promise((resolve, reject) => {
            fetch(item.banner, {
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
                    var _file = Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                    var bannerSetting: TBannerSetting = {
                        action: item.action,
                        actionUrl: item.actionUrl,
                        banner: item.banner,
                        createdDate: item.createdDate,
                        file: _file,
                        id: 0,
                        text: item.text,
                    }

                    resolve(bannerSetting)
                })
        })
    }

    const executeAllLongRunningTasks = async (data: TBannerSetting[]) => {
        return await Promise.all(data.map(executeLongRunningtask))
    }

    return (
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DropZone
                        title="Drag and Drop slide image here"
                        imageSize="upload landscape photo"
                        onChange={(files) => handleChangeDropZone(files)}
                    />

                    <FlexBox gap={1} mt={2}>
                        {formik.values?.map((item, index) => (
                            <UploadBox key={index}>
                                <img
                                    width={240}
                                    height={100}
                                    src={item.file?.preview}
                                />
                                <StyledClear
                                    onClick={() =>
                                        deleteNewImage(item.file?.name)
                                    }
                                />
                            </UploadBox>
                        ))}
                    </FlexBox>
                </Grid>

                {formik.values?.map((item, index) => (
                    <BannerSliderForm formik={formik} index={index} />
                ))}

                <Grid item xs={12}>
                    <Button type="submit" color="info" variant="contained">
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default BannerSlider
