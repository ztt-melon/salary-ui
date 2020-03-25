import React, { PureComponent } from 'react'
import { Button, Card } from 'antd'
import {Input} from 'nowrapper/lib/antd'
import Form, { FormItem, FormCore } from 'noform'
class DicQuery extends PureComponent{
    constructor(props) {
        super(props);
        this.core = new FormCore()
    }
    handleOperator = ()=>{
        this.props.setSearchParam(this.core.getValues(),this.props.callback)
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleEnterKey)
    }
    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.handleOperator()
        }
    }

    render(){
        return <Card>
            <Form core={this.core} inline defaultMinWidth={false}>
                <FormItem label="类目" name="flag"><Input /></FormItem>
                <FormItem className="marginLeft10" label="名称" name="name"><Input /></FormItem>
                <Button className="marginLeft20" type="primary" icon="search" onClick={this.handleOperator}>查询</Button>
            </Form>
        </Card>
    }
}

export default DicQuery
