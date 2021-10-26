import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 2,
          width: '100%',
          height: 128,
        },
      }}
    >
      <Paper elevation={24}><p>{props.vitsi}</p></Paper>
    </Box>
  );
}