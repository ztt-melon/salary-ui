import React, {PureComponent, Fragment} from 'react'
import {MyBreadcrumb, CrudTool, MyTable} from '../components'
import {Card} from 'antd'
import UserQuery from './UserQuery'
import userColumns from './column'
import {ajax, urls, Functions, PermissionButton} from '../../util'

class User extends PureComponent {
    state = {
        pageNum: 1,
        searchParam: {name: ''},
        loading: true
    }
    getList = () => {
        ajax.get(urls.user.list, {pageNum: this.state.pageNum, ...this.state.searchParam}, this)
    }

    componentDidMount() {
        this.getList()
    }

    displaySearch = () => {
        let index = PermissionButton.get(urls.user.route).indexOf('查询')
        if (index >= 0) {
            return (
                <UserQuery
                    callback={this.getList}
                    setSearchParam={Functions.setSearchParam.bind(this)}
                />
            )
        }
    }

    render() {
        return (
            <Fragment>
                <MyBreadcrumb msg={'系统管理/用户管理'}/>
                {this.displaySearch()}
                <Card style={{marginTop: 10}}>
                    <CrudTool
                        width={800}
                        selectedItem={this.state.selectedItem}
                        callback={this.getList}
                        info={urls.user}
                    />
                    <MyTable
                        columns={userColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                        width={800}
                        callback={this.getList}
                        info={urls.user}
                    />
                </Card>
            </Fragment>
        )
    }
}


export default User

