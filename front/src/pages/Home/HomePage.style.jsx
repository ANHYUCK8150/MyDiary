import styled from 'styled-components';

const HomeBox = styled.div`
  margin: 0 auto;

  h2 {
    color: ${({ theme }) => theme.colors.$white3};
    font-size: 1.4rem;
    text-align: left;
    margin: 1rem 0;
  }
`;

const MyProfile = styled.ul`
  width: 34rem;
  margin: auto;

  li > div > div > span {
    display: none;
  }
`;

const UserProfile = styled.ul`
  width: 34rem;
  margin: auto;

  li {
    border-bottom: none;
    margin-bottom: 1rem;
  }
`;

const MemberBox = styled.li`
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
`;

const SubBox = styled.div`
  display: flex;
  margin-top: 1rem;
  p {
    width: 22rem;
    color: ${({ theme }) => theme.colors.$white3};
    font-size: 1.4rem;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    margin-left: auto;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$primaryBlueP};
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    border-radius: 1.5rem;
    cursor: pointer;
  }
`;

const LoginButton = styled.button`
  color: ${({ theme }) => theme.colors.$black};
  background-color: ${({ theme }) => theme.colors.$KaKao};
  padding: 0.4rem 0.8rem;
  font-size: 1.6rem;
  border-radius: 1.5rem;
`;

const style = { HomeBox, MyProfile, UserProfile, MemberBox, TitleBox, SubBox, InfoBox, LoginButton };

export default style;
