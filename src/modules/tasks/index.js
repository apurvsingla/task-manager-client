import { Breadcrumb, Col, Layout, Menu, Row, Input } from "antd";
import React from "react";
import CanvasBoard from "./canvasBoard";
import {
  HomeOutlined,
  BarcodeOutlined,
  FolderOpenOutlined,
  MessageOutlined,
  CalendarOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Spinner from "components/loader";
import { connect } from "react-redux";
import { searchTask } from "store/actions/taskTypes";
import { logoutAction } from "store/actions/authType";

const { Content, Sider } = Layout;

const sidebarLayout = [
  { label: "Overview", icon: HomeOutlined },
  { label: "Stats", icon: BarcodeOutlined },
  { label: "Projects", icon: FolderOpenOutlined },
  { label: "Chat", icon: MessageOutlined },
  { label: "Calendar", icon: CalendarOutlined },
].map((key) => ({
  key: key.label,
  label: key.label,
  icon: React.createElement(key.icon),
}));

const TaskList = (props) => {
  const history = useHistory();
  const [logout, setLogout] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [selectUser, setSelectUser] = React.useState(false);

  return (
    <Layout className="w-full h-[100vh]">
      {logout && <Spinner />}
      <Row className="h-6">
        <Col className="font-semibold text-xl absolute top-4 left-2">
          Task Manager
        </Col>
      </Row>
      <Layout>
        <Sider width={200} className="site-layout-background mt-12">
          <Menu
            mode="inline"
            defaultSelectedKeys={["Projects"]}
            style={{
              height: "100%",
              borderRight: "1px solid black",
            }}
            items={sidebarLayout}
          />
          <div className="absolute bottom-10 left-8 flex justify-center items-center">
            <SettingOutlined className="mr-2" />
            <span className="cursor-pointer">Settings</span>
          </div>
          <div
            className="absolute bottom-2 left-8 flex justify-center items-center"
            onClick={() => {
              localStorage.removeItem("token");
              setLogout(true);
              props.logoutAction();
              setTimeout(() => {
                history.push("/auth");
              }, 1000);
            }}
          >
            <LogoutOutlined className="mr-2" />
            <span className="cursor-pointer text-orange-700 font-semibold">
              Log Out
            </span>
          </div>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
          className="main-page-section"
        >
          <Col className="relative bottom-1 flex justify-between">
            <div>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                onChange={(e) => {
                  props.searchTask(e.target.value);
                  setSearchText(e.target.value);
                }}
              />
              <div
                className={`max-h-[100px] bg-white mt-1 overflow-y-scroll absolute ${
                  props.searchTasks.length > 0 && searchText !== ""
                    ? "border-2"
                    : "border-0"
                }`}
              >
                {props.searchTasks &&
                  searchText !== "" &&
                  props.searchTasks.length > 0 &&
                  props?.searchTasks?.map((i, index) => {
                    return (
                      <div key={i.id} className="border-b-2 p-2 cursor-pointer">
                        <p>Title: {i.title}</p>
                        <p>Description: {i.description}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex">
              <div
                style={{
                  borderRadius: "100%",
                  border: "1px solid black",
                }}
                className={`mr-2 cursor-pointer h-[30px] w-[30px] ${
                  !selectUser && "bg-cyan-500 text-white"
                }`}
                onClick={() => setSelectUser(false)}
              >
                <UserOutlined className="flex justify-center items-center relative top-2" />
              </div>
              <div
                style={{
                  borderRadius: "100%",
                  border: "1px solid black",
                }}
                onClick={() => setSelectUser(true)}
                className={`cursor-pointer h-[30px] w-[30px] ${
                  selectUser && "bg-cyan-500 text-white"
                }`}
              >
                <UsergroupDeleteOutlined className="flex justify-center items-center relative top-2" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="mr-2">Hi {props?.userDetails?.name || ""}</span>
              <span className="flex justify-between items-center">
                <UserOutlined />
              </span>
            </div>
          </Col>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontWeight: 600,
              fontSize: "24px",
            }}
          >
            <Breadcrumb.Item> Projects</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <CanvasBoard 
              selectUser={selectUser}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.userDetails,
    searchTasks: state.taskReducer.searchTask,
  };
};

export default connect(mapStateToProps, {
  searchTask,
  logoutAction,
})(TaskList);
