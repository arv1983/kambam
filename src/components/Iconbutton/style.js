import styled from "styled-components";

export const IconButtonStyle = styled.div`
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
  background: #3498db;
  color: #fff;
  display: flex;
  max-width: 300px;

  :hover {
    background: #2980b9;
  }

  :active {
    background: #2980b9;

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
