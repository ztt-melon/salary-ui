export default {
    //部署时的真实IP地址和项目名称
    baseURL: "http://127.0.0.1:8080/salary",
    //后端项目名称
    projectName:'/salary',
    YES: 'Y',
    NO: 'N',
    //使用状态
    status_normal: '正常',
    status_disable: '禁用',
    statusValues: [
        {label: '正常', value: '正常'},
        {label: '禁用', value: '禁用'}
    ],
    typeValues: [
        {label: '导航菜单', value: '导航菜单'},
        {label: '操作按钮', value: '操作按钮'}
    ],
    //crud
    CREATE: 'create',
    EDIT: 'edit',
    DETAIL: 'detail',
    DELETE: 'delete',
    RECOMBINE: 'recombine',
    //月结
    FINISH:'finish',
    //绑定用户
    BINDUSER: 'bindUser',
    //授权
    AUTHORIZE: 'authorize',
    //生成、退回处理、校对、确认、审批
    GENERATE:'generate',
    VALIDATE:'validate',
    BACK:'back',
    CONFIRM:'confirm',
    AUDITING:'auditing',
    //查看流程图、查看审批步骤
    VIEW_DIAGRAM:'view_diagram',
    VIEW_STEP:'view_step',
    //表单的状态
    form_status_edit: 'edit',
    form_status_preview: 'preview',
    form_status_disabled: 'disabled',
    //true和false
    TRUE: true,
    FALSE: false,
    //日期格式
    monthFormat: 'YYYY年MM月',
    //月结状态
    no_finish: '未月结',
    yes_finish: '已月结',
    //Card的标题加粗
    fontWeight: {fontWeight: 'bold'},
    //用户权限按钮
    PERMISSIONS: 'permissions',
    //提示类型，message/modal
    TIP_TYPE_MESSAGE:'message',
    TIP_TYPE_MODAL:'modal',
    //查询、重置、导出
    QUERY:'query',
    RESET:'reset',
    EXPORT:'export'
}