import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import UI1 from '../staticIMG/UI1.png';
import UI2 from '../staticIMG/UI2.png';
import UI3 from '../staticIMG/UI3.png';
import UI4 from '../staticIMG/UI4.png';
import UI5 from '../staticIMG/UI5.png';
import './css/myWorkUI.css';

export const MyUIWorks = () => {
  return (
    <>
        <div>
            <h1 id='main-02'>#02 UI Designs</h1>
        </div>
        <div className='webdev'>
            <div>
            <Carousel>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={UI1}
                                    alt="First slide"
                                    />
                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>A UI Mobile Design For A Snack Company</h3>
                                    <p className='carousel-texts'>Home and Welcome Interface</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={UI2}
                                    alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>UI Mockup design done in 2022</h3>
                                    <p className='carousel-texts'>Login and Payment Interface</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={UI3}
                                    alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>This is a shopping UI Mobile Interface</h3>
                                    <p className='carousel-texts'>Pick, View and Order UI interface</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={UI4}
                                    alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>General Display of UI Projects</h3>
                                    <p className='carousel-texts'>Design in Figma and Device frames from deviceframes.com </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100"
                                    src={UI5}
                                    alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                    <h3 className='carousel-header'>A complete View of UI Projects</h3>
                                    <p className='carousel-texts'>Designed in figma and Mobile device mockup from deviceframes.com </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
            </div>
            
        </div>
    </>
  );
}

export default MyUIWorks;
