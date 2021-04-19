import React, { useState } from 'react';
import './MessageSender.css';
import { Avatar, Input } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';
import db from '../firebase';

import axios from '../axios';
import FormData from 'form-data';

const MessageSender = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  console.log(user);
  //this is how we know the image//uploas store in the use stae
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const imgForm = new FormData();
      imgForm.append('file', image, image.name);

      //let save the image
      axios
        .post('/upload/image', imgForm, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${imgForm._boundary}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const postData = {
            text: input,
            imgName: res.data.filename,
            user: user.displayName,
            avatar: user.photoURL,
            timestamp: Date.now(),
          };

          console.log(postData);
          savePost(postData);
        });
    } else {
      const postData = {
        text: input,

        user: user.displayName,
        avatar: user.photoURL,
        timestamp: Date.now(),
      };
      console.log(postData);
      savePost(postData);
    }

    setImageUrl('');
    setInput('');
    setImage(null);
  };

  const savePost = async (postData) => {
    await axios.post('/upload/post', postData).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className='messageSender'>
      <div className='messageSender__top'>
        <Avatar src={user.photoURL} />
        <form>
          <input
            type='text'
            className='messageSender__input'
            placeholder="What's on your mind?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Input
            type='file'
            className='messageSender__fileSelector'
            onChange={handleChange}
          />
          <button onClick={handleSubmit} type='submit'>
            Hidden Submit
          </button>
        </form>
      </div>
      <div className='messageSender__bottom'>
        <a href='https://www.youtube.com/user/who'>
          <div className='messageSender__option'>
            <VideocamIcon style={{ color: 'red' }} />
            <h3>Live Video</h3>
          </div>
        </a>
      </div>
    </div>
  );
};
//<div className="messageSender__option">
// <PhotoLibraryIcon style={{ color: 'green' }} />
//<h3>Photo/Video</h3>
//</div>
//<div className="messageSender__option">
/// <InsertEmoticonIcon style={{ color: 'orange' }} />
//<h3>Feeling/Activity</h3>
//</div>
export default MessageSender;
