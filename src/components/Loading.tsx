import { Spin } from 'antd';
import React from 'react';
import './less/Loading.less'

const LD: React.FC = () => <Spin size='large'/>;

 function Loading(){
    return (
        <div className='loading'>
            <LD/>
        </div>
    )
};

export default Loading;