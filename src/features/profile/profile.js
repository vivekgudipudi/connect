import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import {Avatar,Button,CardActions,Box,Backdrop} from '../../styles/mui';
import CardHeader from '@mui/material/CardHeader';
import { useSelector} from 'react-redux';
import { PostCard } from '../../components/postCard';

export const Profile = ()=> {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    const { user } = useSelector((store)=>store.auth);
    const { posts } = useSelector((store)=>store.posts);


    const filteredPosts =  posts.filter((post)=>post.username === user.username)

    return(
        
        <div className='container'>
            <Box className="profile-section">
            <Box className='profile-head'>
            <CardHeader className='card-header' avatar={ <Avatar sx={{ bgcolor: '#1976d2' }} src={user.profileIMG} /> }/>
            <Typography variant="body2" gutterBottom>@{user.username}</Typography>
            <Typography variant="h6" gutterBottom >{user.firstName}</Typography>
            <Typography variant="body2" gutterBottom>{user.bio}</Typography>
            <Link href={user.profileURL}>{user.profileURL}</Link>
            <Box>
                <section className='profile-following'>
                    <section className='following-box'>
                        <span>Post</span>
                        <span>{filteredPosts.length}</span>
                    </section>
                    <section className='following-box'>
                        <span>Followers</span>
                        <span>{user.followers.length}</span>
                    </section>
                    <section className='following-box'>
                        <span>Following</span>
                        <span>{user.following.length}</span>
                    </section>
                </section>
            </Box>
             <CardActions className='create-card-actions'>
                <Button size="small" variant="outlined" onClick={()=>handleToggle()}>Update Profile</Button>
                <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
              >
              </Backdrop>
            </CardActions>

            </Box>
            {
                filteredPosts.slice().reverse().map((post)=><PostCard key={post._id} data={post} />)
            }
            
            </Box>
        </div>  
    )
}