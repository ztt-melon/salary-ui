import React, {PureComponent} from 'react'
import {Card, Col, Row} from 'antd'
import Form, {FormItem, FormCore} from 'noform'
import {Input, Select, TreeSelect} from 'nowrapper/lib/antd'
import {Constants, Functions, validate, urls, ajax} from '../../util'

const {CREATE, DETAIL, status_normal, form_status_disabled} = Constants

//layout
let {ColProps, FormItemProps} = Functions.getFormLayoutProps(2)


class UserForm extends PureComponent {
    state = {
        categoryOptions: [],
        deptTreeData: [],
        giveModeOptions: [{label: "站发", value: "站发"}, {label: "院发", value: "院发"}]
    }

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.user});
    }

    params = {...this.props.params}

    componentWillMount() {
        //预加载数据
        //职工类别
        ajax.get_callback(urls.dic.flagData, {flag: '职工类别'}, (category) => {
            this.setState({categoryOptions: category})
        })
        //部门
        ajax.get_callback(urls.dept.treeSelectData, {}, (realData) => {
            this.setState({deptTreeData: realData})
        })
        //在职状态
        ajax.get_callback(urls.dic.flagData, {flag: '用户在职状态'}, (category) => {
            this.setState({jobOptions: category})
        })

        if (this.params.type === CREATE) {
            //先重置，再初始化默认值
            this.core.reset()
            this.core.setValues({
                org: '航天海鹰安全',
                job: '在职',
                stauts: status_normal,
                sort: 0
            })
            this.core.setStatus({'pwd': form_status_disabled})
        } else {
            this.core.setStatus({'pwd': form_status_disabled})
            this.core.setValues({...this.params.selectedItem})
            if (this.params.type === DETAIL) this.core.setGlobalStatus('preview')
        }
    }

    render() {
        return <Form core={this.core}>
            <FormItem className="hidden" name="id"><Input/></FormItem>
            <FormItem className="hidden" label="部门名称" name="deptName"><Input style={{width: 172}}/></FormItem>
            <Card>
                <Row gutter={8}>
                    <Col {...ColProps}>
                        <FormItem label="姓名" name="name" {...FormItemProps}><Input style={{width: 172}}/></FormItem>
                    </Col>
                    <Col {...ColProps}>
                        <FormItem label="密码" name="pwd" {...FormItemProps}><Input style={{width: 172}}/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="职工编号" name="num" {...FormItemProps}><Input style={{width: 172}}/></FormItem>
                    </Col>
                    <Col {...ColProps}>
                        <FormItem label="职工类别" name="category" {...FormItemProps}><Select
                            options={this.state.categoryOptions}
                            style={{width: 172}}/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="所属部门" name="deptId" {...FormItemProps}><TreeSelect style={{width: 172}}
                                                                                            treeData={this.state.deptTreeData}
                                                                                            treeDefaultExpandAll
                                                                                            onSelect={(value, node) => {
                                                                                                this.core.setValue('deptName', node.props.title)
                                                                                            }}/></FormItem>
                    </Col>
                    <Col {...ColProps}>
                        <FormItem label="单位名称" name="org" {...FormItemProps}><Input style={{width: 172}}/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="身份证号" name="idNum" {...FormItemProps}><Input style={{width: 172}}/></FormItem>
                    </Col>
                    <Col {...ColProps}>
                        <FormItem label="手机" name="mobile" {...FormItemProps}><Input style={{width: 172}}/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="在职状态" name="job" {...FormItemProps}><Select
                            options={this.state.jobOptions}
                            style={{width: 172}}/></FormItem>
                    </Col>
                    <Col {...ColProps}>
                        <FormItem label="发放方式" name="giveMode" {...FormItemProps} defaultValue={'站发'}><Select
                            options={this.state.giveModeOptions}
                            style={{width: 172}}/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="银行账号" name="bankAccount" {...FormItemProps}><Input
                            style={{width: 250}}/></FormItem>
                    </Col>
                </Row>
                {/*                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="在职状态" name="job" {...FormItemProps}><Select
                            options={this.state.jobOptions}
                            style={{width: 172}}/></FormItem>
                    </Col>
                </Row>*/}
                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="排序" name="sort" {...FormItemProps}><Input style={{width: 172}}/></FormItem>
                    </Col>
                </Row>
                <Row gutter={8} className="marginTop">
                    <Col {...ColProps}>
                        <FormItem label="备注" name="comment" {...FormItemProps}><Input.TextArea
                            style={{width: 250}}/></FormItem>
                    </Col>
                </Row>
            </Card>
        </Form>
    }
}

export default UserForm

