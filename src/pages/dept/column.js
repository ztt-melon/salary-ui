//部门显示列表
export default [{
    title: '部门名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '上级部门',
    dataIndex: 'pname',
    key: 'pname'
}, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.sort - b.sort,
}, {
    title: '更新时间',
    dataIndex: 'createTime',
    key: 'createTime'
}]