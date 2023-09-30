import { FC } from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

const Error403: FC = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/')
	}

	return (
		<Result status={403} title="403" subTitle='抱歉,你没有权限访问此页面' extra={
			<Button type='primary' onClick={handleClick}>回首页</Button>
		}/>
	);
};

export default Error403
