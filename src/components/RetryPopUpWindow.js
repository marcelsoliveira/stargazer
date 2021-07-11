import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './RetryPopUpWindow.css';
import CommunicationError from '../svg/communication-error.svg'

class RetryPopUpWindow extends React.Component {
    constructor() {
        super();
        this.state = {
            showPopUp:false
        }
        this.showErrorPopUp = this.showErrorPopUp.bind(this);
    }
    showErrorPopUp() {
        this.setState({showPopUp: true});
    }
    hideErrorPopUp() {
        this.setState({showPopUp: false});
    }
    render() {
        return(
            <CSSTransition in={this.state.showPopUp} 
                apper={true} 
                timeout={1000} 
                classNames='pop-up-container-transition'
                unmountOnExit
            >
                <div className='pop-up-container'>
                    <div>
                        <img src={CommunicationError} className='pop-up-icon'/>
                    </div>
                    <div className='pop-up-text'>It was not possible to reach the remote service. Please try again.</div>
                    <div className='pop-up-button' onClick={this.props.onRetry}>Retry</div>
                </div>
            </CSSTransition>
            
        );
    }
}

export default RetryPopUpWindow;