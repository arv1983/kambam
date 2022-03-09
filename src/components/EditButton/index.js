import { EditButtonStyle } from "./style";
import { AiOutlineEdit } from "react-icons/ai";

const IconButton = (data) => {
  return (
    <EditButtonStyle>
      <div>
        <AiOutlineEdit />
      </div>
      <div>{data.text}</div>
    </EditButtonStyle>
  );
};

export default IconButton;
