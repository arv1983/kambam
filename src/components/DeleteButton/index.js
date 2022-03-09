import { DeleteButtonStyle } from "./style";
import { BsFillTrashFill } from "react-icons/bs";

const IconButton = (data) => {
  return (
    <DeleteButtonStyle>
      <div>
        <BsFillTrashFill />
      </div>
      <div>{data.text}</div>
    </DeleteButtonStyle>
  );
};

export default IconButton;
