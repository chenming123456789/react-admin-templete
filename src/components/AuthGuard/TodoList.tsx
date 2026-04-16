import { useState } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [todoList, setTodoList] = useState<string[]>([])

  const addTodo = () => {
    if (!inputValue.trim()) return

    setTodoList([...todoList, inputValue.trim()])
    setInputValue('')
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>待办清单（初稿）</h3>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="请输入待办事项"
        style={{ padding: '6px', width: '300px' }}
      />

      <button
        onClick={addTodo}
        style={{ marginLeft: '10px', padding: '6px 12px' }}
      >添加</button>

      <ul style={{ marginTop: '15px' }}>
        {todoList.map((item, index) => (
          <li key={index} style={{ margin: '8px 0' }}>
            {item}
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default TodoList