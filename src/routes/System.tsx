import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.tsx'
// import Keyboard from '../components/Keyboard'
import Vitals from '../components/Vitals'
import FaceDetection from '../components/FaceDetection.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const System = (): React.ReactElement => {
    const [curPage, setPage] = useState(0);
    return (
        <>
            <FaceDetection />
            <div className='bg-gray-200
                            m-16 p-16
                            w-[calc(100vw-8rem)] h-[calc(100vh-8rem)]
                            rounded-2xl
                            flex flex-row flex-nowrap items-center justify-between
                            overflow-hidden'>
                <div className='flex flex-col gap-4'>
                    <Navbar />
                </div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Vitals />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
};

export default System;