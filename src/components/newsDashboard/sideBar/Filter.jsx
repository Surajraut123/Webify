import { Box, Button } from '@mui/material'
import React from 'react'
import Utils from '../../../FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { filteredNews } from '../../../redux/newsDataSlice';
const Filter = ({entity}) => {

    const entities = Utils[entity] || []
    const entityType = entity == "Language" ? 'language' : entity == 'Country' ? 'country' : 'categories'
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.newsData.filters)
    console.log(filter)

  return (

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, width: '100%' }}>
        {entities.map(({code, label}) => (
            <Button 
                key={code} 
                variant={filter[entityType].includes(code) ? "contained" : 'outlined'}
                startIcon={<AddIcon />} 
                onClick={() => dispatch(filteredNews({code, entityType}))}
                >
                {label}
            </Button>
        ))}
    </Box>
    )
}

export default Filter
