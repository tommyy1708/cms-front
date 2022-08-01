import React, { useState } from 'react'
import { ChangeInfoApi } from 'request/api'
import { Button, Form, Input, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


interface Iprops {
  ChangeKeyFn: () => void;
}

const Means = (props: Iprops) => {
  const onFinish = (values: any) => {
    ChangeInfoApi({
      password: values.password || '',
      username: values.username || '',
    }).then((res: any) => {
      if (res.errCode === 0) {
        message.success(res.message);
        let { username, avatar } = res.data;
        localStorage.setItem('username', username);
        localStorage.setItem('avatar', avatar);
        localStorage.setItem('cms-token', res.data['cms-token']);
        props.ChangeKeyFn()
      } else if (res.errCode === 1) {
        message.info('用户名已存在')
        return;
      }
    })
  };


  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
   
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.response.errCode === 0) {

      message.success('头像修改成功')
      localStorage.setItem('avatar',info.file.response.data.avatar)
      localStorage.setItem('cms-token',info.file.response.data['cms-token'])
      localStorage.setItem('username',info.file.response.data.username)
      props.ChangeKeyFn()
    }
    setLoading(false);
  };

  const UploadButton = ()=>{
    return (
      <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
    )
  }


  return (
    <div>
      <Form
        name="basic"
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
        >
          <Input placeholder='new username' />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
        >
          <Input.Password placeholder='new password' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:9000/manage/upload"
        headers={{'cms-token':localStorage.getItem('cms-token') as string }} 
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadButton/>}
      </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ChangeKeyFn() {
      dispatch({ type: 'ChangeKey' })
    }
  }
}

export default connect(null, mapDispatchToProps)(Means);