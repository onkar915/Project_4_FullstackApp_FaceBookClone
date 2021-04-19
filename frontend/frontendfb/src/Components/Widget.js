import React from 'react';
import './Widget.css';
//facebook iframe
function Widget() {
  return (
    <div className='widgets'>
      <iframe
        src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2FWHO&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=398873597894888'
        width='340'
        height='100%'
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling='no'
        frameborder='0'
        allowTransparency='true'
        allow='encrypted-media'
      ></iframe>
    </div>
  );
}

export default Widget;
