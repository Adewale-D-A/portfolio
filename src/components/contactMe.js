import React from 'react';
import gitHub from '../staticIMG/GitHub-Mark.png';
import twitter from '../staticIMG/twitter.png';
import IG from '../staticIMG/ig.png';
import './css/contactMe.css';

export const ContactMe = () => {
  return (
    <>
      <div className='contact-me-main'>
        <div>
            <h1 id='main-04'>#04 Contact Me</h1>
        </div>
        <div className='dial-details'>
          <h1>+234 705 6944 506</h1>
          <h1>adewale.d.a@outlook.com</h1>
        </div>
        <div className='contact-links'>          
          <div className='contact-icons'>
            <a href='https://github.com/Adewale-D-A'>
                <img src={gitHub} alt='github-profile' className='ind-icons'/>
            </a>
          </div>          
          <div className='contact-icons'>
            <a href='https://www.instagram.com/codedbynature/'>
                <img src={twitter} alt='github-profile' className='ind-icons'/>
            </a>
          </div>                   
          <div className='contact-icons'>
            <a href='https://https://twitter.com/SignatureName'>
                <img src={IG} alt='github-profile' className='ind-icons'/>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactMe;
