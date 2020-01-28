import React, { Component } from 'react'

class TodaysFoods extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="columns">
                <div className="column">
                    <li key={this.props.idx}>
                        {this.props.quantity} {this.props.name} = {this.props.calories * this.props.quantity}
                    </li>
                </div>
                <div className="column">
                    <button className="button is-danger is-small is-outlined" onClick={() => this.removeItem(this.props.idx)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default TodaysFoods