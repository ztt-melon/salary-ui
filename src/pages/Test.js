import React, {PureComponent} from 'react'

class Test extends PureComponent {
    state = {
        clientHeight: '0px'
    }

    componentDidMount() {
        this.setState({clientHeight: document.body.clientHeight-100})
    }

    render() {
        return <iframe src='http://localhost/druid'
                       style={{border: 0, width: '100%', height: this.state.clientHeight}}
                       frameBorder="0"/>

    }
}

export default Test