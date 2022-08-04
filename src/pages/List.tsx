import { Space, Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { GetArticleApi, DeleteArticleApi } from 'request/api';
import {useNavigate} from 'react-router-dom'



interface DataType {
  key: number;
  title: React.ReactNode;
  date: string;
  action: React.ReactNode;
}


const List: React.FC = () => {
  const [num, setNum] = useState(0)
  const [data, setData] = useState<DataType[]>([])
  const Titlecomp = (props: { title: string; subtitle?: string }) => (
    <>
      <div>
        <a>{props.title}</a>
      </div>
      <p style={{color:'#999'}}>{props.subtitle||''}</p>
    </>
  )

  
  const ActionBtn = (props:{id:number}) => {
   
    const navigate = useNavigate();
    const changeArt = () => {
      
      let editKey = localStorage.getItem('editable');
      if (editKey === '0') {
        navigate(`/edit/${props.id}`)
      } else {
        message.warning('抱歉你没有权限')
        return;
      }
    }

    const deletFn =()=>{
      DeleteArticleApi({id:props.id}).then((res:any)=>{
        if(res.errCode === 0){
          message.success('文章删除成功');
          setNum(num+1);
          console.log(num);
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
      width: '50%',
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

  useEffect(() => {
    GetArticleApi().then((res: any) => {
      if (res.errCode === 0) {
        message.success('成功获取数据')
      }
      let newarr: DataType[] = [];

      interface IItem {
        title: string,
        subtitle?: string,
        date: string,
        id: number
      }

      res.data.map((item: IItem) => {
        let obj = {
          key: item.id,
          title: <Titlecomp title={item.title} subtitle={item.subtitle} />,
          date: item.date,
          action: <ActionBtn id={item.id} key={item.id} />
        }
        newarr.push(obj)
      })
      setData(newarr)
    })
  }, [num])
  return <Table showHeader={false} columns={columns} dataSource={data} />;
}

export default List;