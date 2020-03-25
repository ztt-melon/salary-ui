import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, TreeSelect, Radio} from 'nowrapper/lib/antd'
import {ajax, Constants, Functions, validate, urls} from '../../util'

const {Group: RadioGroup} = Radio
const {CREATE, DETAIL, FALSE, typeValues} = Constants

class PermissionForm extends PureComponent {
    state = {
        permissionTreeData: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.dept});
    }

    params = {...this.props.params}

    componentWillMount() {
        //预加载数据
        ajax.get_callback(urls.permission.treeSelectData, {}, (realData) => {
            this.setState({permissionTreeData: realData})
        })
        if (this.params.type === CREATE) {
            //先重置，再初始化默认值
            this.core.reset()
            this.core.setValues({
                sort: 0
            })
        } else {
            this.core.setValues({...this.params.selectedItem})
            if (this.params.type === DETAIL) this.core.setGlobalStatus('preview')
        }
    }

    render() {
        return <Form core={this.core} layout={Functions.setFormLayout(6, 18)}>
            <FormItem className="hidden" name="id"><Input/></FormItem>
            <FormItem label="权限名称" name="name"><Input style={{width: 172}}/></FormItem>
            <FormItem label="上级权限" name="pid"><TreeSelect style={{width: 172}} treeData={this.state.permissionTreeData}
                                                          onSelect={(value, node, extra) => {
                                                              this.core.setValue('pname', node.props.title)
                                                          }}/></FormItem>
            <FormItem className="hidden" name="pname"><Input/></FormItem>
            <FormItem label="前端URL" name="url"><Input style={{width: 172}}/></FormItem>
            <FormItem label="图标" name="icon"><Input style={{width: 172}}/></FormItem>
            <FormItem label="类型" name="type"><RadioGroup options={typeValues}/></FormItem>
            <FormItem label="排序" name="sort" defaultMinWidth={FALSE}
                      layout={Functions.setFormLayout(6, 4)}><Input/></FormItem>
        </Form>
    }
}

export default PermissionForm