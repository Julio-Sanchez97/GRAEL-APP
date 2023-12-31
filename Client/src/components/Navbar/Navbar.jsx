import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import styles from "./Navbar.module.css"
import { logout } from '../../redux/sessionUserSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function NavbarComponent() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole")?localStorage.getItem("userRole"):null
  //Define las paginas o rutas donde podra dirigirse
  const pages = ['Home', 'Form'];
  const settings = ['Profile', 'Dashboard', 'Logout'];
  let settingsFiltered = []
  if (userRole ==="admin") {
    settingsFiltered = settings;
  }
  else{
    settingsFiltered = settings.filter((setting)=>setting.toLocaleLowerCase()!=="dashboard")
  }

  const functionRotesObject = {
    home: ()=>{
      handleCloseNavMenu();
      navigate("/home");
    },
    form: ()=>{
      handleCloseNavMenu();
      navigate("/user/form");
    },
    dashboard: ()=>{
      handleCloseUserMenu();
      navigate("/admin/dashboard");
    },
    profile: ()=>{
      handleCloseUserMenu();
      console.log("perfil");
    },
    logout: ()=>{
      handleCloseUserMenu();
      dispatch(logout());
      localStorage.removeItem("token");
      // Reemplazar la URL actual con la URL de inicio
      window.history.replaceState({}, "", "/");
      navigate('/'); // Redirigir a la página de inicio de sesión
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100%" style={{"backgroundColor":"#2C3333"}}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link to={"/home"} className={styles.tituloLogo}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GRAEL
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>{functionRotesObject[page.toLocaleLowerCase()]()}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // Centrar horizontalmente
              width: '100%', // Ocupar todo el ancho disponible
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Link to={"/home"} className={styles.tituloLogo}>
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  GRAEL
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{functionRotesObject[page.toLocaleLowerCase()]()}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="user" className={styles.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
              settingsFiltered.map((setting) => (
                <MenuItem key={setting} onClick={()=>{functionRotesObject[setting.toLocaleLowerCase()]()}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarComponent;