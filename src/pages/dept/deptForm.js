import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, TreeSelect, Radio} from 'nowrapper/lib/antd'
import {ajax, Constants, Functions, validate, urls} from '../../util'

const {Group: RadioGroup} = Radio
const {CREATE, DETAIL, FALSE, status_normal, statusValues} = Constants

class DeptForm extends PureComponent {
    state = {
        treeSelectData: []
    }

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.dept});
    }

    params = {...this.props.params}

    componentWillMount() {
        //预加载数据
        ajax.get_callback(urls.dept.treeSelectData, {}, (realData) => {
            this.setState({treeSelectData: realData})
        })
        if (this.params.type === CREATE) {
            //先重置，再初始化默认值
            this.core.reset()
            this.core.setValues({
                status: status_normal,
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
            <FormItem label="部门名称" name="name"><Input style={{width: 172}}/></FormItem>
            <FormItem label="上级部门" name="pid"><TreeSelect style={{width: 172}} treeData={this.state.treeSelectData} treeDefaultExpandAll
                                                          onSelect={(value, node, extra) => {
                                                              this.core.setValue('pname', node.props.title)
                                                          }}/></FormItem>
            <FormItem className="hidden" name="pname"><Input/></FormItem>
            <FormItem label="使用状态" name="status"><RadioGroup options={statusValues}/></FormItem>
            <FormItem label="排序" name="sort" defaultMinWidth={FALSE}
                      layout={Functions.setFormLayout(6, 4)}><Input/></FormItem>
            <FormItem label="备注" name="comment"><Input.TextArea style={{width: 172}}/></FormItem>
        </Form>
    }
}

export default DeptForm