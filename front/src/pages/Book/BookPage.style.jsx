import styled from 'styled-components';
import posting from '../../assets/img/btn/posting.svg';
import star from '../../assets/img/userInterFace/star.svg';
import library from '../../assets/img/userInterFace/local_library.svg';

const BookBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;
`;

const TitleBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4.8rem;
  line-height: 4.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  //독서중, 독서완료
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

const PlusBtn = styled.button`
  background: url(${posting});
  width: 4.4rem;
  height: 4.4rem;
  position: fixed;
  right: 2.5rem;
  bottom: 7.6rem;
  z-index: 1;
`;

const NoItem = styled.p`
  height: 40rem;
  line-height: 40rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
`;

const BookListBox = styled.ul`
  width: 32rem;
  margin: 0 auto 1rem auto;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const BookItem = styled.li`
  display: flex;
  flex-direction: row;
  height: 11.6rem;
  margin-top: 3.6rem;

  :first-child {
    margin-top: 0;
  }
  img {
    width: 8rem;
    height: 11.6rem;
  }
`;

const BookTitle = styled.div`
  height: 3.2rem;
  font-weight: 400;
  h4 {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.$white1};
    margin-bottom: 0.4rem;
    width: 22.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const BookStatus = styled.div`
  height: auto;
  margin: 1.6rem 0 0.8rem 0;

  p {
    display: inline-block;
    height: 2rem;
    line-height: 2rem;
    vertical-align: middle;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }

  span {
    display: inline-block;
    width: 3.8rem;
    height: 1.8rem;
    line-height: 1.9rem;
    margin-right: 0.4rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.$white1};
    text-align: center;
    vertical-align: middle;
  }

  span.orange {
    background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
    letter-spacing: -0.06rem;
  }

  span.gray {
    background: ${({ theme }) => theme.colors.$white4};
    letter-spacing: -0.06rem;
  }

  span.blue {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    letter-spacing: -0.06rem;
    width: 4.7rem;
  }
`;

const BookPage = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.8rem;
  flex: 1;
  height: 1.4rem;
  line-height: 1.4rem;

  p {
    width: 4rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
    margin-right: 0.4rem;
  }
  div {
    width: 18rem;
    height: 1.4rem;
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const BookState = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.$black3Line};
  height: 2rem;
  padding-top: 0.4rem;
  display: flex;
  flex-direction: row;

  p {
    padding-left: 1.9rem; //아이콘 사이즈 16 + 숫자 간격 3
    width: auto;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }

  p.bookmark {
    background: url(${star}) left center no-repeat;
    margin-right: 1.8rem;
  }

  p.loanCount {
    background: url(${library}) left center no-repeat;
    color: yellow;
  }
`;

const style = { BookBox, TitleBox, PlusBtn, BookListBox, NoItem, BookInfo, BookItem, BookTitle, BookStatus, BookPage, BookState };

export default style;
