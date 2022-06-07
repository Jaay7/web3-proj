import React from 'react'
import { CssBaseline, Container, Box, AppBar, Toolbar, Typography, IconButton, Divider, List, ListItem, ListItemButton, ListItemText, Icon, Drawer } from '@mui/material'
import PropTypes from 'prop-types'
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Market', path: '#' },
  { name: 'Exchange', path: '#' },
  { name: 'My Transactions', path: '/transactions-history' },
  { name: 'My Wallets', path: '/my-wallet' },
  { name: 'My Profile', path: '/profile' },
]

const drawerWidth = 240;

const NavBar = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
      <Typography variant="h6" component={Link} to='/home' textAlign="center" style={{textDecoration: 'none', color: 'black'}}>Crypto Currency</Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((page, index) => (
          <ListItem key={index} disablePadding style={{
            backgroundColor: location.pathname === page.path && '#5d665d', 
            color: location.pathname === page.path && 'white',
            borderRadius: '10px',
            width: 'max-content',
            margin: 'auto',
            marginBottom: '4px',
            height: '40px',
          }}>
            <ListItemButton
              onClick={() => navigate(page.path)}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'transparent',
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <Icon baseClassName="material-icons-round">menu</Icon>
            </IconButton>
            <Typography variant="h6" component={Link} to='/home' textAlign="center" sx={{ mr: 2, display: { sm: 'none' } }} style={{textDecoration: 'none'}}>
              Crypto Currency
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box 
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
           
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#abbaab90', },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Outlet />
      </Box>
              {/* <Button
                variant="contained"
                sx={{
                  my: 2,
                  px: 3,
                  // color: 'inherit',
                  backgroundColor: 'black',
                  display: 'block',
                  textTransform: 'capitalize',
                  fontSize: 16,
                  borderRadius: 20,
                }}
              >
                Login
              </Button> */}
      {/* <Toolbar /> */}
      {/* <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(20)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
      </Container> */}
    </Box>
  )
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar