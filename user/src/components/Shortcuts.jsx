import "../css/shortcuts.css";
import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { faClipboard, faFolderTree, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Shortcuts = () => {
    return (
        <Fragment>
            <section className='section-shortcuts'>
                <Link to="/users/my-operations">
                    <div className='div-shortcuts' id="operations-shortcut"><FontAwesomeIcon icon={faClipboard} /></div>
                    <small className="small-shortcuts">Operations</small></Link>
                <Link to="/users/my-operations/new">
                    <div className='div-shortcuts' id="new-operation-shortcut"><FontAwesomeIcon icon={faPlus} /></div>
                    <small className="small-shortcuts">New operation</small>
                </Link>
                <Link to="/users/my-categories">
                    <div className='div-shortcuts' id="categories-shortcut"><FontAwesomeIcon icon={faFolderTree} /></div>
                    <small className="small-shortcuts">Categories</small>
                </Link>
                <Link to="/users/profile">
                    <div className='div-shortcuts' id="new-category-shortcut"><FontAwesomeIcon icon={faUser} /></div>
                    <small className="small-shortcuts">Profile</small>
                </Link>
            </section>
        </Fragment>
    )
}

export default Shortcuts;