import React, { Component } from 'react'

export default class tab extends Component {
    render() {
        return (
            <div>
                tab{this.props.match.params.myid}
            </div>
        )
    }
}
