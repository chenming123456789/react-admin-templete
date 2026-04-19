import React from 'react';
import { useLocation } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { routeMetaMap } from '@/layout/MainLayout';
import styles from './index.module.scss';

/**
 * 面包屑导航组件
 * 根据当前路由自动生成面包屑路径
 */
const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const meta = routeMetaMap[currentPath];

  if (!meta) return null;

  const crumbs: string[] = [];
  if (meta.parentTitle) {
    crumbs.push(meta.parentTitle);
  }
  crumbs.push(meta.title);

  return (
    <div className={styles.breadcrumb}>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb}>
          {index > 0 && <RightOutlined className={styles.separator} />}
          <span
            className={`${styles.crumbItem} ${
              index === crumbs.length - 1 ? styles.crumbItemActive : ''
            }`}
          >
            {crumb}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadcrumbNav;
