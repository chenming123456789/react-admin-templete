import { useState, useCallback } from "react";

export type ModalMode = "add" | "edit" | "view";

export const useModal = <T = any>() => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("add");
  const [record, setRecord] = useState<T | null>(null);

  // 暴露给外部的打开弹窗方法
  const showModal = useCallback((actionMode: ModalMode = "add", initialData?: T) => {
    setMode(actionMode);
    setRecord(initialData || null);
    setOpen(true);
  }, []);

  // 隐藏弹窗
  const hideModal = useCallback(() => {
    setOpen(false);
    // 可选：延迟清理数据以保证动画平滑
    setTimeout(() => setRecord(null), 300);
  }, []);

  return {
    open,
    mode,
    record,
    showModal,
    hideModal,
  };
};
