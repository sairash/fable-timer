"use client"

import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import CountDownContainer from './CountDownContainer';

const PictureInPictureDiv = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);

  useEffect(() => {
    setIsPiPSupported('pictureInPictureEnabled' in document);

    const div = divRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!div || !canvas || !video) return;

    let animationFrameId: number;
    let isMounted = true;

    const captureAndUpdate = async () => {
      if (!isMounted) return;

      try {
        // take div and make it into canvas and then convert it into video (magic)
        const capturedCanvas = await html2canvas(div);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = capturedCanvas.width;
        canvas.height = capturedCanvas.height;
        ctx.drawImage(capturedCanvas, 0, 0);

        // ~10fps throttle becuase it's just timer
        setTimeout(() => {
          animationFrameId = requestAnimationFrame(captureAndUpdate);
        }, 100);
      } catch (error) {
        console.error('Error capturing div:', error);
      }
    };

    // loop it
    captureAndUpdate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 10 FPS Because timer :)
    const stream = canvas.captureStream(10); 
    video.srcObject = stream;
    video.play();

    const handlePiPClose = () => setIsPiPActive(false);
    video.addEventListener('leavepictureinpicture', handlePiPClose);

    return () => {
      video.removeEventListener('leavepictureinpicture', handlePiPClose);
    };
  }, []);

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video || !isPiPSupported) return;

    try {
      if (!document.pictureInPictureElement) {
        await video.requestPictureInPicture();
        setIsPiPActive(true);
      } else {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      }
    } catch (error) {
      console.error('PiP failed:', error);
    }
  };

  return (
    <div>
      <div
        ref={divRef}
        style={{
          color: 'white',
          backgroundColor: 'red'
        }}
        className='bg-base p-20 w-md '
      >
        <CountDownContainer />
      </div>

    
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <video ref={videoRef} style={{ display: 'none' }} muted />

      
      <button
        onClick={togglePiP}
        disabled={!isPiPSupported}
        style={{ marginTop: '20px' }}
      >
        {isPiPActive ? 'Close PiP' : 'Open PiP'}
      </button>

      {!isPiPSupported && (
        <p>Picture-in-Picture is not supported in your browser</p>
      )}
    </div>
  );
};

export default PictureInPictureDiv;