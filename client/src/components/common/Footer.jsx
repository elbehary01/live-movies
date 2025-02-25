import React from 'react';
import { Paper, Stack, Button, Box } from '@mui/material';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from '../../configs/menuConfigs';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: 'unset', padding: '2rem' }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: 'column', md: 'row ' }}
          sx={{ height: 'max-content' }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: 'inherit' }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
        <div>
          <hr />
          <p>
            Copyright {new Date().getFullYear()}@ captain-koshariko.com - All
            Right Reserved.
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Footer;
