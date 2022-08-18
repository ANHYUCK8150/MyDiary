import styled from 'styled-components';

const ChatRoomBox = styled.div`
  width: 34rem;
  margin: 0 auto;
`;

const MemberBox = styled.div`
  background: ${({ theme }) => theme.colors.$black1};
  margin: 1rem auto;
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MemberInfo = styled.div`
  display: inline-block;
  margin: auto 0.7rem;
  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 2.4rem;
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
  .messageBox {
    margin: 0;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-end;
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
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2.2rem;
    padding: 0.7rem;
    border-radius: 0.5rem;
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 0.9rem;
  }
  div > span {
    margin: 0;
    color: ${({ theme }) => theme.colors.$white2};
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
      background: ${({ theme }) => theme.colors.$black4};
      color: ${({ theme }) => theme.colors.$white1};
    }
    img {
      display: none;
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
