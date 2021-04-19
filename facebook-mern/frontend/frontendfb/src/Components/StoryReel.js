import React from 'react';
import Story from './Story';
import './StoryReel.css';

function StoryReel() {
  return (
    <div className='storyReel'>
      <a href='https://www.who.int/'>
        <Story
          image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5eimf719lwzDZlLSAY_JWSor79QvnpskKPw&usqp=CAU'
          profileSrc='https://www.barcelonagse.eu/sites/default/files/styles/bgse_image_content_image/public/pages/covid-response.jpg'
          title='Response Center'
        />
      </a>

      <Story
        image=''
        profileSrc='https://pbs.twimg.com/profile_images/875476478988886016/_l61qZdR_400x400.jpg'
        title='WHO'
      />
      <Story
        image='https://images-na.ssl-images-amazon.com/images/I/41zQKTCIBML._SX322_BO1,204,203,200_.jpg'
        profileSrc='https://images-na.ssl-images-amazon.com/images/I/41zQKTCIBML._SX322_BO1,204,203,200_.jpg'
        title='COVID Track'
      />
    </div>
  );
}

export default StoryReel;
