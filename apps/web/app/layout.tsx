import "./global.css"
import React from 'react';
import {NavBar} from '@/components/navBar';
import {Modal} from '@/components/modal';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="light">
        <body className="scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-neutral scrollbar-thumb-rounded-xl">
        <NavBar/>
        <>
            {children}
        </>
        <Modal/>
        </body>
        </html>
    );
}
