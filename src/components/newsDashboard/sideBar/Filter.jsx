import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Utils from '../../../FilterList';
import AddIcon from '@mui/icons-material/Add';
const Filter = ({entity, setFilters}) => {

    const entities = Utils[entity] || []
    const entityType = entity == "Language" ? 'lang' : entity == 'country' ? 'country' : 'category'

    const handleFilters = (code, entityType) => {
        setFilters(prev => ({
            ...prev,
            [entityType]: prev[entityType].includes(code) ? prev[entityType].filter(c => c!==code) : [...prev[entityType], code]
        }));
    }

  return (

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, width: '100%' }}>
        {entities.map(({code, label}) => (
            <Button 
                key={code} 
                variant={filters[entityType].includes(code) ? "contained" : 'outlined'}
                startIcon={<AddIcon />} 
                onClick={() => handleFilters(code, entityType)}
                >
                {label}
            </Button>
        ))}
    </Box>
    )
}

export default Filter
