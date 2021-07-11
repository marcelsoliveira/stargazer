import React from 'react';
import './PieTimer.css';

class PieTimer extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div className="pie-timer-container" onClick={this.props.onClick}>
                <div class="pie-chart">
                </div>
            </div>
        );
    }
}

export default PieTimer;