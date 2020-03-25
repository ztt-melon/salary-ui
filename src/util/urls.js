import DeptForm from '../pages/dept/deptForm'
import DeptRecombineForm from '../pages/dept/deptRecombineForm'
import DicForm from '../pages/dic/dicForm'
import UserForm from '../pages/user/userForm'
import SalNpForm from '../pages/salNp/salNpForm'
import SalLtxForm from '../pages/salLtx/salLtxForm'
import SalLxForm from '../pages/salLx/salLxForm'
import ChangeSheetNeedHandleForm from '../pages/changeSheetNeedHandle/changeSheetNeedHandleForm'
import PermissionForm from '../pages/permission/permissionForm'
import RoleForm from '../pages/role/roleForm'
import BindForm from '../pages/role/bindForm'
import AuthorizeForm from '../pages/role/authorizeForm'

const urls = {
    //route字段用于显示哪些列表按钮
    dept: {
        route: '/dept',
        title: '部门',
        form: DeptForm,
        recombineForm: DeptRecombineForm,
        list: '/sysDept/list',
        saveOrUpdate: '/sysDept/saveOrUpdate',
        treeSelectData: '/sysDept/treeSelectData',
        treeTableData: '/sysDept/treeTableData'
    },
    dic: {
        route: '/dic',
        title: '数据字典',
        form: DicForm,
        list: '/sysDic/list',
        saveOrUpdate: '/sysDic/saveOrUpdate',
        flagData: '/sysDic/flagData'
    },
    user: {
        route: '/user',
        title: '用户',
        form: UserForm,
        list: '/sysUser/list',
        saveOrUpdate: '/sysUser/saveOrUpdate',
        get: '/sysUser/get',
        login: '/sysUser/login'
    },
    salNp: {
        route: '/salNp',
        title: '内聘工资',
        form: SalNpForm,
        list: '/salNp/list',
        saveOrUpdate: '/salNp/saveOrUpdate',
        editView: '/salNp/editView'
    },
    salLtx: {
        route: '/salLtx',
        title: '退休工资',
        form: SalLtxForm,
        list: '/salLtx/list',
        saveOrUpdate: '/salLtx/saveOrUpdate',
        editView: '/salLtx/editView'
    },
    salLx: {
        route: '/salLx',
        title: '离休工资',
        form: SalLxForm,
        list: '/salLx/list',
        saveOrUpdate: '/salLx/saveOrUpdate',
        editView: '/salLx/editView'
    },
    changeSheet: {
        route: '/changeSheet'
    },
    changeSheetNeedHandle: {
        route: '/changeSheetNeedHandle',
        title: '变动单',
        list: '/changeSheet/list',
        form: ChangeSheetNeedHandleForm,
        saveOrUpdate: '/changeSheet/saveOrUpdate',
        editView: '/changeSheet/editView',
        viewDiagram: '/changeSheet/viewDiagram',
        viewStep: '/changeSheet/viewStep',
        batchModifyData: '/changeSheet/batchModifyData'
    },
    changeSheetDept: {
        title: '部门重组',
        form: DeptRecombineForm,
        saveOrUpdate: '/changeSheetDept/saveOrUpdate',
    },
    permission: {
        route: '/permission',
        title: '权限',
        form: PermissionForm,
        list: '/sysPermission/list',
        saveOrUpdate: '/sysPermission/saveOrUpdate',
        editView: '/sysPermission/editView',
        treeSelectData: '/sysPermission/treeSelectData',
        treeTableData: '/sysPermission/treeTableData',
        navMenu: '/sysPermission/navMenu'
    },
    role: {
        route: '/role',
        title: '角色',
        form: RoleForm,
        bindForm: BindForm,
        authorizeForm: AuthorizeForm,
        list: '/sysRole/list',
        saveOrUpdate: '/sysRole/saveOrUpdate',
        editView: '/sysRole/editView'
    },
    roleUser: {
        editView: '/sysRoleUser/editView',
        editViewDept: '/sysRoleUser/editViewDept',
        save: '/sysRoleUser/save'
    },
    rolePermission: {
        editView: '/sysRolePermission/editView',
        save: '/sysRolePermission/save'
    }
}

export default urls