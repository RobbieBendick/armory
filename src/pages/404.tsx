import { Box, Typography } from '@mui/material';

export function FourOhFourPage() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      mt={4}
      minHeight='80vh'
    >
      <Typography textAlign='center' fontSize='24px' mt={3}>
        Sorry! The page that you tried to access doesn't exist.
      </Typography>
    </Box>
  );
}
