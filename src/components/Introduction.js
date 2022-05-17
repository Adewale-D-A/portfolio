import React from 'react';
import Typical from 'react-typical';
import './css/Introduction.css';

export const Introduction = () => {
  return (
    <>
        <div className='intro-content'>
            <div className='header-content'>                    
                <h2><span className='welcome-text'>Welcome to my Portfolio and CV</span></h2>
            </div>
            <div className='typical-ccontent'>   
                <p>
                    I am
                    <Typical                    
                        loop={Infinity}
                        wrapper="b"
                        steps={[
                            ' Adewale', 
                            5000, 
                            ' a FrontEnd Developer', 
                            5000,
                            ' UI Designer',
                            5000,
                            ' Adewale',
                            5000,
                        ]}
                    />
                </p>
            </div>            
        </div>
    </>
  );
}

export default Introduction;
