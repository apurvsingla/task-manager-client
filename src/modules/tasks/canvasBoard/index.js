/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import Spinner from "components/loader";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import {
  createTasks,
  deleteTasks,
  fetchAllTasks,
  RetrieveTasks,
  updateTasks,
} from "store/actions/taskTypes";
import {v4} from "uuid";
import ModalOpen from "./components/modal";
import EditTask from "./components/taskOpener";

const itemsFromBackend = [];

const columnsFromBackend = {
  1: {
    name: "To do",
    items: itemsFromBackend,
  },
  2: {
    name: "In Progress",
    items: [],
  },
  3: {
    name: "Completed",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns, props) => {
  props.updateTasks({
    userId: props.userDetails?.id,
    type: parseInt(result.destination.droppableId),
    id: result.draggableId,
  });
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function CanvasBoard(props) {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [modalTrigger, setModalTrigger] = useState(0);
  const [taskOpener, setTaskOpener] = useState(false);
  const [itemOpener, setItemOpener] = useState({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchUserTask();
  }, [props.selectUser]);

  React.useEffect(() => {
    let task = [...props.tasks];
    let cols = {
      1: {
        name: "To do",
        items: [],
      },
      2: {
        name: "In Progress",
        items: [],
      },
      3: {
        name: "Completed",
        items: [],
      },
    };
    task.map((i) => {
      let index = cols[i.type].items.findIndex((j) => j.id === i.id);
      if (index < 0) {
        cols[i.type].items.push({
          id: i.id,
          content: i.description,
          title: i.title,
        });
      }
    });
    setColumns(cols);
  }, [props.tasks]);

  const fetchUserTask = async () => {
    try {
      setLoading(true);
      if (!props.selectUser) {
        props.RetrieveTasks();
      } else {
        props.fetchAllTasks();
      }
    } catch (error) {
      message.warning("Error in retrieving tasks");
    } finally {
      setLoading(false);
    }
  };
  const modalOpener = (index) => {
    setModalTrigger(index + 1);
  };

  const setNewTask = async (payload) => {
    try {
      setLoading(true);
      let cols = { ...columns };
      cols[1].items.push({
        id: v4(),
        content: payload.content,
        title: payload.title,
      });
      setColumns(cols);
      setModalTrigger(0);
      message.success("New Task Created Successfully");
      let newPayload = {
        title: payload.title,
        description: payload.content,
        userId: props?.userDetails?.id || "",
      };
      await props.createTasks(newPayload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      let key = 1;
      switch (itemOpener.column.name) {
        case "To do":
          key = 1;
          break;
        case "In Progress":
          key = 2;
          break;
        case "Completed":
          key = 3;
          break;
        default:
          break;
      }
      let col = itemOpener.column.items.findIndex((i) => i === itemOpener.item);
      let cols = { ...columns };
      cols[key].items.splice(col, 1);
      setColumns(cols);
      setTaskOpener(false);
      await props.deleteTasks(itemOpener.item.id);
    } catch (error) {
      message.error("Error in removing task");
    }
  };

  const updateTask = async () => {
    console.log("update Task");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      {loading && <Spinner />}
      {modalTrigger !== 0 && (
        <ModalOpen
          open={modalTrigger}
          onChange={() => {
            setModalTrigger(0);
          }}
          onTrigger={setNewTask}
        />
      )}

      {taskOpener && (
        <EditTask
          itemOpener={itemOpener}
          open={taskOpener}
          onClick={() => setTaskOpener(false)}
          deleteTask={deleteTask}
        />
      )}

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns, props)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
              key={columnId}
            >
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "rgb(243 244 246)",
                          padding: 4,
                          width: "20vw",
                          minHeight: 500,
                          height: "75vh",
                          borderRadius: "15px",
                        }}
                      >
                        <h2 className="font-semibold p-4">{column.name}</h2>
                        {index === 0 && (
                          <p
                            onClick={() => modalOpener(index)}
                            className="text-center border-2 mb-2 p-2 bg-gray-200 cursor-pointer border-gray-200 rounded-md text-cyan-600"
                          >
                            +
                          </p>
                        )}
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 8,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#FFD700"
                                        : "#FFF",
                                      color: "gray",
                                      borderRadius: "5px",
                                      ...provided.draggableProps.style,
                                    }}
                                    onClick={(e) => {
                                      setTaskOpener(true);
                                      setItemOpener({
                                        id: index,
                                        item,
                                        columnId,
                                        column,
                                      });
                                    }}
                                  >
                                    <h2 className="font-semibold text-lg">
                                      {item?.title}
                                    </h2>
                                    <p>{item.content}</p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.userDetails,
    tasks: state.taskReducer.tasks,
  };
};

export default connect(mapStateToProps, {
  RetrieveTasks,
  createTasks,
  deleteTasks,
  updateTasks,
  fetchAllTasks,
})(CanvasBoard);
