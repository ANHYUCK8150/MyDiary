/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setTitle, setAllFalse } from '../../app/headerSlice';
import SignApi from '../../util/SignApi';
import style from './LoginPage.style';
import noImg from '../../assets/img/logo/myb_default.svg';
import Loader from '../../components/common/Loader';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //변수
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [chkpassword, setChkPassword] = useState('');
  const [loader, setLoader] = useState(false);

  //api
  const { signUp } = SignApi;

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('회원가입'));
    return () => {};
  }, [dispatch]);

  //img change, preview
  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const saveImage = e => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImgFile(e.target.files[0]);
      setImgPreview(fileReader.result);
    };
  };

  //img change
  const onChangeImg = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  //nickname change
  const [Nerror, setNError] = useState('');
  const [Perror, setPError] = useState('');
  const [PCerror, setPCError] = useState('');

  const onChangeNN = e => {
    setName(e.target.value);
    setNError('');
  };

  const onChangePW = e => {
    setPassword(e.target.value);
    setPError('');
  };

  const onChangeChkPW = e => {
    setChkPassword(e.target.value);
    setPCError('');
  };

  //check
  const onCheckHandler = () => {
    if (!name) {
      setNError('이름을 입력하세요.');
      return;
    }

    if (!password) {
      setPError('비밀번호를 입력하세요.');
      return;
    }

    if (!chkpassword) {
      setPCError('비밀번호 확인을 입력하세요.');
      return;
    }

    if (password !== chkpassword) {
      setPCError('비밀번호가 다릅니다.');
      return;
    }
    submit();
  };

  const submit = () => {
    const formData = new FormData();
    formData.append('imageFile', imgFile);
    formData.append('name', name);
    formData.append('password', password);
    setLoader(true);
    signUp(formData, setLoader)
      .then(result => {
        if (result.result) {
          navigate(`/login`);
        } else {
          setNError(result.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const { SignUpBox, ImgBox, ImgChangeBtn, InfoBox, InputBox, SubmitBtn } = style;

  return (
    <SignUpBox>
      <ImgBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={imgPreview} onError={onErrorImg} alt="이미지" />
        <ImgChangeBtn onClick={onChangeImg}></ImgChangeBtn>
      </ImgBox>
      <InfoBox>
        <InputBox>
          <h4>이름</h4>
          <input type="text" value={name} placeholder="이름을 입력하세요." onChange={onChangeNN} className={Nerror && 'errorInput'} />
          <span>{Nerror !== '' ? Nerror : ''}</span>
        </InputBox>
        <InputBox>
          <h4>비밀번호</h4>
          <input type="password" value={password} placeholder="비밀번호를 입력하세요" onChange={onChangePW} className={Perror && 'errorInput'} />
          <span>{Perror !== '' ? Perror : ''}</span>
        </InputBox>
        <InputBox>
          <h4>비밀번호 확인</h4>
          <input type="password" value={chkpassword} placeholder="위와 같은 비밀번호를 입력하세요" onChange={onChangeChkPW} className={PCerror && 'errorInput'} />
          <span>{PCerror !== '' ? PCerror : ''}</span>
        </InputBox>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler} disabled={loader ? true : false}>
        회원가입 완료
      </SubmitBtn>
      {loader && <Loader />}
    </SignUpBox>
  );
};

export default SignUpPage;
