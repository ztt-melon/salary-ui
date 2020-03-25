import React, {PureComponent} from 'react'
import {Row, Col, Tree} from 'antd'
import Form, {FormItem, FormCore} from 'noform'
import {Checkbox} from 'nowrapper/lib/antd'
import {ajax, urls, Functions} from '../../util'

const {TreeNode} = Tree
const {Group: CheckboxGroup} = Checkbox

class BindForm extends PureComponent {
    state = {
        treeSelectData: [],
        expandedKeys: [],
        checkedKeys: [],
        userDeptList: []
    }

    constructor(props) {
        super(props)
        this.core = new FormCore()
    }

    params = {...this.props.params}

    componentWillMount() {
        //预加载数据
        ajax.get_callback(urls.roleUser.editView, {roleId: this.params.selectedItem.id}, (realData) => {
            this.setState({treeSelectData: realData.treeSelectData})
            this.setState({expandedKeys: realData.expandedKeys})
            this.setState({checkedKeys: realData.checkedKeys})
            this.setState({userDeptList: realData.userDeptList})
        })
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item} checked={true}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            )
        }
        return <TreeNode {...item} />
    })

    renderUsers = data => data.map((item) => {
        return (
            <FormItem label={item.deptName} name={'userIds_' + item.deptId} value={item.checkUserValues}
                      key={item.deptId}>
                <CheckboxGroup options={item.users} className="newLine"/>
            </FormItem>
        )
    })

    onCheck = (checkedKeys) => {
        this.setState({checkedKeys})
        ajax.get_callback(urls.roleUser.editViewDept, {
            roleId: this.params.selectedItem.id,
            deptIds: checkedKeys.join(',')
        }, (realData) => {
            this.setState({userDeptList: realData})
        })
    }

    render() {
        return <Form core={this.core} layout={Functions.setFormLayout(6, 18)}>
            <Row>
                <Col span={5}>
                    <Tree
                        checkable
                        checkedKeys={this.state.checkedKeys}
                        expandedKeys={this.state.expandedKeys}
                        onCheck={this.onCheck}
                    >
                        {this.renderTreeNodes(this.state.treeSelectData)}
                    </Tree>
                </Col>
                <Col span={19}>
                    {this.renderUsers(this.state.userDeptList)}
                </Col>
            </Row>
        </Form>
    }
}

export default BindForm
