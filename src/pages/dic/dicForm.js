import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input, Radio,Button} from 'nowrapper/lib/antd'
import {Constants, Functions, validate} from '../../util'

const {Group: RadioGroup} = Radio
const {CREATE, DETAIL, FALSE, status_normal, statusValues} = Constants

class DicForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.dic});
    }

    params = {...this.props.params}

    componentWillMount() {
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
            <FormItem label="类目" name="flag"><Input/></FormItem>
            <FormItem label="名称" name="name"><Input/></FormItem>
            <FormItem label="使用状态" name="status"><RadioGroup options={statusValues}/></FormItem>
            <FormItem label="排序" name="sort" defaultMinWidth={FALSE}
                      layout={Functions.setFormLayout(6, 4)}><Input/></FormItem>
        </Form>
    }
}

export default DicForm
