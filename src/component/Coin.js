import React, { Component } from 'react';

class Coin extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount(){
        console.log(this.props);
    }
    render(){
        return(
            <div className="container">

            </div>
        )
    }

}

export default Coin;