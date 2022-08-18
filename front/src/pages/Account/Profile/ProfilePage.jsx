/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBack, setSettings, setTitle, setAllFalse } from '../../../app/headerSlice';
import { setId, setName, setImageUrl, setIntroduction } from '../../../app/userSlice';
import utils from '../../../util/SignApi';
import style from './ProfilePage.style';
import noImg from '../../../assets/img/logo/myb_default.svg';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateUser } = utils;
  //setting - header
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle('프로필 편집'));
    dispatch(setSettings(false));
    return () => {
      // second;
    };
  }, [dispatch]);
  //setting - localStorage 값 없으면 user slice data : 있으면 localStorage data
  const user = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    introduction: user.introduction,
  });

  //img change, preview
  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState('');
  const [imgPreview, setImgPreview] = useState(localStorage.getItem('backImgPreview') === null ? '' : localStorage.getItem('backImgPreview'));
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
  const [error, setError] = useState('');
  const onChangeNN = e => {
    setUserInfo({
      ...userInfo,
      name: e.target.value,
    });
    setError('');
  };
  //introduction change
  const [textCount, setTextCount] = useState(user.introduction ? user.introduction.length : 0);
  const onChangeIntroduction = e => {
    if (e.target.value.length <= 100) {
      setUserInfo({
        ...userInfo,
        introduction: e.target.value,
      });
      setTextCount(e.target.value.length);
    }
  };
  //check
  const onCheckHandler = () => {
    if (userInfo.name === '') {
      setError('닉네임 입력이 필요합니다.');
      return;
    }
    submit();
  };

  const submit = () => {
    const formData = new FormData();
    formData.append('imageFile', imgFile);
    formData.append('name', userInfo.name);
    formData.append('introduction', userInfo.introduction);
    updateUser(formData)
      .then(result => {
        dispatch(setId(result.id));
        dispatch(setName(result.name));
        dispatch(setImageUrl(result.imageUrl));
        dispatch(setIntroduction(result.introduction));
        navigate('/account');
      })
      .catch(error => {
        setError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
      });
  };

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  const { ProfileBox, ImgBox, ImgChangeBtn, InfoBox, NickName, Introduction, SubmitBtn } = style;
  return (
    <ProfileBox>
      <ImgBox>
        <input type="file" accept="image/*" ref={inputRef} onChange={saveImage} style={{ display: 'none' }} />
        <img src={imgPreview === '' ? user.imageUrl : imgPreview} onError={onErrorImg} alt="이미지" />
        <ImgChangeBtn onClick={onChangeImg}></ImgChangeBtn>
      </ImgBox>
      <InfoBox>
        <NickName>
          <h4>이름</h4>
          <input type="text" value={userInfo.name || ''} placeholder="닉네임을 입력하세요." onChange={onChangeNN} className={error && 'errorInput'} />
          <span>{error !== '' ? error : ''}</span>
        </NickName>
        <Introduction>
          <h4>소개글</h4>
          <textarea placeholder="소개글을 입력해 주세요." onChange={onChangeIntroduction} value={userInfo.introduction} />
          <span>{textCount}/100</span>
        </Introduction>
      </InfoBox>
      <SubmitBtn onClick={onCheckHandler}>저장</SubmitBtn>
    </ProfileBox>
  );
};

export default ProfilePage;
