import React, {PureComponent} from 'react'
import Form, {FormItem, FormCore} from 'noform'
import {Checkbox} from 'nowrapper/lib/antd'
import {ajax, urls, Functions} from '../../util'

const {Group: CheckboxGroup} = Checkbox

class AuthorizeForm extends PureComponent {
    state = {
        permissions: []
    }

    constructor(props) {
        super(props)
        this.core = new FormCore()
    }

    params = {...this.props.params}

    componentWillMount() {
        //预加载数据
        ajax.get_callback(urls.rolePermission.editView, {roleId: this.params.selectedItem.id}, (realData) => {
            this.setState({permissions: realData})
        })
    }

    renderPermissions = data => data.map((item) => {
        return (
            <FormItem label={item.name} name={'permissionIds_' + item.id} value={item.checkValues} key={item.id}>
                <CheckboxGroup options={item.permissionList} className="newLine"/>
            </FormItem>
        )
    })

    render() {
        return <Form core={this.core} layout={Functions.setFormLayout(6, 18)}>
            {this.renderPermissions(this.state.permissions)}
        </Form>
    }
}

export default AuthorizeForm
