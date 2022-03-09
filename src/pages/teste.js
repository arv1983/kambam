import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Cards from "../components/cards/cards.js";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import IconButton from "../components/Iconbutton";
import * as TodoActions from "../store/actions/todos";
import { faMountain } from "@fortawesome/free-solid-svg-icons";

function App() {
  const dispatch = useDispatch();
  const [assuntoInput, setAssuntoInput] = useState("");
  const [tarefaInput, setTarefaInput] = useState("");
  const [corInput, setCorInput] = useState("1");
  const [prioridadeInput, setPrioridadeInput] = useState("alta");

  const onDragEnd = (result, columns, setColumns) => {
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

    moveTodoRedux(result);
  };

  function moveTodoRedux(e) {
    dispatch(
      TodoActions.moveTodo({
        draggable: e.draggableId,
        destination: e.destination.droppableId,
        order: e.destination.index,
      })
    );
  }

  function handleSubmit(e) {
    if (!assuntoInput || !tarefaInput) {
      e.preventDefault();
    } else {
      dispatch(
        TodoActions.addTodo({
          assunto: assuntoInput,
          tarefa: tarefaInput,
          cor: corInput,
          prioridade: prioridadeInput,
        })
      );
      handleCloseModal();
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  function handleOpenModal() {
    setIsOpen(true);
  }

  let colTodo = [];
  let colDoing = [];
  let colDone = [];

  let data = useSelector((state) => state);

  let itemsFromBackend = data.todos || [];

  itemsFromBackend.sort(function (a, b) {
    return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
  });

  itemsFromBackend.map(function (x) {
    switch (x.stage) {
      case 1:
        colTodo.push(x);

        break;
      case 2:
        colDoing.push(x);
        break;
      case 3:
        colDone.push(x);

        break;
    }
  });

  const columnsFromBackend = {
    ["1"]: {
      name: "A fazer",
      items: colTodo,
      className: "todo",
    },
    ["2"]: {
      name: "Fazendo",
      items: colDoing,
      className: "doing",
    },
    ["3"]: {
      name: "Feito",
      items: colDone,
      className: "done",
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  const style = {
    content: {
      border: "0",
      borderRadius: "4px",
      bottom: "auto",

      left: "50%",
      padding: "2rem",
      position: "relative",
      right: " 0 auto",
      top: "50%", // start from center

      transform: "translate(-50%,-50% )",
      width: "0px",
      maxWidth: "40rem",
      minWidth: "350px",
    },
  };

  return (
    <>
      <Modal
        style={style}
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
      >
        <h2>Adicionar nova tarefa</h2>

        <form onSubmit={(e) => handleSubmit(e)} id="my=form">
          <h3 className={"marginTop"}>Tarefa</h3>
          <input
            type="text"
            onChange={(e) => setAssuntoInput(e.target.value)}
          ></input>
          <h3 className={"marginTop"}>Descrição</h3>
          <textarea
            type="text"
            onChange={(e) => setTarefaInput(e.target.value)}
          ></textarea>
          <h3 className={"marginTop"}>Prioridade</h3>
          <div
            style={{ display: "flex" }}
            onChange={(e) => setPrioridadeInput(e.target.value)}
          >
            <input type="radio" value="alta" name="prioridade" defaultChecked />{" "}
            Alta
            <input type="radio" value="media" name="prioridade" /> Média
            <input type="radio" value="baixa" name="prioridade" /> Baixa
          </div>

          <h3 className={"marginTop"}>Cor do card</h3>

          <div
            style={{ display: "flex" }}
            onChange={(e) => setCorInput(e.target.value)}
          >
            <input type="radio" value="1" name="corCard" defaultChecked /> Azul
            <input type="radio" value="2" name="corCard" /> Rosa
            <input type="radio" value="3" name="corCard" /> Lilás
            <input type="radio" value="4" name="corCard" /> Verde
            <input type="radio" value="5" name="corCard" /> Roxo
          </div>

          <a onClick={(e) => handleSubmit(e)}>
            <IconButton form="my-form" type="submit" text="Enviar"></IconButton>
          </a>
        </form>
      </Modal>

      <div className="content">
        <a onClick={() => handleOpenModal()}>
          <IconButton text="Adcionar tarefa"></IconButton>
        </a>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, columnsFromBackend, setColumns)
            }
          >
            {Object.entries(columnsFromBackend).map(
              ([columnId, column], index) => {
                return (
                  <div
                    className={`header-todo header-height-todo todo ${column.className}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={columnId}
                  >
                    <h2>{column.name}</h2>
                    <div style={{ margin: 8 }}>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                borderColor: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : column.className + "Grade",
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                                height: "100%",
                              }}
                              className={`header-todo header-height-todo todo ${column.className}Grade`}
                            >
                              {column.items &&
                                column.items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={
                                        item.id && item.id.toString()
                                      }
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <Cards
                                              data={item}
                                              items={itemsFromBackend}
                                            />
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
              }
            )}
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default App;
