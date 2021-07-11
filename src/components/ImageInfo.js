import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './ImageInfo.css';

class ImageInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            showImageInfo: false
        }
        this.processAuthorData = this.processAuthorData.bind(this);
        this.unmountImageInfo = this.unmountImageInfo.bind(this);
    }   
    processAuthorData() {
        if(this.props.author === undefined) {
            return "Unknown";
        } else {
            return this.props.author;
        }
    }
    processExplanation() {
        return this.props.explanation.split(".").slice(0, 3) + ".";   
    }
    revealImageInfo() {
        this.setState({showImageInfo: true});
    }
    unmountImageInfo() {
        this.setState({showImageInfo: false});
    }
    render() {
        return(
            <CSSTransition in={this.state.showImageInfo} 
                apper={true} 
                timeout={1000} 
                classNames='info-container-transition'
                unmountOnExit
            >
                <div className='info-container'>
                    <div className='title-container'>
                        {this.props.title}
                    </div>
                    <div className='author-container'>
                        by {this.processAuthorData()}
                    </div>
                    <div className='explanation-container'>
                        {this.processExplanation()}
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

export default ImageInfo;