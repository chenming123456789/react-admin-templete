import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>计数器：{count}</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginLeft: '10px' }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
