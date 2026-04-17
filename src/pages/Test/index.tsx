import React from 'react'
import TitleTest from '@/components/AuthGuard/TitleTest'
import MyButton from '@/components/AuthGuard/MyButton'
import ItemList from '@/components/AuthGuard/ItemList'
import TodoList from '@/components/AuthGuard/TodoList'
import Counter from '@/components/AuthGuard/Counter'
import Switch from '@/components/AuthGuard/Switch'
import EffectDemo from '@/components/AuthGuard/EffectDemo'

const Test: React.FC = () => {
	return (
		<div style={{ maxWidth: 800, margin: '0 auto' }}>
			<h1>Day1 - React + TypeScript 组件练习</h1>

			{/* 使用组件 */}
			<TitleTest />
			<MyButton />
			<ItemList />

			<hr style={{ margin: '20px 0' }} />

			{/* 计数器 */}
			<Counter />

			<hr style={{ margin: '20px 0' }} />

			{/* 开关 */}
			<Switch />

			<hr style={{ margin: '20px 0' }} />

			{/* TodoList 初稿 */}
			<TodoList />

			<hr style={{ margin: '20px 0' }} />

			<EffectDemo />
		</div>
	)
}

export default Test
