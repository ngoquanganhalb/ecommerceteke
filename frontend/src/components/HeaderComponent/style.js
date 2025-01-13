import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 15px 120px;
    background-color : rgb(26,148,255);
    display: flex;
    gap : 16px;
    flex-wrap: nowrap;
    width: 1270px;
    justify-content: center;
    align-items: center;
    padding : 10px 0;
`
export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color : #fff;
    font-weight:bold;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space:nowrap
`

export const WrapperContentPopup =styled.p`
    cursor: pointer;
    color:#fff
    &:hover {
        color: rgb(26, 148, 255);
    }
`
