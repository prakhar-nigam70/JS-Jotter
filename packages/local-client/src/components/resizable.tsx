import './resizable.css'
import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps{
    direction: 'vertical' | 'horizontal';
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;
        const resizeHandler = () => {
            if(timer) clearInterval(timer);

            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if(window.innerWidth * 0.75 < width){
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100)
        }

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [width])

    let resizableProps: ResizableBoxProps;
    if(direction === 'horizontal'){
        resizableProps = {
            className: "resize-horizontal",
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            width,
            height: Infinity,
            resizeHandles: ['e'],
            onResizeStop(e, data) {
                setWidth(data.size.width);
            },
        }
    }else{
        resizableProps = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 40],
            width: Infinity,
            height: 400,
            resizeHandles: ['s']
        }
    }
  return (
    <ResizableBox {...resizableProps}>
        {children}
    </ResizableBox>
  )
}

export default Resizable