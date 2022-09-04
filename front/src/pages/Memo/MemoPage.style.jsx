import styled from 'styled-components';
import posting from '../../assets/img/btn/posting.svg';
import KeyboardArrowUp from '../../assets/img/arrows/Keyboard_arrow_up.png';
import ExpandMore from '../../assets/img/arrows/expand_more.svg';

const MemoBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;
`;

const TitleBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 4.8rem;
  line-height: 4.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};

  h2:first-child {
    margin-right: 1rem;
  }
  h2:nth-child(2) {
    margin-right: auto;
  }
  .active {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
  }
  .hide {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white4};
  }
`;

const MemoWrap = styled.div`
  li {
    text-align: center;
    line-height: 41rem;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
  }
  .mymemo span {
    color: yellow;
  }
  ul div > li {
    text-align: left;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    letter-spacing: -0.15rem;
    line-height: 2.2rem;
    padding: 0 2rem 1rem 0;
    margin-top: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
    background: url(${ExpandMore}) right 0.25rem no-repeat;
    &.active {
      background: url(${KeyboardArrowUp}) right 0.25rem no-repeat;
    }

    span {
      display: inline-block;
      width: 4rem;
      text-align: center;
      padding: 0 0.3rem;
      margin-right: 0.3rem;
      font-size: 1.4rem;
      font-weight: 400;
      cursor: pointer;

      &.purple {
        background: purple;
      }
      &.blue {
        background: blue;
      }
      &.green {
        background: green;
      }
      &.steelblue {
        background: steelblue;
      }
      &.darksalmon {
        background: darksalmon;
      }
    }
  }
  //답글
  div > li:nth-child(2n) {
    display: none;
    white-space: pre-wrap;
    margin-top: 1.2rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.8rem;
    padding-right: 0;
    color: ${({ theme }) => theme.colors.$white2};
    word-break: break-all;
    border-bottom: none;
    background: none;

    &.active {
      display: block;
      background: none;
    }

    p {
      padding: 0 0.3rem;
      margin-right: 0.5rem;
      font-size: 1.4rem;
      font-weight: 400;
      text-align: right;
      color: ${({ theme }) => theme.colors.$KaKao};
    }
  }
`;

const ContentsBox = styled.div`
  margin-top: 1rem;
  input {
    height: 4.8rem;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.$black4Line};
    background-color: ${({ theme }) => theme.colors.$black3};
    color: ${({ theme }) => theme.colors.$whiteLine1};
    padding: 1.2rem 0;
    font-size: 1.4rem;
    font-weight: 600;
  }
  textarea {
    margin-top: 2rem;
    resize: none;
    width: 34rem;
    height: 20rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$black3};
  }
  span {
    display: block;
    height: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
    text-align: right;
    margin: 0.8rem 0 1.7rem 0;
  }
`;
const RadioWrap = styled.label`
  margin-top: 1rem;
`;
const RadioBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const FormCheckText = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  width: 5rem;
  height: 3rem;
  background: ${({ theme }) => theme.colors.$black3};
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.$white1};
`;

const FormCheckLeft = styled.input.attrs({ type: 'radio' })`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0 1rem;
    text-align: center;
    height: 3rem;
    line-height: 3.3rem;
    font-weight: 500;
    display: none;
  }
  &:checked + ${FormCheckText} {
    background: ${({ theme }) => theme.colors.$secondaryBlueS2};
    color: ${({ theme }) => theme.colors.$white1};
  }
  display: none;
`;

const PlusBtn = styled.button`
  background: url(${posting});
  width: 4.4rem;
  height: 4.4rem;
  position: fixed;
  right: 2.5rem;
  bottom: 7.6rem;
  z-index: 1;
`;
const ButtonBox = styled.ul`
  li {
    display: inline-block;
    margin: 0 1%;
    width: 48%;
  }
`;

const SaveButton = styled.div`
  height: 5rem;
  text-align: center;
  width: auto;
  border-radius: 0.4rem;
  line-height: 5rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1px;
  background: ${({ theme }) => theme.colors.$primaryBlueP};
  color: ${({ theme }) => theme.colors.$whiteLine1};
`;
const DeleteButton = styled.div`
  height: 5rem;
  text-align: center;
  width: auto;
  border-radius: 0.4rem;
  line-height: 5rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1px;
  background: ${({ theme }) => theme.colors.$danger};
  color: ${({ theme }) => theme.colors.$whiteLine1};
`;

const style = { MemoBox, TitleBox, PlusBtn, MemoWrap, ContentsBox, DeleteButton, ButtonBox, RadioWrap, SaveButton, RadioBox, FormCheckText, FormCheckLeft };

export default style;
