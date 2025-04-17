import React from 'react';
import {Spin} from 'antd';

const Loading = () => (
    <div className="w-full h-full flex justify-center items-center">
        <Spin/>
    </div>
);

export default Loading;
