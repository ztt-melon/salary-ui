import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Input} from 'nowrapper/lib/antd'
import {Constants, Functions, validate} from '../../util'

const {CREATE, DETAIL} = Constants

class RoleForm extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.role});
    }

    params = {...this.props.params}

    componentWillMount() {
        if (this.params.type === CREATE) {
            //先重置，再初始化默认值
            this.core.reset()
        } else {
            this.core.setValues({...this.params.selectedItem})
            if (this.params.type === DETAIL) this.core.setGlobalStatus('preview')
        }
    }

    render() {
        return <Form core={this.core} layout={Functions.setFormLayout(6, 18)}>
            <FormItem className="hidden" name="id"><Input/></FormItem>
            <FormItem label="角色名称" name="name"><Input/></FormItem>
            <FormItem label="备注" name="comment"><Input.TextArea/></FormItem>
        </Form>
    }
}

export default RoleForm