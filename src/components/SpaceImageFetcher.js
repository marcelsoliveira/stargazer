import React from 'react';
import axios from "axios";

class SpaceImageFetcher extends React.Component {
    constructor() {
        super()
        this.fetchImage = this.fetchImage.bind(this);
    }
    async fetchImage(date) {
        let datepicker_date = date
        // NASA API link
        let queryUrl = "https://api.nasa.gov/planetary/apod?";
        // API DEMO KEY
        let queryKey = "api_key=DaFi4M1aSffvFg0EGzfCxWruc6FyhR7wStWMPtxf&";
        // Selected date
        let queryDate = "date=" + datepicker_date + "&";
        // Full query
        let queryFull = queryUrl + queryKey + queryDate;
        await axios.get(queryFull).then((response) => {this.props.spaceData(response.data);}).catch((error) => {console.log(error); this.props.onError()});
    }
    render() {
        return null;
    }
}

export default SpaceImageFetcher;