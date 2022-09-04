import styled from 'styled-components';
import posting from '../../assets/img/btn/posting.svg';

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

const style = { BookBox, TitleBox, PlusBtn };

export default style;
