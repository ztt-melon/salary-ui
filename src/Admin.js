import React, {PureComponent} from 'react'
import {NavLink} from 'react-router-dom'
import {Layout, Menu, Icon, LocaleProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import {ajax, urls,Constants} from "./util"
import title from './assets/title.jpg'

const {Header, Sider, Content, Footer} = Layout

class Admin extends PureComponent {
    state = {
        // defaultOpenKeys: ['2','15'],
        openKeys: ['2'],
        menus: []
    }

    rootSubmenuKeys = ['2', '15','65']

    componentWillMount() {
        let userId = sessionStorage.getItem("userId")
        if (userId != null) {
            //预加载数据
            ajax.get_callback(urls.permission.navMenu, {userId: parseInt(userId)}, (realData) => {
                this.setState({menus: realData.menus})
                // this.setState({defaultOpenKeys: realData.defaultOpenKeys})
            })
        }
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    renderMenu = data => data.map((item) => {
        if (item.children.length > 0) {
            return (
                <Menu.SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
                    {this.renderMenu(item.children)}
                </Menu.SubMenu>
            )
        }
        return <Menu.Item key={item.key} title={item.name}><NavLink to={Constants.projectName+item.url}>{item.name}</NavLink></Menu.Item>
    })

    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Layout>
                    <Sider width={256} style={{minHeight: '100vh', color: 'white'}}>
                        <span><img src={title} style={{paddingLeft: 40}}/><span
                            style={{paddingLeft: 10, color: 'yellow', fontSize: 20}}>薪·管家</span>
                        </span>
                        <Menu theme="dark" mode="inline" openKeys={this.state.openKeys}
                              onOpenChange={this.onOpenChange}>
                            {this.renderMenu(this.state.menus)}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', textAlign: 'right', paddingLeft: 0}}>
                            <span>欢迎你,{sessionStorage.getItem("userName")}</span>
                        </Header>
                        <Content style={{marginLeft: '0 10px'}}>
                            <div style={{padding: "0 24px", minHeight: 360}}>
                                {this.props.children}
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Salary ©2019 Created by 互联网运营中心出品</Footer>
                    </Layout>
                </Layout>
            </LocaleProvider>
        )
    }
}

export default Admin