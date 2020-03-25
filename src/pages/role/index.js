import React, {PureComponent, Fragment} from 'react'
import {MyBreadcrumb, CrudTool, MyTable} from '../components'
import {Card} from 'antd'
import roleColumns from './column'
import {ajax, urls, Functions} from '../../util'

class Role extends PureComponent {
    state = {
        pageNum: 1,
        loading: true
    }
    getList = () => {
        ajax.get(urls.role.list, {pageNum: this.state.pageNum}, this)
    }

    componentDidMount() {
        this.getList()
    }

    render() {
        return (
            <Fragment>
                <MyBreadcrumb msg={'系统管理/角色管理'}/>
                <Card style={{marginTop: 10}}>
                    <CrudTool
                        selectedItem={this.state.selectedItem}
                        callback={this.getList}
                        info={urls.role}
                    />
                    <MyTable
                        columns={roleColumns}
                        state={this.state}
                        setSelectedItem={Functions.setSelectedItem.bind(this)}
                        callback={this.getList}
                        info={urls.role}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default Role

