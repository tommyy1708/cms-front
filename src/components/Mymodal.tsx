
import {  Modal, Form, Input } from 'antd';
import React from 'react';


interface IProps {
    showModal:boolean;
    setShowUp:(bool:boolean)=>void;
    title:string;
    subtitle:string;
    submitAticleEdit:(res:{title:string ,subtitle:string})=>void;
}

const Mymodal: any = (props: IProps) => {
    const [form] = Form.useForm()
    const handleCancel = () => {
        props.setShowUp(false);
    };
    const handleOk = () =>{
            form
                .validateFields()
                .then(res => {
                    // form.resetFields();
                    // onCreate(values);
                    props.submitAticleEdit(res)
                })
                .catch((info: any) => {
                    console.log('Validate Failed:', info);
                });
        
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Modal
                title="Basic Modal"
                visible={props.showModal}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <Form
                form={form}
                    name="basic"
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{title:props.title, subtitle:props.subtitle}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Subtitle"
                        name="subtitle"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Mymodal;