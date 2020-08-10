import { PlusOutlined } from '@ant-design/icons';
import { Button, Table, Space } from 'antd';
import { getCollections } from '../../../services'
import { useEffect, useState } from 'react';

const getDateTimeString = datetime => {
  const d = new Date(datetime)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

const columns = [
  {
    title: '内容类型',
    dataIndex: 'label',
  },
  {
    title: '数据库集合名称',
    dataIndex: 'collectionName',
  },
  {
    title: '排序(值越大越靠前)',
    dataIndex: 'order',
  },
  {
    title: '描述信息',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: createTime => getDateTimeString(createTime),
  },
  {
    title: '最后修改时间',
    dataIndex: 'updateTime',
    render: updateTime => getDateTimeString(updateTime),
  },
  {
    title: 'Action',
    render: (text, record) => (
      <Space size="middle">
        <a href="">Edit</a>
        <a href="">Delete</a>
      </Space>
    ),
  },
]

const TableCollection = props => {
  const [data, setData] = useState([])
  const [total, setToal] = useState(0)
  useEffect(() => {
    async function setDataSource() {
      const res = await getCollections()
      console.log(res);
      setData(res.result.data)
      setToal(res.result.total)
    }
    setDataSource()
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ total }}
      rowKey="id"
      title={() => (
        <Button type="primary">
          <PlusOutlined />Add a row
        </Button>
      )}
    />
  )
}

export default TableCollection
