import React, { useEffect, useState } from 'react'
import './Feed.css'
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'
import axios from '../axios'
import Pusher from 'pusher-js'





 const pusher = new Pusher('c397d07b35dad43ab500', {
      cluster: 'eu'
    });

const Feed = () => {
    const [profilePic, setProfilePic] = useState('')
    const [postsData, setPostsData] = useState([])


    const syncFeed = () =>{
  axios.get('/retrieve/post')
  .then((res)=>{
    console.log(res.data)
    setPostsData(res.data)
  })
}


useEffect(()=>{
 var channel = pusher.subscribe('posts');
    channel.bind('inserted', function(data) {
    syncFeed()
    });

},[])



useEffect(()=>{
  syncFeed()
},[])



    return (
        <div className='feed' >
            <StoryReel />
            <MessageSender />

            {
                postsData.map(entry => (
                    <Post
                        profilePic={entry.avatar}
                        message={entry.text}
                        timestamp={entry.timestamp}
                        imgName={entry.imgName}
                        username={entry.user}
                    />
                ))
            }
        </div>
    )
}

export default Feed