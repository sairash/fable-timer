"use client";

import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import CountDownContainer from './CountDownContainer';



const PictureInPictureDiv = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const animationFrameRef = useRef<number>(0);

  const handlePiPClose = () => setIsPiPActive(false);

  useEffect(() => {
    setIsPiPSupported('pictureInPictureEnabled' in document);
    
    const div = divRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!div || !video || !canvas) return;

    canvas.width = div.clientWidth;
    canvas.height = div.clientHeight;

    video.addEventListener('leavepictureinpicture', handlePiPClose);

    return () => {
      video.removeEventListener('leavepictureinpicture', handlePiPClose);
    };
  }, []);

  const startPip = () => {
    setTimeout(async()=>{
      if(!isPiPActive) return
      const div = divRef.current;
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!div || !canvas || !video) return;

      try {
        const capturedCanvas = await html2canvas(div, {
          logging: false,
          useCORS: true,
          allowTaint: false,
        });
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        canvas.width = capturedCanvas.width;
        canvas.height = capturedCanvas.height;
        ctx.drawImage(capturedCanvas, 0, 0);
      } catch (error) {
        console.error('Error capturing div:', error);
      }
    }, 100)
  };

  const togglePiP = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!video || !isPiPSupported || !canvas) return;

    try {
      if (!document.pictureInPictureElement) {
        setIsPiPActive(true);
        startPip();

        const stream = canvas.captureStream(1); 
        video.srcObject = stream;

        await new Promise<void>((resolve) => {
          video.addEventListener('loadedmetadata', () => resolve(), { once: true });
        });

        await video.play();
        await video.requestPictureInPicture();
      } else {
        cancelAnimationFrame(animationFrameRef.current);
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      }
    } catch (error) {
        setIsPiPActive(false);
        console.error('PiP failed:', error);
    }
  };



  return (
    <div>
      <div
        ref={divRef}
        style={{
          color: 'black',
          backgroundColor: 'white',
        }}
        className='bg-base p-20 w-md'
      >
        <CountDownContainer tick={startPip} />
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <video
        playsInline
        crossOrigin="anonymous"
        ref={videoRef}
        style={{ display: 'none' }}
        muted
      />

      <br />
      <button
        onClick={togglePiP}
        disabled={!isPiPSupported}
        style={{ marginTop: '20px' }}
      >
        {isPiPActive ? 'Close PiP' : 'Open PiP'}
      </button>

      {!isPiPSupported && <p>Picture-in-Picture is not supported in your browser</p>}
    </div>
  );
};


export default PictureInPictureDiv;