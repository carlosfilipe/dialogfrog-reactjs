import React from 'react';
import './styles.scss';

export default function Header() {
  return (
    <header>
      <img src="https://dialoguefrog.com/wp-content/uploads/2020/06/cropped-Dialogue-Frog-Logo-500-300x250.jpg" ></img>
      <div className='nav-items'>
        <a className='nav-item' href='#' >Home</a>
        <a className='nav-item' href='#' >List of English Conversations</a>
      </div>
    </header>
  )
}