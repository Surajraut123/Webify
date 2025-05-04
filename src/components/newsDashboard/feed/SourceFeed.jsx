import { WidthFull } from '@mui/icons-material'
import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const END_POINT = import.meta.env.VITE_URL_END_POINT;
const SourceFeed = ({pageSize, pageNum, language, category, country}) => {

    const [sourceData, setSourceData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const params = new URLSearchParams({
                pageSize: pageSize,
                pageNum: pageNum,
                source: "sources"
              });
        
              if (language) params.append("language", language);
              if (country) params.append("country", country); 
              if (category) params.append("category", category); 
            const response = await fetch(`http://${END_POINT}/feed/news?${params.toString()}`, {
                method:"GET",
                headers: {
                    "Content-type": "application/json"
                }
            }) 

            if(response.ok) {
                const data = await response.json();
                setSourceData(data?.sources)
                console.log("Sources: ", data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(true)
        }
    }

    useEffect(() => {

        fetchData()
    }, [])

  return (
    <Box  sx={{
        width: '100%',
        display: 'flex',
        alignItems: loading? 'center': undefined,
        justifyContent: loading? 'center': undefined,
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {
            loading ? <CircularProgress/> : 
            (
                sourceData?.map((data, index) => (
                    <Box sx={{width: '30vh', display: 'flex', flexDirection: 'column', gap:'1rem', background: '#ffffff', borderRadius: '10px', padding: '1rem', fontFamily:'system-ui'}} key={index}>
                        <Typography variant='h4' sx={{fontSize: '1.25rem', fontWeight: '600', color: '#1e293b'}}>{data?.name}</Typography>
                        <Typography variant='p'>{data?.description}</Typography>
                        <Typography variant='a' href={data?.url} sx={{fontWeight: 600, color: '#3985d1', cursor:'pointer'}}  target="_blank" rel="noopener noreferrer">Visit Website</Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '1rem', color: '#8f8f8f'}}>
                            <Typography component="ul">Category: {data.category}</Typography>
                            <Typography component="ul">Language: {data.language}</Typography>
                            <Typography component="ul">Country: {data.country}</Typography>
                        </Box>
                    </Box>    
                ))

            )
        }
    </Box>
  )
}

export default SourceFeed
