import React, { FC } from 'react';
import { Box, Container, Typography, Link } from '@mui/material';


const Footer: FC = () => {
  return (
    <Box component="footer">
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Next OR Solver........Copyright © '}
          <Link color="inherit" href="https://github.com/Christopher-06/next-or-solver">
            Github
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
