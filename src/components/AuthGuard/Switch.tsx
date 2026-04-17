import { useState } from 'react'

const Switch = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div style={{ margin: '20px 0' }}>
			<h3>开关状态：{isOpen ? '开启' : '关闭'}</h3>
			<button onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? '关掉' : '打开'}
			</button>
		</div>
	)
}

export default Switch
