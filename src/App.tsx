import React, { FC, useCallback, useReducer, useRef, useState } from "react";
import { Button, Input, List, Typography, Space, Alert } from "antd";
import "./App.css";
import { getItem } from "./States/localStorage";
import reducer from "./useReducer/reducer";

const App: FC = () => {
  const { Title } = Typography;
  const initialTodo = getItem();
  const newTodoRef = useRef<Input | null>(null);
  const [todos, dispatch] = useReducer(reducer, initialTodo);
  const [error, setError] = useState<boolean | null>(null);

  const handleAddTodo = useCallback((e) => {
    setError(null);
    if (newTodoRef.current) {
      const value = newTodoRef.current.state.value;

      if (newTodoRef.current.state !== undefined && value?.length > 0) {
        dispatch({ type: "ADD", text: value });
        setError(false);
      } else {
        setError(true);
      }

      newTodoRef.current?.handleReset(e);
    }
  }, []);

  const handleRemoveTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id: id });
  }, []);

  return (
    <div className="App">
      <Space direction="vertical" style={{ minWidth: "40%" }}>
        <Input.Group compact>
          <Input
            onPressEnter={handleAddTodo}
            ref={newTodoRef}
            style={{ width: "calc(100% - 30%)" }}
            placeholder="Write a task"
          />
          <Button onClick={handleAddTodo} type="primary">
            Add
          </Button>
        </Input.Group>

        <List
          header={
            <div>
              {error === true && (
                <Alert
                  message="Please write a task to add.."
                  type="error"
                  showIcon
                />
              )}
              {error === false && (
                <Alert
                  message="Succesfully added a new task.."
                  type="success"
                  showIcon
                />
              )}

              {error === null && <Title level={5}>Todo List</Title>}
            </div>
          }
          footer={<div>&copy;Copyright Todo inc 2022.</div>}
          dataSource={todos}
          renderItem={(item) => (
            <List.Item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {item.id + 1}. {item.text}
              <Button
                onClick={() => handleRemoveTodo(item.id)}
                type="primary"
                danger
              >
                Remove
              </Button>
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
};

export default App;
