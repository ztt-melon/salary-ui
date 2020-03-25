import React, {PureComponent} from 'react'
import Form, {FormCore, FormItem} from 'noform'
import {Divider} from 'antd'
import {Input, TreeSelect} from 'nowrapper/lib/antd'
import {ajax, Constants, Functions, urls} from '../../util'

const {FALSE} = Constants

class DeptRecombineForm extends PureComponent {
    state = {
        data: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore();
    }

    componentWillMount() {
        ajax.get(urls.dept.treeSelectData, {}, this)
    }

    onSelect = (value, node, extra, columnName) => {
        const newValue = node.props.title
        const oldValue = this.core.getValue(columnName) || ''
        if (oldValue) {
            this.core.setValue(columnName, oldValue + "," + newValue)
        } else {
            this.core.setValue(columnName, newValue)
        }
    }

    render() {
        return <Form core={this.core} layout={Functions.setFormLayout(4, 20)}>
            <FormItem label="旧部门" name="oldDept" className="hidden"><Input/></FormItem>
            <FormItem label="新部门" name="newDept" className="hidden"><Input/></FormItem>
            <FormItem label="旧部门" name="oldDeptTmp" defaultMinWidth={FALSE}><TreeSelect treeData={this.state.data}
                                                                                        treeCheckable={true}
                                                                                        treeDefaultExpandAll multiple
                                                                                        style={{width: 400}}
                                                                                        onSelect={(value, node, extra,) => this.onSelect(value, node, extra, 'oldDept')}/></FormItem>
            <FormItem label="新部门" name="newDeptTmp" defaultMinWidth={FALSE}><TreeSelect treeData={this.state.data}
                                                                                        treeCheckable={true}
                                                                                        treeDefaultExpandAll multiple
                                                                                        style={{width: 400}}
                                                                                        onSelect={(value, node, extra,) => this.onSelect(value, node, extra, 'newDept')}/></FormItem>
            <FormItem label="重组原因" name="reason"><Input.TextArea/></FormItem>
            <Divider style={{color: 'red',marginTop:40}}>手动修改[用户管理]中的部门</Divider>
        </Form>
    }
}

export default DeptRecombineForm