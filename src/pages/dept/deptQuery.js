import React, { PureComponent } from 'react'
import {Card } from 'antd'
import {Button,Input} from 'nowrapper/lib/antd'
import Form, { FormItem, FormCore } from 'noform'
class DeptQuery extends PureComponent{
    constructor(props) {
        super(props);
        this.core = new FormCore()
    }

     handleOperator = ()=>{
        console.log("dept",this.core.getValues())
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
                <Form core={this.core}  inline defaultMinWidth={false}>
                    <FormItem label="部门名称" name="name"><Input /></FormItem>
                    <Button className="marginLeft10" type="primary" icon="search" onClick={this.handleOperator}>查询</Button>
                </Form>
        </Card>
    }
}

export default DeptQuery
