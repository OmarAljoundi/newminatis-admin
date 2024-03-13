import { Button, Grid, MenuItem, TextField } from '@mui/material'
import axios, { Axios, AxiosResponse } from 'axios'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { useDownloadFile } from 'hooks/useDownloadFile'
import useOrderService from 'hooks/useOrderService'
import { SearchList } from 'pages/orders'
import React, { FC, useEffect, useRef, useState } from 'react'
import { FilterBuilderInput } from 'react-filter-builder-input'
import { eFilterOperator, FilterByOptions } from 'types/TSearchQuery'

type SearchBox = {
    handleSearch: (FilterByOptions: FilterByOptions[]) => void
    searchList: SearchList[]
}

export const SearchBox: FC<SearchBox> = ({ handleSearch, searchList }) => {
    const [selectedList, setSelectedList] = useState<string>('')
    const [selectDate, setSelectDate] = useState<string>('')
    const [query, setQuery] = useState<string | number | null>(null)
    const [dateQuery, setDateQuery] = useState<Date | null>(null)

    const handleSearchClick = () => {
        var FilerByOptions: FilterByOptions[] = []

        if (selectedList) {
            var Filter: FilterByOptions = {
                FilterFor: query,
                FilterOperator:
                    searchList.find((x) => x.id == selectedList)?.type == 'text'
                        ? eFilterOperator.Contains
                        : eFilterOperator.EqualsTo,
                MemberName: selectedList,
            }
            if (
                (Filter.FilterFor as string) != '' &&
                (Filter.FilterFor as number) != 0
            )
                FilerByOptions.push(Filter)
        }
        if (selectDate) {
            var Filter: FilterByOptions = {
                FilterFor: dateQuery,
                FilterOperator: eFilterOperator.LessThanOrEquals,
                MemberName: selectDate,
            }
            FilerByOptions.push(Filter)
        }

        handleSearch(FilerByOptions)
    }

    return (
        <Grid
            item
            container
            mb={4}
            justifyContent={'space-between'}
            rowGap={2}
            columnSpacing={6}
        >
            <Grid item xs={12} md={6}>
                <FlexBetween columnGap={4}>
                    <TextField
                        select={
                            searchList.find((x) => x.id == selectedList)
                                ?.type == 'Options'
                        }
                        fullWidth
                        type={
                            searchList.find((x) => x.id == selectedList)
                                ?.type != 'Options'
                                ? searchList.find((x) => x.id == selectedList)
                                      ?.type
                                : 'text'
                        }
                        onChange={(x) => setQuery(x.target.value)}
                        color="info"
                        size="small"
                        placeholder="Search For .."
                        label="Search..."
                    >
                        {searchList.find((x) => x.id == selectedList)?.type ==
                            'Options' &&
                            searchList
                                .find((x) => x.id == selectedList)
                                ?.options.map((item) => (
                                    <MenuItem value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                    </TextField>

                    <TextField
                        sx={{ width: '200px' }}
                        select
                        color="info"
                        size="small"
                        placeholder="Choose Field"
                        label="Choose"
                        onChange={(x) => setSelectedList(x.target.value)}
                    >
                        {searchList
                            .filter(
                                (x) => x.type != 'Date' && x.offFilter != true
                            )
                            .map((item) => (
                                <MenuItem value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </FlexBetween>
            </Grid>
            <Grid item xs={12} md={6}>
                <FlexBetween columnGap={4}>
                    <TextField
                        select
                        fullWidth
                        color="info"
                        size="small"
                        placeholder="Pick A Date"
                        label="Pick A Date"
                        onChange={(x) =>
                            setDateQuery(x.target.value as unknown as Date)
                        }
                    >
                        {searchList
                            .find((x) => x.id == selectDate)
                            ?.options.map((item) => (
                                <MenuItem value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                    </TextField>

                    <TextField
                        sx={{ width: '200px' }}
                        select
                        color="info"
                        size="small"
                        placeholder="Choose Field"
                        label="Choose"
                        onChange={(x) => setSelectDate(x.target.value)}
                    >
                        {searchList
                            .filter((x) => x.type == 'Date')
                            .map((item) => (
                                <MenuItem value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                    </TextField>
                    <Button
                        color="marron"
                        variant="contained"
                        sx={{ width: '150px' }}
                        onClick={handleSearchClick}
                    >
                        Search
                    </Button>
                    <a
                        href={`${process.env.REACT_APP_URL_PRODUCTION}/Order/ExportToExcel`}
                        download
                    >
                        <Button
                            color="info"
                            variant="contained"
                            sx={{ width: '150px' }}
                        >
                            Export
                        </Button>
                    </a>
                </FlexBetween>
            </Grid>
        </Grid>
    )
}
