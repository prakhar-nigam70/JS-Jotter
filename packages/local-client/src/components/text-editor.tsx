import './text-editor.css'
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';

interface TextEditorProps{
    cell: Cell
}

export const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const {updateCell} = useActions()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && event.target && ref.current.contains(event.target as Node)){
                return;
            }
            setEditing(false);
        }

        document.addEventListener('click', handleClickOutside, {capture: true});

        return () => {
            document.removeEventListener('click', handleClickOutside, {capture: true})
        }
    }, [])

    if(editing){
        return (
            <div className='text-editor' ref={ref}>
                <MDEditor value={cell.content} onChange={(val) => updateCell(cell.id, val || '')}/>
            </div>
        )
    }

  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
        <div className='card-content'>
            <MDEditor.Markdown source={cell.content || 'Click here to start editing...'}/>
        </div>
    </div>
  )
}
