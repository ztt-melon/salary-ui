import React, {PureComponent} from 'react'
import {Icon} from 'antd'
import Form, {FormItem, FormCore} from 'noform'
import {Input, Button} from 'nowrapper/lib/antd'
import {validate, ajax, urls, PermissionButton, Constants} from '../../util'
import './login.less'
import Particles from 'react-particles-js'

class Login extends PureComponent {
    state = {}

    constructor(props) {
        super(props);
        this.core = new FormCore({validateConfig: validate.login})
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEnterKey)
    }

    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.core.validate((err) => {
                if (!err) {
                    this.login()
                }
            })
        }
    }

    onClick = () => {
        this.core.validate((err) => {
            if (!err) {
                this.login()
            }
        })
    }

    login = () => {
        ajax.get_callback(urls.user.login, this.core.getValues(), (realData) => {
            //保存用户id
            sessionStorage.setItem("userId", realData.userId + "")
            sessionStorage.setItem("userName", realData.userName)
            //内聘、退休、离休的年月
            sessionStorage.setItem("salNpYearMonth", realData.salNpYearMonth)
            sessionStorage.setItem("salLtxYearMonth", realData.salLtxYearMonth)
            sessionStorage.setItem("salLxYearMonth", realData.salLxYearMonth)
            //保存权限按钮
            PermissionButton.store(realData.buttons)
            window.location.href = Constants.projectName + '/salNp'
        })
    }

    render() {
        return (
            <div className="wrapper">
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 100
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }}/>
                <Form core={this.core} className="login">
                    <div className="loginText">工资核算系统</div>
                    <div className="content">
                        <FormItem name="name"><Input style={{width:217}} autocomplete="off" prefix={<Icon type="user"
                                                                                      style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                     placeholder="中文姓名" size='large'/></FormItem>
                        <FormItem name="pwd"><Input style={{width:217}} type="password" autocomplete="off" prefix={<Icon type="lock"
                                                                                     style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                    placeholder="身份证号后6位"
                                                    size='large'/></FormItem>
                        <FormItem><Button onClick={this.onClick} type="primary"
                                          size={'large'}>登录</Button></FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Login
