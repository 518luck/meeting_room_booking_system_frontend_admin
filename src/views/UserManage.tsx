import { Button, Form, Input, Table } from "antd";
import { useCallback } from "react";
import type { TableProps } from "antd";

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

interface UserSearchResult {
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
}
const columns: TableProps<UserSearchResult>["columns"] = [
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "头像",
    dataIndex: "headPic",
  },
  {
    title: "昵称",
    dataIndex: "nickName",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "注册时间",
    dataIndex: "createTime",
  },
];

const data = [
  {
    key: "1",
    username: "xx",
    headPic: "xxx.png",
    nickName: "xxx",
    email: "xx@xx.com",
    createTime: new Date(),
  },
  {
    key: "12",
    username: "yy",
    headPic: "yy.png",
    nickName: "yyy",
    email: "yy@yy.com",
    createTime: new Date(),
  },
];

const UserManage = () => {
  const searchUser = useCallback(async (values: SearchUser) => {
    console.log(values);
  }, []);

  return (
    <div id="userManage-container">
      <div className="userManage-form">
        <Form onFinish={searchUser} name="search" layout="inline" colon={false}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="nickName">
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: "email", message: "请输入合法邮箱地址!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索用户
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="userManage-table">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
    </div>
  );
};
export default UserManage;
