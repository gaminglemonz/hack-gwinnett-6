import { useEffect, useRef, useState } from 'react'
import *  as faceapi from 'face-api.js'

interface Eye {
    x: number,
    y: number,
}
const constrain = (val: number, min: number, max: number) => Math.max(Math.min(max, val), min)
const FaceDetection = () => {
    const [eyes, setEyes] = useState<Eye[]>([{ x: 0, y: 0 }, { x: 0, y: 0 }]);
    const [width, setWidth] = useState<number>(600);
    const [height, setHeight] = useState<number>(600);
    const [pointerX, setPointerX] = useState<number>(0);
    const [pointerY, setPointerY] = useState<number>(0);
    const [initPointerX, setInitPointerX] = useState<number>(0);
    const [initPointerY, setInitPointerY] = useState<number>(0);
    const [sensitivity, setSensitity] = useState<number>(1.2);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    console.log('Initialized Face Recog')
    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        (async () => {
            const modelPath = '../models'
            await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
            await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
            
            const video = videoRef.current;
            const canvas = canvasRef.current;

            navigator.mediaDevices.getUserMedia({ video: {} })
                .then(stream => {
                    if (videoRef.current !== null) videoRef.current.srcObject = stream;
                })
                .catch(err => console.error('Error streaming:', err));
            
                video?.addEventListener('play', () => {
                    setInterval(async () => {
                        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
                        const resizedDetections = faceapi.resizeResults(detections, { width: video.width, height: video.height });

                        const ctx = (canvas as HTMLCanvasElement).getContext('2d');
                        
                        window.addEventListener('keydown', () => {
                            if (canvas !== null) ctx?.clearRect(0, 0, canvas.width, canvas.height);
                            faceapi.draw.drawDetections(canvas as HTMLCanvasElement, resizedDetections);
                            faceapi.draw.drawFaceLandmarks(canvas as HTMLCanvasElement, resizedDetections);
                        });
                        

                        resizedDetections.forEach(detection => {
                            const chinPoint = detection.landmarks.getJawOutline()[8];
                            const leftEye = detection.landmarks.getLeftEye();
                            const rightEye = detection.landmarks.getRightEye();
                            
                            if (!initPointerX || !initPointerY){
                                setInitPointerX(chinPoint.x);
                                setInitPointerY(chinPoint.y);
                            }
                            
                            setPointerX(initPointerX - (initPointerX - chinPoint.x * sensitivity) - 100);
                            setPointerY(initPointerY - (initPointerY - chinPoint.y * sensitivity) - 100);
                            console.log(pointerX)
                        });
                    }, 100);
                });
        })();
    }, []);

    return (
        <>
            <div>
                <video  className='invisible fixed top-0 left-0 pointer-events-none'ref={videoRef} width={width} height={height} autoPlay></video>
                <canvas className='fixed top-0 left-0 pointer-events-none' ref={canvasRef} width={width} height={height}></canvas>
            </div>
            <div style={{ position: 'absolute', left: `${pointerX}px`, top: `${pointerY}px` }} className='bg-blue-300 rounded-full w-8 h-8'></div>
        </>
    )
};

export default FaceDetection;