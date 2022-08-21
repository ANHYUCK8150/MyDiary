import styled from 'styled-components';
import gradation from '../../assets/img/userInterFace/myBookGradation.png';

const AccountBox = styled.div`
  width: 34rem;
  margin: 1rem auto 0 auto;
`;

const UserInfo = styled.div`
  text-align: left;
  //닉네임
  h2 {
    margin-top: 1.2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
  }
  //소개글
  h6 {
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: -0.15rem;
    color: ${({ theme }) => theme.colors.$white1};
  }
  //프로필 편집 버튼
  button {
    width: 34rem;
    margin: 1.6rem 0 2.4rem 0;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.colors.$black3Line};
    height: 3.2rem;
    line-height: 3.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }
`;

const Top = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: row;
  //user 이미지
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
  }
`;

const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 4.4rem;
  line-height: 4.4rem;
  //빌려줄 책 / 빌린 책
  h2 {
    width: 50%;
    font-size: 1.6rem;
    font-weight: 700;
    color: #bdc1c6;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  }
  .on {
    color: ${({ theme }) => theme.colors.$whiteLine1};
    border-bottom: 1px solid ${({ theme }) => theme.colors.$white1};
  }

  &.active {
    position: fixed;
    top: 6.4rem;
    width: 34rem;
    background: #212121;
    z-index: 2;
  }
`;
//탭 내용
const BookWrap = styled.div`
  text-align: left;
  min-height: 41rem;
`;

const NoItem = styled.p`
  text-align: center;
  line-height: 41rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
`;

const BookBox = styled.ul`
  margin: 2.8rem 0;

  //3장씩
  li {
    display: inline-block;
    position: relative;
    width: 10rem;
    height: 14.5rem;
    margin-top: 2rem;
  }
  li:nth-child(1),
  li:nth-child(2),
  li:nth-child(3) {
    margin-top: 0;
  }
  li:nth-child(3n + 2) {
    margin: 0 2rem;
  }
  img {
    vertical-align: top;
    width: 100%;
    height: 100%;
  }

  //book state
  p {
    display: block;
    width: 100%;
    height: 2.8rem;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background: url(${gradation}) no-repeat;
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
    color: ${({ theme }) => theme.colors.$white1};
  }
`;

const style = { AccountBox, UserInfo, Top, TabBox, BookBox, BookWrap, NoItem };
export default style;
