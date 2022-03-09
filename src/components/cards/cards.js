import { IconButtonStyle } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as TodoActions from "../../store/actions/todos";
import IconButton from "../Iconbutton";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";

import { BsPencil } from "react-icons/bs";

const Card = (data) => {
  const dispatch = useDispatch();
  const [assuntoInput, setAssuntoInput] = useState(data.data.assunto);
  const [tarefaInput, setTarefaInput] = useState(data.data.tarefa);
  const [corInput, setCorInput] = useState(data.data.cor);
  const [prioridadeInput, setPrioridadeInput] = useState(data.data.prioridade);

  let cor = "red";

  {
    data.data.prioridade === "baixa"
      ? (cor = "#3bb54a")
      : data.data.prioridade === "media"
      ? (cor = "#ffe135")
      : (cor = "#b3404a");
  }

  let bg = "";
  switch (data.data.cor) {
    case "1":
      bg = "(#1fe4f5, #3fbafe)";
      break;
    case "2":
      bg = "(#fbc1cc, #fa99b2)";
      break;
    case "3":
      bg = "(#76b2fe, #b69efe)";
      break;
    case "4":
      bg = "(#60efbc, #58d5c9)";
      break;
    case "5":
      bg = "(#f588d8, #c0a3e5)";
      break;
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  function handleOpenModal() {
    setIsOpen(true);
  }
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
  function handleCloseModal() {
    setIsOpen(false);
  }

  function deleteCard(e) {
    console.log(e);
    dispatch(
      TodoActions.deleteTodo({
        id: data.data.id,
        items: data.items,
        setItems: data.setItems,
      })
    );
    setIsOpen(false);
  }

  function handleSubmit(e) {
    if (!assuntoInput || !tarefaInput) {
      e.preventDefault();
    } else {
      dispatch(
        TodoActions.editTodo({
          id: data.data.id,
          assunto: assuntoInput,
          tarefa: tarefaInput,
          cor: corInput,
          prioridade: prioridadeInput,
        })
      );

      setIsOpen(false);
    }
  }
  return (
    <>
      <Modal
        style={style}
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
      >
        <h2>Editar tarefa</h2>

        <form onSubmit={(e) => handleSubmit(e)} id="my=form">
          <h3 className={"marginTop"}>Tarefa</h3>
          <input
            type="text"
            onChange={(e) => setAssuntoInput(e.target.value)}
            defaultValue={data.data.assunto}
          ></input>
          <h3 className={"marginTop"}>Descrição</h3>
          <textarea
            type="text"
            onChange={(e) => setTarefaInput(e.target.value)}
            defaultValue={data.data.tarefa}
          ></textarea>
          <h3 className={"marginTop"}>Prioridade</h3>
          <div
            style={{ display: "flex" }}
            onChange={(e) => setPrioridadeInput(e.target.value)}
          >
            <input
              type="radio"
              value="alta"
              name="prioridade"
              defaultChecked={data.data.prioridade === "alta" ? "true" : ""}
            />
            Alta
            <input
              type="radio"
              value="media"
              name="prioridade"
              defaultChecked={data.data.prioridade === "media" ? "true" : ""}
            />{" "}
            Média
            <input
              type="radio"
              value="baixa"
              name="prioridade"
              defaultChecked={data.data.prioridade === "baixa" ? "true" : ""}
            />{" "}
            Baixa
          </div>

          <h3 className={"marginTop"}>Cor do card</h3>

          <div
            style={{ display: "flex" }}
            onChange={(e) => setCorInput(e.target.value)}
          >
            <input
              type="radio"
              value="1"
              name="corCard"
              defaultChecked={data.data.cor === "1" ? "true" : ""}
            />{" "}
            Azul
            <input
              type="radio"
              value="2"
              name="corCard"
              defaultChecked={data.data.cor === "2" ? "true" : ""}
            />{" "}
            Rosa
            <input
              type="radio"
              value="3"
              name="corCard"
              defaultChecked={data.data.cor === "3" ? "true" : ""}
            />{" "}
            Lilás
            <input
              type="radio"
              value="4"
              name="corCard"
              defaultChecked={data.data.cor === "4" ? "true" : ""}
            />{" "}
            Verde
            <input
              type="radio"
              value="5"
              name="corCard"
              defaultChecked={data.data.cor === "5" ? "true" : ""}
            />{" "}
            Roxo
          </div>
          <div className="rowClass">
            <a onClick={(e) => deleteCard(e)}>
              <DeleteButton
                text="Deletar"
                form="my-form"
                type="submit"
              ></DeleteButton>
            </a>

            <a onClick={(e) => handleSubmit(e)}>
              <EditButton
                form="my-form"
                type="submit"
                text="Editar"
              ></EditButton>
            </a>
          </div>
        </form>
      </Modal>
      <IconButtonStyle
        style={{
          background: "radial-gradient" + bg,
          borderLeft: "8px solid " + cor,
        }}
      >
        <center>
          <h3>{data.data.assunto}</h3>
          <a onClick={() => handleOpenModal()}>
            <BsPencil />
          </a>
        </center>
        <h5>{data.data.tarefa}</h5>
      </IconButtonStyle>
    </>
  );
};

export default Card;
