import { Spin } from "antd";
import Styled from "styled-components";

const SpinnerDesign = Styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform: -webkit-translate(-50%, -50%);
    transform: -moz-translate(-50%, -50%);
    transform: -ms-translate(-50%, -50%);
`;

const Spinner = () => {
  return (
    <SpinnerDesign>
      <Spin size="large" />
    </SpinnerDesign>
  );
};

export default Spinner;
