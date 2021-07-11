import React from 'react';
import './Typefaces.css';
import './main.css';
import SpaceImageFetcher from './SpaceImageFetcher';
import BackgroundImage from './BackgroundImage';
import ImageInfo from './ImageInfo';
import ToolBar from './ToolBar'
import RetryPopUpWindow from './RetryPopUpWindow';
import Logo from '../svg/stargazer_logo.svg';

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            title: "",
            author: "",
            explanation: "",
            imageURL: "",
            unmountUI: true,
            nextImageTimeout: null,
            visitedImageList: [],
            errorHappend: false,
            curentImage: 0,
        }
        this.fetcher = React.createRef();
        this.image = React.createRef();
        this.imageInfo = React.createRef();
        this.toolBar = React.createRef();
        this.errorPopUp = React.createRef();

        this.receiveSpaceData = this.receiveSpaceData.bind(this);
        this.revealImageInfoAndToolbar = this.revealImageInfoAndToolbar.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.requestNewImage = this.requestNewImage.bind(this);
        this.startNextImageTimeOut = this.startNextImageTimeOut.bind(this);
        this.unloadUi = this.unloadUi.bind(this);
        this.share = this.share.bind(this);
        this.requestNewImage = this.requestNewImage.bind(this);
        this.previousImage = this.previousImage.bind(this);
        this.handleError = this.handleError.bind(this);
        this.retryConnection = this.retryConnection.bind(this);
        this.retry = this.retry.bind(this);
    }
    componentDidMount() {
        this.fetcher.current.fetchImage("2020-08-23");
        this.state.visitedImageList.push("2020-08-23");
    }
    receiveSpaceData(receivedData) {
        this.image.current.receive(receivedData.url);
        this.setState({title: receivedData.title});
        this.setState({author: receivedData.copyright});
        this.setState({explanation: receivedData.explanation});
        this.setState({imageURL: receivedData.url})
        this.setState({isImageInfoMounted: true});
    } 
    handleError() {
        this.setState({errorHappend: true}, function() {
            this.errorPopUp.current.showErrorPopUp();
        });
    }
    retryConnection() {
        this.errorPopUp.current.hideErrorPopUp();
        setTimeout(() => {
            this.setState({errorHappend: false});
            this.retry();
        }, 1000);
    }
    retry() {
        this.setState({curentImage: 0})
        this.state.visitedImageList = [];
        this.fetcher.current.fetchImage("2020-08-23");
        this.state.visitedImageList.push("2020-08-23");
    }
    nextImage() {
        this.unloadUi();
        setTimeout(() => {
            this.setState({unmountUI: false});
            this.requestNewImage();
        }, 1000);
    }
    previousImage() {
        if(this.state.curentImage > 0) {
            this.unloadUi();
            setTimeout(() => {
                this.setState({unmountUI: false});
                this.requestPreviousImage();
            }, 1000);
        }
    }
    unloadUi() {
        clearTimeout(this.state.nextImageTimeout);
        this.image.current.unloadImage();
        this.imageInfo.current.unmountImageInfo();
        this.toolBar.current.unmountToolbar();
    }
    requestNewImage() {
        let start = new Date(2015, 0, 1)
        let end = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())
        let newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        this.updateVisitedImageList(newDate);
        this.fetcher.current.fetchImage(String(newDate.getFullYear()) + "-" + String(newDate.getMonth()+1) + "-" + String(newDate.getDay()+1));
    }
    requestPreviousImage() {
        console.log(this.state.visitedImageList)
        if(this.state.curentImage > 0) {
            this.fetcher.current.fetchImage(this.state.visitedImageList[this.state.curentImage-1]);
            this.state.visitedImageList.pop();
        }
    }
    updateVisitedImageList(newDate) {
        this.setState({curentImage: this.state.curentImage + 1})
        this.state.visitedImageList.push(String(newDate.getFullYear()) + "-" + String(newDate.getMonth()+1) + "-" + String(newDate.getDay()+1));
    }
    revealImageInfoAndToolbar() {
        this.setState({unmountUI: true});
        this.imageInfo.current.revealImageInfo();
        this.toolBar.current.revealToolbar();
        this.startNextImageTimeOut()
    }
    startNextImageTimeOut() {
        this.setState({nextImageTimeout: setTimeout(() => {
            this.nextImage()
        }, 59000)});
    }
    share() {
        window.location.assign("mailto:?subject="+ this.state.title +"&body="+this.state.explanation+ " Check it out: " + this.state.imageURL);
    }
    render() {
        return(
            <div>
                <SpaceImageFetcher ref={this.fetcher} spaceData={this.receiveSpaceData} onError={this.handleError}/>
                <BackgroundImage ref={this.image} revealTitle={this.revealImageInfoAndToolbar} />
                {this.state.unmountUI && <ImageInfo ref={this.imageInfo} title={this.state.title} author={this.state.author} explanation={this.state.explanation} />}
                {this.state.unmountUI && <ToolBar ref={this.toolBar} onNextImage={this.nextImage} onShare={this.share} onPreviousImage={this.previousImage}/>}
                {this.state.errorHappend && <RetryPopUpWindow ref={this.errorPopUp} onRetry={this.retryConnection} />}
                <img src={Logo} className='logo'/>
            </div>
        );
    }
}

export default Main;