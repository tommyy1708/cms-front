import { useEffect, useState } from 'react';
import { PageHeader, Button, message } from 'antd';
import E from 'wangeditor'
import {useLocation, useParams} from 'react-router-dom'
import {ArrowLeftOutlined } from "@ant-design/icons"
import Mymodal from './Mymodal'
import {GetArticleByIdApi,EditArticleApi} from 'request/api'
import { useNavigate } from 'react-router-dom';

let editor = null

const Editor = () => {
  const [showUp,setShowUp] =useState(false)
  const location = useLocation();
  const [content, setContent] = useState('');
  const [modaltitle, setModaltitle] = useState('');
  const [modalsubtitle, setModalsubtitle] = useState('');
  const {id} = useParams()
  const navigate = useNavigate();

  useEffect(() => {
        // 实例化
        editor = new E("#myeditor")
        editor.config.onchange = (newHtml) => {
          setContent(newHtml);
        }
    
        // 创建
        editor.create()

    if(id){
      GetArticleByIdApi({id}).then(res=>{
        if(res.errCode===0){
          console.log(res.data);
          editor.txt.html(res.data.content)
          setModaltitle(res.data.title)
          setModalsubtitle(res.data.subtitle)
        }
      })
    }else{
      message.error('参数错误')
    }

    return () => {
      // 组件销毁时销毁编辑器
      editor.destroy()
    }
    // eslint-disable-next-line
  }, [])

  const submitAticleEdit = (values) =>{
    console.log('父组件',values)
    EditArticleApi({
     ...values,//简写了title和subtitle
      content,
      id      
    }).then(res=>{
      if(res.errCode===0){
        setShowUp(false)
        message.success(`${res.message},即将返回列表页`)
        setTimeout(()=>{
          navigate('/list')
        },2500)
      }
    })
  }

  return (
    <>
    <div className="editor">
      <PageHeader
      backIcon={location.pathname==='/edit' ? false : <ArrowLeftOutlined/>}
      onBack={()=>null}
        style={{padding: 0, marginBottom: '20px'}}
        ghost={false}
        title="文章编辑"
        subTitle={`当前日期：${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}
        extra={[
          <Button key="3" type="primary" onClick={()=> setShowUp(true)}>提交文章</Button>,
        ]}
      ></PageHeader>
      <div id="myeditor"></div>
    </div>
    <Mymodal showModal={showUp} setShowUp={setShowUp} title={modaltitle} subtitle={modalsubtitle} content={content} submitAticleEdit={submitAticleEdit} />
    </>
  );
  
}

export default Editor;

