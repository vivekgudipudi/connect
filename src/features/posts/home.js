import { useEffect } from 'react';
import { PostCard } from '../../components/postCard';
import { CreatePostCard} from '../../components/createPostCard';
import { useSelector,useDispatch } from 'react-redux';
import { getPosts,getAllUsers } from './postSlice';

import { Avatar,CardHeader,Card } from '../../styles/mui'



export const Home = ()=> {
    const { isLoggedIn } = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const { posts,postsLoader,users } = useSelector((state)=> state.posts);    
    useEffect(()=>{
        dispatch(getPosts());
        dispatch(getAllUsers());
    },[isLoggedIn,dispatch])


    return(
        <>
            <div className="container">
                <section className='section'>
                    <main className='section-main'>
                        <CreatePostCard />
                        <div className='post-section'>
                            { 
                            !postsLoader &&
                                posts.slice().reverse().map((post)=><PostCard key={post._id} data={post} />)
                            }
                        </div>
                    </main>
                    <aside className='section-aside'>
                       { users.map((user)=>(
                       <Card variant="outlined" className='card-users'>
                        <CardHeader className='card-header' 
                            avatar={ <Avatar sx={{ bgcolor: '#1976d2' }} src={user.profileIMG}/> }
                            title={`@${user.username}`}
                            />
                        </Card>
                        )
                        ) }
                    </aside>
                </section>
            </div>
        </>
    )
}