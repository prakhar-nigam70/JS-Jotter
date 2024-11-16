import './action-bar.css'
import { useActions } from "../hooks/useActions";
import ActionBarButton from "./action-bar-button";

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {moveCell, deleteCell} = useActions()
  return (
    <div className='action-bar'>
        <ActionBarButton version="primary" action="moveUp" handler={() => moveCell(id, 'up')}/>
        <ActionBarButton version="primary" action="moveDown" handler={() => moveCell(id, 'down')}/>
        <ActionBarButton version="warning" action="delete" handler={() => deleteCell(id)}/>
    </div>
  )
}

export default ActionBar;
