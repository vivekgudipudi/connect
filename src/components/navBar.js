import { useDispatch } from "react-redux";
import { userLogout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button,ButtonGroup,BookmarkBorderOutlinedIcon,PermIdentityOutlinedIcon,HandshakeOutlinedIcon } from '../styles/mui';

export const NavBar = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();

    return(
        <>
            <header className='nav'>
                <div>
                <Button onClick={()=>navigate('/')}><HandshakeOutlinedIcon/>{"\u00a0\u00a0"}CONNECT</Button>
                </div>
                <div>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={()=>navigate('/bookmarks')}><BookmarkBorderOutlinedIcon /></Button>
                    <Button onClick={()=>navigate('/profile')}><PermIdentityOutlinedIcon /></Button>
                    {
                        localStorage.getItem("auth") ? (
                            <Button onClick={()=>{navigate('/login');dispatch(userLogout())}}>Logout</Button>
                        ) : <Button onClick={()=>navigate('/login')}>Login</Button>
                    }
                    
                </ButtonGroup>
                </div>
            </header>
        </>
    )
}