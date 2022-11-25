import React from "react";
import './modal.css'



const Modal = ({ modalActive, setModalActive, deletePost, id }) => {
    
    return (
        <>
            <div id="modal" className={modalActive ? "show" : "hide"}>
                <p className="message">Are you sure?</p>
                <div className="options">
                    <button onClick={() => {
                        deletePost(id)
                        setModalActive(false)
                    }
                    } className="btn1">Yes</button>
                    <button onClick={setModalActive} className="btn1">No</button>
                </div>
            </div>
        </>
    )
}

export default Modal;