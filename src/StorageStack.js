import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function StorageStack(props) {
  return (<div>
    <Stack justifyContent="flex-start" alignItems="stretch" spacing={2} margin={4}>
    {props.vitsit.map((vitsi) => <Item>{vitsi}</Item>)}
    </Stack>
  </div>
  );
}
