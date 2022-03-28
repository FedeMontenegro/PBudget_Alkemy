import "../css/shortcuts.css";
import React, { Fragment } from 'react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "react-fontawesome"; 

const Shortcuts = () => {
  return (
      <Fragment>
          <section className='section-shortcuts'>
              <div className='div-shortcuts'><i className="fa-solid fa-wallet"></i></div>
              <div className='div-shortcuts'><i className="fa-brands fa-google-wallet"></i></div>
              <div className='div-shortcuts'><FontAwesomeIcon icon="fa-brands fa-google-wallet" /></div>
              <div className='div-shortcuts'>1</div>
              <div className='div-shortcuts'>1</div>
              <div className='div-shortcuts'>1</div>
          </section>
      </Fragment>
  )
}

export default Shortcuts;