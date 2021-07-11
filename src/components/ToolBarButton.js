import React from 'react';
import './ToolBarButton.css';

class ToolBarButton extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div className="buttom-container" onClick={this.props.onClick}>
                <img src={this.props.icon} className='buttom-icon'/>
            </div>
        );
    }
}

export default ToolBarButton;