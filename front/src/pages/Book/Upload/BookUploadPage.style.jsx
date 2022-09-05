import styled from 'styled-components';

const UploadBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;
`;

const SearchBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;

  span {
    margin-top: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const BookList = styled.ul`
  margin-top: 1rem;

  li {
    text-align: center;
    display: inline-block;
    position: relative;
    width: 17rem;
    height: 23rem;
    border: 1px solid ${({ theme }) => theme.colors.$black3Line};
  }

  img {
    margin-top: 2.6rem;
    width: 8rem;
    height: 11.6rem;
  }

  h2 {
    width: 14rem;
    height: 4rem;
    margin: 1rem auto 0 auto;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p {
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    margin-top: 0.8rem;
    font-size: 1.2rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    color: ${({ theme }) => theme.colors.$white4};
  }
`;

const NoResult = styled.div`
  color: ${({ theme }) => theme.colors.$white3};
  text-align: center;
  font-size: 1.5rem;
  margin-top: 15rem;
`;

const ImgBox = styled.div`
  text-align: center;
  img {
    width: 8rem;
    height: 11.6rem;
    border: 1px solid ${({ theme }) => theme.colors.$black4Line};
    border-radius: 0.5rem;
    margin: 0.7rem;
  }
`;

const ContentsBox = styled.div`
  input {
    width: 34rem;
    height: 4.8rem;
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
    height: 12rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$black3};
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

const style = { SearchBox, BookList, NoResult, ImgBox, UploadBox, ContentsBox, SaveButton };

export default style;
