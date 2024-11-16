type ButtonAction = 'moveUp' | 'moveDown' | 'delete';
type ButtonVersion = 'primary' | 'warning' | 'danger' | 'success' | 'info';

interface ActionBarButtonProps{
    version: ButtonVersion;
    action: ButtonAction;
    handler: React.MouseEventHandler 
}


const ActionBarButton: React.FC<ActionBarButtonProps> = ({version, action, handler}) => {
    let iconType;
    if(action === 'moveUp'){
        iconType = 'fas fa-arrow-up'
    }else if(action === 'moveDown'){
        iconType = 'fas fa-arrow-down'
    }else{
        iconType = 'fas fa-times'
    }

  return (
    <button className={`button is-${version} is-small`} onClick={handler}>
        <span className="icon">
            <i className={iconType}/>
        </span>
    </button>
  )
}

export default ActionBarButton;
