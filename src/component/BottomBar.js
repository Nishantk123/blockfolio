import React, { Component } from 'react';
class BottomBar extends Component{
    componentWillMount(){
        console.log(this.props)
    }
    render(){
        return(
            <div className="bottom-bar-container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="icon"></div>
                        <div className="nav-name">Home</div>
                    </div>
                    <div className="col-sm-3">
                        <div className="icon"></div>
                        <div className="nav-name">Sign</div>
                    </div>
                    <div className="col-sm-3">
                        <div className="icon"></div>
                        <div className="nav-name">Mar</div>
                    </div>
                    <div className="col-sm-3">
                        <div className="icon"></div>
                        <div className="nav-name">News</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default BottomBar;