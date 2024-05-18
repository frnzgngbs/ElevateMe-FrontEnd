import React from 'react';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import VennDiagramList from '../components/VennDiagramList';

const Saved = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingTop: '3rem',
        paddingBottom: '3rem',
        paddingLeft: '8rem',
        paddingRight: '8rem',
        userSelect: 'none',
      }}
    >
      <h1 style={{ color: theme.palette.primary.main }}>Saved List</h1>
      <VennDiagramList type={'2 Venn Diagram List'} />
      <VennDiagramList type={'3 Venn Diagram List'} />
    </Box>
  );
};

export default Saved;
