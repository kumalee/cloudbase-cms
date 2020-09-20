import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card } from 'antd';
import Pictures from './pictures';
import Albums from './albums';
import './style.less';

const { TabPane } = Tabs;

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="All" key="1">
            <Pictures />
          </TabPane>
          <TabPane tab="By Category" key="2">
            <Albums />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
}
