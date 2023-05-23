"use client"

import React, {useEffect, useState} from 'react';
import {useDetectClickOutside} from '@/hooks/useDetectClickOutside';
import {ModalEvent} from '@/types/modalEvent';

export const Modal = () => {
    const [content, setContent] = useState<ModalEvent|null>(null)
    const {ref} =  useDetectClickOutside((clickedOutside) => {
        if(clickedOutside){
            setContent(null)
        }
    })

    useEffect(() => {

        function handleModalEvent(e: CustomEvent<ModalEvent>){
            setContent(e.detail)
            console.log(e.detail)
        }

        window.addEventListener('modal', handleModalEvent)

        return () => {
            window.removeEventListener('modal', handleModalEvent)
        }
    }, [])

    return (
        <div ref={ref} className="modal modal-bottom sm:modal-middle"
             style={{visibility: content ? 'visible' : "hidden", opacity: content ? 1 : 0}}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">{content?.title}</h3>
                <p className="py-4">{content?.text}</p>
                {/*<div className="modal-action">*/}
                {/*    <label htmlFor="my-modal" className="btn">Yay!</label>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
