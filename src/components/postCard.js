import * as React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addLiked,removeLiked,getAllUsers } from '../features/posts/postSlice'
import { addBookmark,removeBookmark } from '../features/bookmark/bookmarkSlice';

import {Box,Card,CardActions,CardContent,Typography,IconButton,FavoriteBorderSharpIcon,ChatBubbleOutlineOutlinedIcon,BookmarkBorderOutlinedIcon,CardHeader,MoreVertIcon,Avatar,BookmarkOutlinedIcon,FavoriteSharpIcon,styled } from '../styles/mui';



export const PostCard = ({data})=>{
    const dispatch = useDispatch();
    const { token,user } = useSelector((state) => state.auth);
    const { bookmarks } = useSelector((state) => state.bookmarks);
    const isBookMarked = bookmarks.some((post) => post._id === data._id);
    const Div = styled('div')(({ theme }) => ({
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    }));
    const { isLoggedIn } = useSelector((state)=>state.auth);

    useEffect(()=>{
      dispatch(getAllUsers());
  },[isLoggedIn,dispatch])

    return(
        <>
        <Box className='postCard' sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardHeader className='card-header' 
                avatar={ <Avatar sx={{ bgcolor: '#1976d2' }}/> }
                action={ 
                  <IconButton aria-label="settings">
                    {data.username === user.username ? <MoreVertIcon /> : null}
              
                  </IconButton>
                  }
                title={data.username}
                subheader="bio" />
            <CardContent>
              <Typography variant="body2">
                {data.content}
              </Typography>
            </CardContent>
            <CardActions className='card-actions'>
            <div>
              {
                data?.likes.likeCount>0 ? 
                <IconButton onClick={()=>{
                  dispatch(removeLiked({token,data}))}}>
                <FavoriteSharpIcon color='primary' />
              </IconButton> 
              :
              <IconButton onClick={()=>{
                dispatch(addLiked({token,data}))}}>
                <FavoriteBorderSharpIcon color='primary' />
              </IconButton>

              }
              <Div className='likeCount'>{data.likes.likeCount}</Div>
              
              <IconButton>
                <ChatBubbleOutlineOutlinedIcon color='primary'/>
              </IconButton>
            </div>
            <div>
              {
                isBookMarked ?
                <IconButton onClick={()=>{
              dispatch(removeBookmark({token,data}))}}>
                <BookmarkOutlinedIcon color='primary'/>
              </IconButton>
              : 
              <IconButton onClick={()=>{
              dispatch(addBookmark({token,data}))}}>
                <BookmarkBorderOutlinedIcon color='primary'/>
              </IconButton>
              }
            </div>
        
              </CardActions>
            </React.Fragment>
          </Card>
        </Box>
        </>
    )
}