import React from 'react';
import './css/nav-bar.css';
import logo from '../staticIMG/logo.png';

export const NavBar = () => {
  return (
    <>
        <div className='nav-components'>
            <div className='nav-items'>                
                <div className='logo-item'>
                    <img src={logo} alt="logo"/>
                </div>
                <div className='nav-bar-links-container'>     
                    <div className='nav-text'>
                        <a href=''>                            
                            <p>Home</p>
                        </a>
                    </div>
                    <div className='nav-text'>
                        <a href='#main-01'>                            
                            <p>Projects</p>
                        </a>
                    </div>
                    <div className='nav-text'>
                        <a href='#main-03'>                            
                            <p>About Me</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default NavBar;
