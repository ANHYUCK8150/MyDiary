import styled from 'styled-components';

const ChatBox = styled.div`
  margin: 0 auto;
`;

const NoItem = styled.p`
  line-height: 41rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
`;

const RoomListBox = styled.ul`
  width: 34rem;
  margin: auto;
`;

const RoomBox = styled.li`
  display: flex;
  width: 34rem;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  margin-bottom: 2.4rem;
  font-size: 2rem;

  :first-child {
    margin-top: 0.8rem;
  }

  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 2.4rem;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  margin-left: 0.8rem;

  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  display: flex;
  p {
    color: ${({ theme }) => theme.colors.$white1};
    font-size: 1.6rem;
    font-weight: 400;
  }
  span {
    margin-left: auto;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const SubBox = styled.div`
  display: flex;
  margin-top: 1rem;
  p {
    color: ${({ theme }) => theme.colors.$white3};
    font-size: 1.4rem;
  }

  span {
    margin-left: auto;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$primaryBlueP};
    padding: 0.3rem;
    font-size: 1.2rem;
    border-radius: 1.5rem;

    &.hide {
      display: none;
    }
  }
`;

const style = { ChatBox, RoomListBox, RoomBox, InfoBox, SubBox, TitleBox, NoItem };

export default style;
