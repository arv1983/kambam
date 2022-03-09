import { IconButtonStyle } from "./style";
import { AiOutlineSend } from "react-icons/ai";

const IconButton = (data) => {
  return (
    <IconButtonStyle>
      <div>
        <AiOutlineSend />
      </div>
      <div>{data.text}</div>
    </IconButtonStyle>
  );
};

export default IconButton;
