import Div from "components/common/Div";
import CommonStyle from "components/style";
import React from "react"
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
    aspect-ratio: 1/1;
    width: ${props => {
      return props.width ? props.width : "100%"
    }};
    border-top: 3px solid ${ CommonStyle.setColor("grey3") };
    border-bottom: 3px solid ${ CommonStyle.setColor("grey3") };
    border-left: 3px solid ${ CommonStyle.setColor("grey3") };
    border-right: 3px solid ${ CommonStyle.setColor("grey6") };
    border-radius: 50%;
    
    animation: ${ spin } 0.8s linear infinite;
`

const Spinner = ({ width }) => {
  return (
    <Div flex="row_center" width={ width }>
      <Loader/>
    </Div>
  );
};

export default Spinner;