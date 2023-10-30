import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Iconify from 'src/components/iconify';
import { Paper } from '@mui/material';

export default function DefaultBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<Iconify icon="bx:home" />} />
        <BottomNavigationAction label="Favorites" icon={<Iconify icon="bx:envelope" />} />
        <BottomNavigationAction label="Nearby" icon={<Iconify icon="bx:dots-horizontal-rounded" />} />

      </BottomNavigation>
    </Paper>
  );
}