import React, {  useEffect, useState} from 'react'
import { Table, Button, Space, message } from 'antd';
import {EditorApi ,ChangeEditorApi } from '../request/api'

interface IColumns {
  title:string;
  dataIndex:string;
  key:string;
  width?:string;
}  

const columns: IColumns[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '角色',
    dataIndex: 'player',
    key: 'player',
  },
  {
    title: '编辑权限',
    dataIndex: 'editable',
    key: 'editable',
  },
  {
    title: '权限操作',
    dataIndex: 'btns',
    key: 'btns',
    width: '30%',
  },
];


interface IArr {
  key:number ;
  avatar : React.ReactNode;
  username:string;
  player:string;
  editable:string;
  btns:React.ReactNode;
}
 const NameList = () => {
  const [arr, setArr] = useState<IArr[]>([])
  const [updata, setUpdata] = useState<number>(0)
  
  const openEditable = (id:number) =>{
    ChangeEditorApi({
      id,open:1 //1代表开通权限
    }).then((res:any)=>{
      console.log(res)
      if(res.errCode === 0){
        message.success(res.message)
        setUpdata(updata+1)
      }else{
        message.error(res.message)
      }
    })
  }
  const closeEditable = (id:number) =>{
    ChangeEditorApi({
      id,open:2 //2代表关闭权限
    }).then((res:any)=>{
      if(res.errCode === 0){
        message.success(res.message)
        setUpdata(updata+1)
      }
    })
  }
  useEffect(()=>{
    EditorApi().then((res:any) => {
      if(res.errCode === 0){
        let newArr:IArr[] =[]
        res.data.forEach((element:any)=>{
          let obj = {
            key:element.id,
            avatar: <img width="40" height="40" src={process.env.SERVER_PORT+ '/'+element.avatar} alt="#" /> ,
            username: element.username,
            player: element.player === 'vip'? '管理员': '普通用户',
            editable:element.editable === 1 ? '已开通':'未开通',
            btns: (
              <>
                <Space>
                  <Button type="primary" onClick={()=>openEditable(element.id)}>开通编辑权限</Button>
                  <Button type="primary" danger onClick={()=>closeEditable(element.id)}>撤销编辑权限</Button>
                </Space>
              </>
            )
          }
          newArr.push(obj)
        })
        setArr(newArr);
      }else{
        message.error(res.message)
        return
      }
    })
  },[updata])
    return (
      <>
        <Table pagination={false} dataSource={arr} columns={columns} />
      </>
    );
  
}

export default NameList; 