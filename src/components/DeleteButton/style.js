import styled from "styled-components";

export const DeleteButtonStyle = styled.div`
  border: none;
  font-family: "Lato";
  font-size: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  border-radius: 5px;
  display: inline-block;
  margin: 0px 0px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  background: #ff5a4e;
  color: #fff;
  display: flex;
  max-width: 300px;

  :hover {
    background: #ff5a4e;
  }

  :active {
    background: #ff5a4e;

    top: 2px;
  }

  div {
    padding: 20px 20px;
    height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  div:nth-child(1) {
    background: rgba(0, 0, 0, 0.1);
  }
  div:nth-child(2) {
    padding: 20px 20px;
    height: 20px;
  }
`;
