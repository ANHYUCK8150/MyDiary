import styled from 'styled-components';
import posting from '../../assets/img/btn/posting.svg';
import KeyboardArrowUp from '../../assets/img/arrows/Keyboard_arrow_up.png';
import ExpandMore from '../../assets/img/arrows/expand_more.svg';

const MemoBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;
`;

const MemoWrap = styled.div`
  li {
    text-align: center;
    line-height: 41rem;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
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
      padding: 0 0.3rem;
      margin-right: 0.3rem;
      font-size: 1.4rem;
      font-weight: 400;

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

const MemoTitle = styled.div``;

const PlusBtn = styled.button`
  background: url(${posting});
  width: 4.4rem;
  height: 4.4rem;
  position: fixed;
  right: 2.5rem;
  bottom: 7.6rem;
  z-index: 1;
`;

const style = { MemoBox, PlusBtn, MemoWrap, MemoTitle };

export default style;
