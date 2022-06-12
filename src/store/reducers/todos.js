const defaultState = JSON.parse(localStorage.getItem("persist:root")) || "";

export default function Todos(state = defaultState, action) {
  function findId(id) {
    return state.findIndex(function (el, i) {
      return el.id === parseInt(id);
    });
  }

  switch (action.type) {
    case "ADD_TODO":
      let lastId = 0;

      if (state != "") {
        lastId = state;
        lastId.sort(function (a, b) {
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        });

        lastId = lastId[0].id;
      }

      var data = new Object();
      data["id"] = lastId + 1;
      data["assunto"] = action.payload.assunto;
      data["tarefa"] = action.payload.tarefa;
      data["stage"] = 1;
      data["order"] = 0;
      data["prioridade"] = action.payload.prioridade;
      data["cor"] = action.payload.cor;

      state.push(data);

      return [...state];

    case "MOVE_TODO":
      let idMove = findId(parseInt(action.payload.draggable));
      state[idMove].order = parseInt(action.payload.order);
      state[idMove].stage = parseInt(action.payload.destination);

      return [...state];

    case "EDIT_TODO":
      let idEdit = findId(parseInt(action.payload.id));

      state[idEdit].assunto = action.payload.assunto;
      state[idEdit].tarefa = action.payload.tarefa;
      state[idEdit].cor = action.payload.cor;
      state[idEdit].prioridade = action.payload.prioridade;

      return [...state];

    case "DELETE_TODO":
      state.splice(
        state.findIndex((i) => i.id === action.payload.id),
        1
      );

      return [...state, data];

    default:
      return state;
  }
}
