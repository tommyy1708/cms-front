import request from './request'

interface IRegisterParams {
    username: string | number;
    password: string | number;
}

// 注册
export const RegisterApi = (params: IRegisterParams) => request.post('/register', params)

//登陆
export const LoginApi = (params:IRegisterParams) => request.post('/login',params)

//用户信息获取
export const UserinfoApi = () => request.get('/info')

//获取编辑权限
export const UserEditableApi = () => request.get('/editable')

//获取身份权限
export const UserPlayApi = () => request.get('/player')

interface IChangeInfoApi {
    username?: string | number;
    password?: string | number;
}

//修改用户信息
export const ChangeInfoApi = (params:IChangeInfoApi) => request.post('/info', params)

//获取文章列表
interface IGetArticleApi{
    current:number;
    counts:number;
}
export const GetArticleApi = (params:IGetArticleApi) => request.post('/article/list',params)

//根据id拿文章数据
export const GetArticleByIdApi = (params:{id:number}) => request.post('/article/info', params)

//提交成功发送数据接口
interface IEditArticle {
    title:string;
    subtitle?:string;
    content:string;
    id?:number;
}
export const EditArticleApi = (params:IEditArticle) =>request.post('/article/edit',params)

export const DeleteArticleApi = (params:{id:number}) => request.post('/article/delete',params)

export const AddArticleApi = (params: IEditArticle) => request.post('/article/add', params);

//获取小编名单
export const EditorApi = () => request.get('/namelist')


interface IChangeEditorApi {
    id:number;
    open:number;
}

export const ChangeEditorApi = (params:IChangeEditorApi) => request.post('/namelist',params)