import React from 'react';
import './BackgroundImage.css';
import Loader from './Loader';
import LoaderImage from '../svg/loader.svg';

class BackgroundImage extends React.Component {
    constructor() {
        super()
        this.state = {
            imageUrl : "",
            image: null,
            imageLoaded: false
        }
        this.backgroundImage = React.createRef();
        this.receive = this.receive.bind(this);
        this.unloadImage = this.unloadImage.bind(this);
    }
    receive(url) {
        this.setState({imageLoaded: false}, function() {
            this.setState({imageUrl: url})
        })
    }
    unloadImage() {
        this.setState({imageLoaded: false});
    }
    handleImageLoaded() {
        setTimeout(() => {
            this.setState({imageLoaded: true})
            setTimeout(() => {
                this.props.revealTitle();
            }, 1000);
        }, 2000);
    }
    render() {
        return(
            <div>
                <Loader />
                <img ref={this.backgroundImage} src={this.state.imageUrl} className={this.state.imageLoaded ? 'image' : 'image image-hidden'} onLoad={this.handleImageLoaded.bind(this)}/>
                <div className='vignette'></div> 
                <img src={LoaderImage} className={this.state.imageLoaded ? 'loader-container-hidden loader-container' : 'loader-container'}/>
            </div>            
        );
    }
}

export default BackgroundImage;