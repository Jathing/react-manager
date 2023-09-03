import {ChangeEvent, FC, useState} from 'react';
import './App.css';

const initialState = [
	{id: '1', text: '学react'},
];

type ItemProps = {
	id: string,
	text: string
};

const App: FC = () => {
	const [input, setInput] = useState<string>('');
	const [list, setList] = useState<ItemProps[]>(initialState);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value.trim())
	};

	const handleAdd = () => {
		if (input === '') return
		setList(list.concat({id: Date.now().toString(), text: input}));
		setInput('')
	};

	const handleDelete = (id: string) => {
		setList(list.filter(item => item.id !== id));
	};

	return (
		<div>
			<h1>TODO</h1>
			<input type='text' value={input} onChange={handleChange}/>
			<button onClick={handleAdd}>添加</button>
			<ul>
				{list.map((item) => (
					<li key={item.id}>
						{item.text}
						<button onClick={() => handleDelete(item.id)}>删除</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
