import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import corelDraw from '../staticIMG/corelDraw.png';
import figma from '../staticIMG/logo-figma.png';
import reactLogo from '../staticIMG/reactLogo.png';
import resume from '../staticIMG/Resume.pdf';
import './css/aboutMe.css';

export const AboutMe = () => {
  return (
    <>
        <div className='about'>
          <div className='body-content'>
              <div><h2 id='main-03'>#03 About Me</h2></div>
              <div>
                      <div className='about-text'>                        
                          <span>My name is Adewale, I am a 23year old FrontEnd Developer 
                          and UI Designer with software skills/knowledge like;</span>
                      </div>
                      <div className='about-skills'>   
                          <div className='card-element'>
                            <Card className='card-styling'>
                              <Card.Img variant="top" src={corelDraw} />
                              <Card.Body>
                                <Card.Title className='card-title'>Product Designer:</Card.Title>
                                <Card.Text className='card-text'>
                                  <span> 5+years experience using CorelDraw Graphics Suit in rebranding businesses </span>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                          <div className='card-element'>
                            <Card className='card-styling'>
                              <Card.Img variant="top" src={reactLogo}  />
                              <Card.Body>
                                <Card.Title className='card-title'>FrontEnd Web Development:</Card.Title>
                                <Card.Text className='card-text'>
                                  <span> 2+years experience designing and giving web users great web experiences</span>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                          <div className='card-element'>
                            <Card className='card-styling'>
                              <Card.Img variant="top" src={figma} />
                              <Card.Body>
                                <Card.Title className='card-title'>UI Design: </Card.Title>
                                <Card.Text className='card-text'>
                                  <span>1+ year designing Cool and practical User Interface</span>
                                </Card.Text>                                
                              </Card.Body>
                            </Card>
                          </div>  
                    </div>                    
                    <div className='about-text-02'>
                          <span>I am also a science and technology 
                            enthusiast with love for afro-music, movies and any content that 
                            would make me laugh. 
                            <div>  
                              <div className='status'>CURRENT STATUS:</div>                          
                              I am currently on a schorlaship at Udacity for Cloud Dev 
                              and a student of Electrical and Electronics Engineering at the University of Ilorin
                            </div>
                          </span>
                    </div>                   
                    <div className='resume-download'>
                          <a href={resume} download="Adewale's Resume">DOWNLOAD MY RESUME</a>
                    </div>
              </div>   
          </div>
        </div>
    </>
  );
}

export default AboutMe;
