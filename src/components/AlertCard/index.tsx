import React from 'react';
import styles from './index.module.scss';

export interface AlertItem {
  label: string;
  value: number | string;
  color?: 'blue' | 'red' | 'orange';
  onClick?: () => void;
}

interface AlertCardProps {
  items: AlertItem[];
}

/**
 * 统计提醒卡片组件
 * 用于在列表页面上方展示业务相关的统计提醒信息
 * 参考截图中的黄色提醒区域
 */
const AlertCard: React.FC<AlertCardProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.alertCard}>
      <div className={styles.alertContent}>
        {items.map((item, index) => (
          <span key={index} className={styles.alertItem}>
            <span className={styles.alertLabel}>{item.label}</span>
            <span
              className={`${styles.alertValue} ${
                item.color === 'red'
                  ? styles.alertValueRed
                  : item.color === 'orange'
                    ? styles.alertValueOrange
                    : styles.alertValueBlue
              }`}
              onClick={item.onClick}
              style={{ cursor: item.onClick ? 'pointer' : 'default' }}
            >
              {item.value}
            </span>
            {index < items.length - 1 && (
              <span className={styles.alertDivider} />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AlertCard;
