import { Space, Table, Button, message ,Pagination} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { GetArticleApi, DeleteArticleApi, UserEditableApi} from 'request/api';
import {useNavigate} from 'react-router-dom'
import moment from 'moment'


interface DataType {
  key: number;
  title: React.ReactNode;
  date: string;
  action: React.ReactNode;
}

const List: React.FC = () => {
  const [num, setNum] = useState(0)
  const [data, setData] = useState<DataType[]>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const Titlecomp = (props: { title: string; subtitle?: string }) => (
    <>
      <div>
        <a>{props.title}</a>
      </div>
      <p style={{color:'#999'}}>{props.subtitle||''}</p>
    </>
  )

  const ActionBtn = (props:{current:number; id:number; getListFn:(page:number,pageSize:number)=>void}) => {
    const navigate = useNavigate();
    // const changeArt = () => {
    //   UserEditableApi().then((res)=>{
    //   if(res.data[0]===1){
    //     navigate(`/edit/${props.id}`)
    //   })}
    const changeArt = ()=>{
      UserEditableApi().then((res:any)=>{
        if(res.data[0].editable===1){
          navigate(`/edit/${props.id}`,{replace:true})
        }else{
          message.warning(res.message)
        }
      })
    }

    const deletFn =()=>{
      DeleteArticleApi({id:props.id}).then((res:any)=>{
        if(res.errCode === 0){
          message.success('文章删除成功');
          setNum(num+1);
          getListFn(current,10)
        }else{
          message.warning(res.message)
        }
      })
    }

    return (
      <>
      <Space size="middle">
        <Button onClick={changeArt} type="primary">Edit</Button>
        <Button onClick={deletFn} type="primary" danger>Delete</Button>
      </Space>
      </>
    )
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '45%',
    },
    
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '35%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action'
    },
     
  ];

  
  const getListFn = (page:number,pageSize:number) =>{
    GetArticleApi({
      current:page,
      counts:pageSize
    }).then((res: any) => {
      let newarr: DataType[] = [];

      interface IItem {
        title: string,
        subtitle?: string,
        date: string,
        id: number
      }
      
      res.data.arr.map((item: IItem) => {
        let obj = {
          key: item.id,
          title: <Titlecomp title={item.title} subtitle={item.subtitle} />,
          date: moment( item.date).format('LL'),
          action: <ActionBtn current={current} getListFn={getListFn} id={item.id} key={item.id} />
        }
        newarr.push(obj)
      })
      setData(newarr)
      setTotal(res.data.total);
      setCurrent(res.data.current)
    })
  }
  useEffect(() => {
    getListFn(1,10)
  },[num])

const onPageChange = (page:number, pageSize:number) =>{
  getListFn(page,pageSize)
  
}
  return(
    <>
    <Table pagination={false} showHeader={true} columns={columns} dataSource={data}/>
    <br/>
    <Pagination onChange={onPageChange} defaultCurrent={1} total={total}/>
    </>
  ) 
}

export default List;