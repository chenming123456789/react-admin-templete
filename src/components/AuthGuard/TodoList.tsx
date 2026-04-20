import { useState, useEffect } from "react";
import { Input, Button, List, Card, message, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Todo {
  id: number;
  content: string;
}

const TodoList = () => {
  // 输入框内容
  const [inputValue, setInputValue] = useState<string>("");
  // 待办列表（使用对象类型，方便唯一 id 删除）
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    try {
      const data = localStorage.getItem("todoList");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = () => {
    if (!inputValue.trim()) {
      message.warning("请输入待办内容");
      return;
    }
    const neTodo: Todo = {
      id: Date.now(),
      content: inputValue.trim()
    };

    setTodoList([...todoList, neTodo]);
    setInputValue("");
    message.success("添加成功");
  };

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((item) => item.id !== id));
    message.success("删除成功");
  };

  const clearAll = () => {
    setTodoList([]);
    message.success("清空成功");
  };

  return (
    <Card title="AntD 待办清单" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入待办事项"
          onPressEnter={addTodo}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={addTodo}>
          添加
        </Button>
        <Button danger onClick={clearAll}>
          清空全部
        </Button>
      </Space.Compact>

      {/* 列表 */}
      <List
        bordered
        dataSource={todoList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(item.id)}
              >
                删除
              </Button>
            ]}
          >
            {item.content}
          </List.Item>
        )}
        locale={{ emptyText: "暂无待办事项" }}
      />
    </Card>
  );
};

export default TodoList;
