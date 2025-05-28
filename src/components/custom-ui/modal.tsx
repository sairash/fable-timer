import {ReactNode, useCallback, useEffect} from "react";


function modal({close, title, children}: {close: ()=>void, title: string, children: ReactNode}) {

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            close();
        }
    }, []);

    useEffect(()=>{

       document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }

    }, [])

    return (
        <>
            <div className="fixed w-full px-2 h-full max-w-md max-h-100   left-1/2 top-1/2" style={{transform: `translate(-50%, -50%)`, zIndex: 1000,}}>
                <div className="px-4 h-full w-full py-2 bg-white rounded flex flex-col">
                    <b className="py-1">{title}</b>
                    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                        {children}
                    </div>
                </div>
            </div>
            <div onClick={close} className="fixed top-0 left-0 w-screen h-screen cursor-pointer" style={{zIndex: 999, backgroundColor: "rgba(0,0,0, 0.5)",}}></div>
        </>
    )
}

export default  modal;