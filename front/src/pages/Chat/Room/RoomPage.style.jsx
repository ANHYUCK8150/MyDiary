import styled from 'styled-components';

const ChatRoomBox = styled.div`
  width: 34rem;
  margin: 0 auto;
`;

const MemberBox = styled.div`
  width: 34rem;
  height: 8.5rem;
  padding-top: 0.5rem;
  top: 5.4rem;
  position: fixed;
  background: ${({ theme }) => theme.colors.$black0};
  margin: 1rem auto;
  overflow: scroll;
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 400;
    color: limegreen;
    margin-bottom: 0.4rem;
  }
`;

const MemberInfo = styled.div`
  display: inline-block;
  margin: auto 0.7rem;
  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 2.4rem;
    &.on {
      border: 3px solid lime;
    }
  }
  p {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const SendBox = styled.div`
  display: flex;
  position: fixed;
  width: 34rem;
  height: 5.6rem;
  bottom: 0;
  padding-top: 0.5rem;
  background: ${({ theme }) => theme.colors.$black1};
  border-top: 1px solid ${({ theme }) => theme.colors.$black3Line};
  img {
    height: 2.4rem;
    width: 2.4rem;
    margin: 1rem 0.6rem 0;
    cursor: pointer;
  }

  button {
    position: absolute;
    bottom: 2.5rem;
    right: 1.8rem;
    width: 2.4rem;
    height: 2.4rem;
  }

  textarea {
    overflow: hidden;
    resize: none;
    border-radius: 4px;
    padding: 1.2rem 4rem 1.2rem 1.1rem;
    width: 31.8rem;
    height: 4.5rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$black4};
    border: 1px solid ${({ theme }) => theme.colors.$white4};
  }
`;

const MessageBox = styled.div`
  padding-top: 8rem;
  .messageBox {
    margin: 0;
  }
`;

const Message = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.$white4};
  text-align: left;
  margin-bottom: 0.8rem;
  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 2.4rem;
    margin-right: 0.5rem;
  }
  p {
    max-width: 23.4rem;
    font-size: 1.4rem;
    font-weight: 400;
    background: #ef8585;
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2.2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 0.9rem;
    display: flex;
    align-items: flex-end;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  div > span {
    margin: 0 0 0.2rem 0;
    color: ${({ theme }) => theme.colors.$white2};
  }

  div > img {
    width: 15rem;
    height: 15rem;
    border-radius: 0rem;
  }

  &.another {
    flex-direction: row-reverse;
    span {
      margin-right: 0.9rem;
    }

    div > span {
      display: none;
    }
    p {
      background: #545562;
      color: ${({ theme }) => theme.colors.$white1};
    }
    img {
      display: none;
    }
    div > img {
      display: block;
      width: 15rem;
      height: 15rem;
      border-radius: 0rem;
    }
  }
`;

const DateMessage = styled.p`
  margin: 2rem 0 2rem 0;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};

  &.hide {
    display: none;
  }
`;

const style = { ChatRoomBox, MemberBox, MemberInfo, SendBox, MessageBox, Message, DateMessage };

export default style;
