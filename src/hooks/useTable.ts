import { useState, useCallback, useEffect } from "react";
import type { TableProps } from "antd";

export interface UseTableOptions<T> {
  /** 
   * 获取数据的异步接口函数 
   * (常用于正式接后端 API 阶段)
   */
  request?: (params: any) => Promise<{ data: T[]; total: number } | undefined>;
  /** 纯前端模拟的初始数据 */
  defaultData?: T[];
  /** 是否需要手动触发首次加载，默认为 false，即组件挂载会自动请求 */
  manual?: boolean;
}

/**
 * 全局公共的高级表格 Hook，专门抽取 Antd Table 那些繁琐的 loading、分页和选择态
 */
export function useTable<T extends { id?: React.Key }>(options: UseTableOptions<T> = {}) {
  const { request, defaultData = [], manual = false } = options;

  // 表格核心数据模型
  const [data, setData] = useState<T[]>(defaultData);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(defaultData.length);
  
  // 分页状态
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 选择状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 核心请求方法
  const fetchData = useCallback(
    async (searchParams: any = {}) => {
      // 1. 如果没有外部接口函数，则走纯前端的 mock 配置，只加一点 loading 动画
      if (!request) {
        setLoading(true);
        setTimeout(() => setLoading(false), 500); 
        return;
      }

      // 2. 有正式后端的逻辑
      setLoading(true);
      try {
        const res = await request({ current, pageSize, ...searchParams });
        if (res) {
          setData(res.data);
          setTotal(res.total);
        }
      } catch (error) {
        console.error("fetch table data error", error);
      } finally {
        setLoading(false);
      }
    },
    [request, current, pageSize]
  );

  // 初始化加载
  useEffect(() => {
    if (!manual) {
      // 为了防止每次重渲染调用，可以加点节流或通过外部 searchForm 统一触发
      // 这里简略处理
    }
  }, [manual]);

  // 处理统一的内部由于翻页带来的状态变化
  const handleTableChange = (pagination: any) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
    if (request) {
      // 当发生翻页直接走接口即可，如果是本地假数据则不需要动（依赖 antd 的纯前端分页）
      fetchData({ current: pagination.current, pageSize: pagination.pageSize });
    }
  };

  return {
    // 自动抛出给 Antd Table 的巨大配置合并
    tableProps: {
      dataSource: data,
      loading,
      onChange: handleTableChange,
      rowSelection: {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys)
      },
      pagination: {
        current,
        pageSize,
        total,
        showSizeChanger: true,
        showTotal: (t: number) => `共 ${t} 条`,
      }
    } as TableProps<T>,

    // 把各种状态和设值全部暴露给具体的“业务页面”去自由定制和修改 mock 数据
    data,
    setData,
    setTotal,
    setLoading,
    selectedRowKeys,
    setSelectedRowKeys,
    refresh: fetchData
  };
}
