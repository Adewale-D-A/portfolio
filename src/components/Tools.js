import React from 'react';
import './css/Tools.css';
import corelDraw from '../staticIMG/corelDraw.png';
import gitHub from '../staticIMG/GitHub-Mark.png';
import gitLab from '../staticIMG/gitlab-logo.png';
import figma from '../staticIMG/logo-figma.png';
import photoshop from '../staticIMG/photoShop.png';
import reactLogo from '../staticIMG/reactLogo.png';
import vdCode from '../staticIMG/vsCode.png';

export const Tools = () => {
  return (
    <>
        <div className='tools-used'>            
            <div className='skill-logo-png'>
                <img src={corelDraw} alt=""/>
                <img src={gitHub} alt=""/>
                <img src={gitLab} alt=""/>
                <img src={reactLogo} alt=""/>
                <img src={vdCode} alt=""/>
                <img src={figma} alt=""/>
                <img src={photoshop} alt=""/>
            </div>
            <div><p className='tool-text'>Tools</p></div>
        </div>
      
    </>
  );
}

export default Tools;
