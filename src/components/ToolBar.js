import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './ToolBar.css';
import ToolBarButton from './ToolBarButton';
import PieTimer from './PieTimer';
import Next from '../svg/next.svg'
import Previous from '../svg/previous.svg'
import Share from '../svg/share.svg';

class ToolBar extends React.Component {
    constructor() {
        super();
        this.state = {
            showToolbar: false,
        }
        this.revealToolbar = this.revealToolbar.bind(this);
        this.unmountToolbar = this.unmountToolbar.bind(this)
    }
    revealToolbar() {
        this.setState({showToolbar: true});
    }
    unmountToolbar() {
        this.setState({showToolbar: false});
    }
    render() {
        return(
            <CSSTransition in={this.state.showToolbar} 
                apper={true} 
                timeout={1000} 
                classNames='tool-bar-container-transition'
                unmountOnExit
            >
                <div className='tool-bar-container'>
                    <ToolBarButton icon={Share} onClick={this.props.onShare}/>
                    <ToolBarButton icon={Next} onClick={this.props.onNextImage}/>
                    <ToolBarButton icon={Previous} onClick={this.props.onPreviousImage}/>
                    <PieTimer />
                </div>
            </CSSTransition>
        );
    }
}

export default ToolBar;