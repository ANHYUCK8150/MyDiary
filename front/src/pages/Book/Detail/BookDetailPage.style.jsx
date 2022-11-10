import styled from 'styled-components';
import opacity from '../../../assets/img/userInterFace/opacityBg.png';

const BookWrap = styled.div`
  width: 34rem;
  margin: 0 auto 2rem auto; //footer height:72
  text-align: left;

  .head {
    margin-top: 2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
  }
`;

const BookInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const BookImageBox = styled.div`
  text-align: center;
  margin-top: 4rem;
  img {
    width: 19.3rem;
    height: 28rem;
  }
`;

const TitleBox = styled.div`
  position: fixed;
  top: 6.4rem;
  h6 {
    width: 34rem;
    background: ${({ theme }) => theme.colors.$black0};
    border-top: 1px solid ${({ theme }) => theme.colors.$whiteLine1};
    padding-top: 0.8rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }
`;

const BookCont = styled.div`
  h4 {
    margin-top: 2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
  }
  p {
    min-height: 6rem;
    margin-top: 1rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const MemberWrap = styled.div``;
const MemberInfo = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.$black3Line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  padding: 2rem 0;
  display: flex;
  flex-direction: row;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
  }
  div {
    margin-left: 0.8rem;
  }
  div > h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
  }
  div > p {
    margin-top: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }
`;

const BookFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: url(${opacity}) repeat;
`;

const FooterBox = styled.div`
  width: 34rem;
  height: 7.2rem;
  padding: 1.4rem 0 1.5rem 0;
  margin: 0 auto;
  display: flex;

  button {
    margin: auto;
    width: 10.4rem;
    height: 3.6rem;
    line-height: 3.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};
    &.red {
      background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
    }
    &.blue {
      background: ${({ theme }) => theme.colors.$primaryBlueP};
    }
    &.orange {
      background: ${({ theme }) => theme.colors.$secondaryDeepOrangeS};
    }
  }
`;

const SettingBox = styled.div`
  margin: 2rem auto 3rem auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    padding: 0.3rem;
    margin-right: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};
    background: ${({ theme }) => theme.colors.$black4};
  }
  button {
    width: 8.4rem;
    height: 2.6rem;
    line-height: 1.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    border-radius: 4rem;
    color: ${({ theme }) => theme.colors.$white1};
    background: ${({ theme }) => theme.colors.$secondaryBlueS2};
  }
`;

const NoItem = styled.div`
  text-align: center;
  line-height: 10rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
`;

const RatingBox = styled.div`
  margin-top: 2rem;
  text-align: center;

  & svg {
    color: ${({ theme }) => theme.colors.$white3};
    cursor: pointer;
  }
  :hover svg {
    color: ${({ theme }) => theme.colors.$primaryBlueP};
  }
  & svg:hover ~ svg {
    color: ${({ theme }) => theme.colors.$white3};
  }
  .black {
    color: ${({ theme }) => theme.colors.$primaryBlueP};
  }
`;

const ReviewBox = styled.div`
  textarea {
    padding: 1rem;
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

  input {
    width: 34rem;
    padding: 1rem;
    margin-right: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};
    background: ${({ theme }) => theme.colors.$black4};
  }
`;

const SaveButton = styled.div`
  margin-top: 1rem;
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

const BookReviewBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.$black3Line};
  border-radius: 2rem;
  & svg {
    color: ${({ theme }) => theme.colors.$white3};
  }
  .black {
    color: ${({ theme }) => theme.colors.$primaryBlueP};
  }

  textarea {
    margin-top: 1rem;
    resize: none;
    width: 32rem;
    height: 8rem;
    font-size: 1.18rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$black0};

    :hover {
      cursor: default;
    }
    :focus {
      outline: none;
    }
    ::-webkit-scrollbar {
      width: 0.2rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.$black4};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.colors.$white1};
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  }
`;

const style = { BookWrap, BookInfo, TitleBox, RatingBox, BookReviewBox, SaveButton, ReviewBox, BookImageBox, BookCont, MemberWrap, MemberInfo, BookFooter, FooterBox, NoItem, SettingBox };

export default style;
