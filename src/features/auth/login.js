import { loginHandler } from './authSlice';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import {useNavigate,useLocation }  from 'react-router-dom';

import {Avatar,Button,CssBaseline,TextField,Link,Grid,Box,LockOutlinedIcon,Typography,Container,createTheme,ThemeProvider} from '../../styles/mui';

export const Login = ()=> {
  const dispatch = useDispatch();
    const [cred,setCred] = useState({username: "", password : ""});
    const navigate = useNavigate();
    const location = useLocation();
    const theme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginHandler({cred,navigate,location}));
      };
    return(
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setCred((a)=>({...a, username: e.target.value}))}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setCred((a)=>({...a, password: e.target.value}))}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              login
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: -1, mb: 2 }}
              onClick={()=> {
                setCred((a)=>({...a,username : "tanaypratap123",password : "testing"}));
            }}
            >
              Guest Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
}