import { Autocomplete, Chip, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Utils from '../../../FilterList';
import { filteredNews } from '../../../redux/newsDataSlice';
import { motion } from 'framer-motion';

const FilterNews = ({entity}) => {

    const entities = Utils[entity] || []
    const entityType = entity == "Language" ? 'language' : entity == 'Country' ? 'country' : 'categories'
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.newsData.filters)
    console.log("filter : ", filter)
  return (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        >
        <Autocomplete
            multiple
            id="size-small-outlined-multi"
            size="small"
            options={entities}
            getOptionLabel={(option) => option.label}
            defaultValue={filter[entityType]?.length > 0 ? filter[entityType] : []}
            onChange={(event, selectedOptions) =>
            dispatch(filteredNews({ selectedOptions, entityType }))
            }
            sx={{
            width: '100%',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            padding: '6px',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            }}
            renderInput={(params) => (
            <TextField
                {...params}
                label={`Select ${entity}`}
                placeholder={entity}
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                    fontWeight: 500,
                },
                }}
            />
            )}
            renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip
                variant="outlined"
                label={option.label}
                size="small"
                {...getTagProps({ index })}
                sx={{
                    backgroundColor: '#e3f2fd',
                    color: '#0d47a1',
                    fontWeight: 500,
                    borderRadius: '8px',
                }}
                />
            ))
            }
            renderOption={(props, option, { selected }) => (
            <li
                {...props}
                style={{
                backgroundColor: selected ? '#bbdefb' : 'white',
                fontWeight: selected ? 600 : 400,
                padding: '10px 16px',
                borderBottom: '1px solid #f0f0f0',
                }}
            >
                {option.label}
            </li>
            )}
        />
    </motion.div>
  )
}

export default FilterNews
