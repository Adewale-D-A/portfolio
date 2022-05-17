import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/PersonalAchievements.css';

export const PersonalAchievements = () => {
  return (
    <>
        <div className='Accodion-content' id='iframe-content'>
            <div >
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Click to explore my Projects in an iFrame</Accordion.Header>
                        <Accordion.Body>
                            <iframe src='https://dreambite.netlify.app/' title='drambite businesses page' style={{width:'80vw', height: '40vw'}}></iframe>
                            <div>
                                 {/* <p style={{color:'white', fontSize:'50px'}}><a href='https://www.dreambite.netlify.app'>Visit</a></p> */}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>   
    </>
  );
}

export default PersonalAchievements;
