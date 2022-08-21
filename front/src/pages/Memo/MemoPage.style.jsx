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
  ul li {
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
  }
  //답글
  li:nth-child(2n) {
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
  }
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

const style = { MemoBox, PlusBtn, MemoWrap };

export default style;
