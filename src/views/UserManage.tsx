import { Button, Form, Input, Table, Image, message, Badge } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TableProps } from "antd";
import { freeze, userSearchApi, type UserItem } from "@/api/login";

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

const UserManage = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userResult, setUserResult] = useState<UserItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [form] = Form.useForm();

  //过滤
  const searchUser = useCallback(
    async (values?: SearchUser) => {
      const res = await userSearchApi({
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        username: values?.username || "",
        nickName: values?.nickName || "",
        email: values?.email || "",
      });
      if (res.code === 201 || res.code === 200) {
        const { data } = res;
        if (typeof data === "string") return;
        setTotal(Number(data.totalCount));
        setUserResult(
          data.users.map((item: UserItem) => ({
            ...item,
            key: item.id,
          })),
        );
      }
      console.log("🚀 ~ UserManage ~ res:", res);
    },
    [pageNo, pageSize],
  );

  //分页
  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  //冻结
  const freezeUser = useCallback(
    async (id: number) => {
      const res = await freeze(id);
      if (res.code === 201 || res.code === 200) {
        message.success("冻结成功");
        searchUser();
      } else {
        message.error(res.data || "系统繁忙，请稍后再试");
      }
    },
    [searchUser],
  );

  // 初始化时查询用户列表
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    searchUser({
      username: form.getFieldValue("username"),
      email: form.getFieldValue("email"),
      nickName: form.getFieldValue("nickName"),
    });
  }, [pageNo, pageSize, form, searchUser]);

  // 表格列定义
  const columns: TableProps<UserItem>["columns"] = useMemo(
    () => [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "头像",
        dataIndex: "headPic",
        render: (value) => {
          return value ? (
            <Image width={50} src={`http://localhost:3000/${value}`} />
          ) : (
            ""
          );
        },
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
      {
        title: "状态",
        dataIndex: "isFrozen",
        render: (_, record) =>
          record.isFrozen ? <Badge status="success">已冻结</Badge> : "",
      },
      {
        title: "操作",
        render: (_, record) => (
          <a
            href="#"
            onClick={() => {
              freezeUser(record.id);
            }}
          >
            冻结
          </a>
        ),
      },
    ],
    [freezeUser],
  );

  return (
    <div id="userManage-container">
      <div className="userManage-form">
        <Form
          form={form}
          onFinish={searchUser}
          name="search"
          layout="inline"
          colon={false}
        >
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
          dataSource={userResult}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            total,
            onChange: changePage,
          }}
        />
      </div>
    </div>
  );
};
export default UserManage;
