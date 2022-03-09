import styled from "styled-components";

export const IconButtonStyle = styled.div`
  margin: 2px;
  padding: 5px;
  width: 90%;
  position: relative;
  display: grid;
  min-height: 90px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;

  center {
    height: 10px;
  }
  svg {
    position: absolute;
    width: 100px;
    transform: translate(48px, -19px);
  }
`;

// .card-1 {
//     background: radial-gradient(#1fe4f5, #3fbafe);
//   }

//   .card-2 {
//     background: radial-gradient(#fbc1cc, #fa99b2);
//   }

//   .card-3 {
//     background: radial-gradient(#76b2fe, #b69efe);
//   }

//   .card-4 {
//     background: radial-gradient(#60efbc, #58d5c9);
//   }

//   .card-5 {
//     background: radial-gradient(#f588d8, #c0a3e5);
//   }
