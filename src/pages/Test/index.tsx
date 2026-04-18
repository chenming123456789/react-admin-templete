import React from 'react'
import TitleTest from '@/components/AuthGuard/TitleTest'
import MyButton from '@/components/AuthGuard/MyButton'
import ItemList from '@/components/AuthGuard/ItemList'
import TodoList from '@/components/AuthGuard/TodoList'
import Counter from '@/components/AuthGuard/Counter'
import Switch from '@/components/AuthGuard/Switch'
import EffectDemo from '@/components/AuthGuard/EffectDemo'
import styles from './index.module.scss'

const Test: React.FC = () => {
	return (
		<div className={styles.testWrapper}>
			<h1>Day1 - React + TypeScript 组件练习</h1>

			{/* 使用组件 */}
			<TitleTest />
			<MyButton />
			<ItemList />

			<hr className={styles.divider} />

			{/* 计数器 */}
			<Counter />

			<hr className={styles.divider} />

			{/* 开关 */}
			<Switch />

			<hr className={styles.divider} />

			{/* TodoList 初稿 */}
			<TodoList />

			<hr className={styles.divider} />

			<EffectDemo />
		</div>
	)
}

export default Test
