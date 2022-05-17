import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import imageOne from '../staticIMG/dreamBiteLandingPage.png';
import imageTwo from '../staticIMG/dreamFuidConceptPage.png';
import imageThree from '../staticIMG/dreamFuidConceptPage2.png';
import imageFour from '../staticIMG/dreamFuidConceptPage2.png';
import './css/myWorks.css';

export const MyWorks = () => {
  return (
    <>
        <div>
            <h1 id='main-01'>#01 Web Development Projects</h1>
        </div>
        <div className='webdev'>
            <div>
            <Carousel>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={imageOne}
                                    alt="First slide"
                                    />
                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>DreamBite Home Page <a href='#iframe-content' className='click-attri'>Click to View in iFrame</a></h3>
                                    <p className='carousel-texts'>This was design back in 2020 using HTML, CSS and JavaSccript</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={imageTwo}
                                    alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>Fuid Concept Architecture Web Site <a href='#iframe-content' className='click-attri'>Click to View in iFrame</a></h3>
                                    <p className='carousel-texts'>Published in 2020</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={imageThree}
                                    alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>Fuid Concept Architecture Web Site <a href='#iframe-content' className='click-attri'>Click to View in iFrame</a></h3>
                                    <p className='carousel-texts'>Another portion of the Fuid Concept Web Page</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={imageFour}
                                    alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>Fuid Concept Architecture Web Site <a href='#iframe-content' className='click-attri'>Click to View in iFrame</a></h3>
                                    <p className='carousel-texts'>Published in 2020 under Dreambite</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
            </div>
            
        </div>
    </>
  );
}

export default MyWorks;
