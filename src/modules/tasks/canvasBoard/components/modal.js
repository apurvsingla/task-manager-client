import { Input, Modal } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { resetUsersList, getUser } from "store/actions/taskTypes";

const ModalOpen = ({ open, onChange, onTrigger, resetUsersList, getUser }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [placeholder, setPlaceHolder] = useState("");
  const [userResult, setUserResult] = useState([]);
  const [users, setUsers] = useState([]);

  const userList = async (e) => {
    let val = e.target.value;
    try {
      if (val.length < 3) {
        setPlaceHolder("Enter minimum 3 letters");
        resetUsersList();
        setUserResult([]);
      } else {
        setPlaceHolder("searching...");
        let res = await getUser(e.target.value);
        if (res?.length > 0) {
          return setUserResult(res);
        } else {
          setPlaceHolder("No bookings found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const infoEnter = () => {
    if (content === "" && title === "") {
      return onChange();
    } else
      onTrigger({
        title: title,
        content: content,
      });
  };
  return (
    <>
      <Modal
        title="Enter new Task"
        visible={open}
        onOk={infoEnter}
        onCancel={onChange}
      >
        <div className="mb-4">
          <p>Title: </p>
          <Input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <p>Content: </p>
          <Input
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          <p>Assignee: </p>
          <Input onChange={(e) => userList(e)} placeholder="Assignee" />
          {users.map((i, index) => {
            return (
              <span key={index} className="mr-2 border-2 p-1 relative top-2">
                {i.name}
              </span>
            );
          })}
          <span>{(userResult?.length === 0 || users?.length>0) && placeholder}</span>
          <div className="max-h-[100px] mt-4">
            {userResult.map((i, index) => {
              return (
                <div
                  key={i._id}
                  className="border-2 mt-1 cursor-pointer"
                  onClick={() => {
                    let user = [...users, { name: i.name, email: i.email }];
                    setUsers(user);
                    let result = [...userResult];
                    result.splice(index, 1);
                    setUserResult(result);
                  }}
                >
                  <p>Name: {i.name}</p>
                  <p>Email: {i.email}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connect(null, {
  resetUsersList,
  getUser,
})(ModalOpen);
