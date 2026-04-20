import { useEffect, useState } from "react";

const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prew) => prew + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 1. 页面加载时执行一次
  useEffect(() => {
    console.log("useEffect 执行了");
  }, [count]);

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>useEffect 演示</h3>
      <p>运行计时：{time} 秒</p>
      <p>计数器：{count}</p>
      <button onClick={() => setCount(count + 1)}>点我触发监听</button>
    </div>
  );
};

export default EffectDemo;
