import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import CountDownContainer from './CountDownContainer';
import ControlButtons from './ControlButtons';
import useMusicModalStore from '@/store/musicStore';



const PictureInPictureDiv = ({play}:{play:() => void}) => {
    const {toggle} = useMusicModalStore();



  const divRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [activatingPip, setActivatingPip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [curButtonState, setCurButtonState] = useState<string[]>([
    "play","music","","picture-in-picture"
  ]);

  const animationFrameRef = useRef<number>(0);

  const handlePiPClose = () => setIsPiPActive(false);

  useEffect(()=>{
    if(isPiPActive){
      setCurButtonState([curButtonState[0], curButtonState[1], curButtonState[2],"picture-in-picture-open"])
    }else{
      setCurButtonState([curButtonState[0], curButtonState[1], curButtonState[2],"picture-in-picture"])
    }
  }, [isPiPActive])

  function toggleTimePlay(){

    setIsPlaying(prev => !prev)

  }

  useEffect(()=>{
    play();
    if(!isPlaying){
      setCurButtonState(["play", curButtonState[1], curButtonState[2],curButtonState[3]])
    }else{
      setCurButtonState(["pause", curButtonState[1], curButtonState[2],curButtonState[3]])
    }
  }, [isPlaying])


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
    setTimeout(async () => {
      if (!isPiPActive) return
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
    }, 10)
  };

  const togglePiPInnerFunction = async () => {
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

  useEffect(()=>{
    togglePiPInnerFunction()
  }, [activatingPip])


  function togglePip(){
    setActivatingPip(prev => !prev)
  }



  function openMusic(){
    toggle()
  }

  function btnEvent(data: string, close: boolean) {
    console.log(data)
    switch (data) {
      case "pip":
        togglePip();
        break;
      case "play":
        toggleTimePlay();
        break;
      case "music":
        openMusic()
        break;
      default:
        break;
    }
  }



  return (
    <div className='h-full w-full'>
      <div className="grid place-items-center h-full w-full">
        <div
          ref={divRef}
          style={{
            color: 'black',
          }}
          className='py-20 '
        >
          <CountDownContainer play={isPlaying} tick={startPip} />
        </div>
        <ControlButtons btnEvent={btnEvent} activeButtons={curButtonState} />
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
      {/* <button
        onClick={togglePiP}
        disabled={!isPiPSupported}
        style={{ marginTop: '20px' }}
      >
        {isPiPActive ? 'Close PiP' : 'Open PiP'}
      </button> */}

      {!isPiPSupported && <p>Picture-in-Picture is not supported in your browser</p>}
    </div>
  );
};


export default PictureInPictureDiv;