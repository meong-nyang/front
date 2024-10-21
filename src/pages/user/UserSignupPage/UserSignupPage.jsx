import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';
import { useMutation } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

function UserSignupPage(props) {
    const [ userSignupData, setUserSignupData ] = useState({
        username: "",
        password: "",
        checkPassword: "",
        name: "",
        phone: "",
        zipcode: "",
        addressDefault: "",
        addressDetail: "",
        request: "",
        petName: "",
        petAge: "",
        petType: "",
    });

    const navigate = useNavigate();
    const [ addressDefault, setAddressDefault ] = useState("");
    const [ zipcode, setZipcode ] = useState("");
    // const [ extraAddress, setExtraAddress ] = useState(''); // 참고 항목 사용 안함
    const [ addressDetail, setAddressDetail ] = useState(''); // 상세 주소


    // 핸드폰 번호 입력 시 하이픈 자동 생성
    const addHyphenToPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return numbers;
    };

    // const handleInputChange = (e) => {
    //     const formattedPhoneNumber = addHyphenToPhoneNumber(e.target.value);
    //     setPhone(formattedPhoneNumber);
    // };

    // 다음 주소 검색 api
    useEffect(() => {
        // 다음 주소 검색 API 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            // 컴포넌트가 언마운트될 때 스크립트 제거
            document.body.removeChild(script);
        };
    }, []);

    const handleUserSginupDataChange = (e) => {
        const formattedValue = e.target.name === 'phone' 
            ? addHyphenToPhoneNumber(e.target.value) 
            : e.target.value;

        setUserSignupData(userSignupData => ({
            ...userSignupData,
            [e.target.name]: formattedValue
        }));
    };

    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 주소 검색 결과를 처리하는 로직
                let fullAddress = data.address;
                console.log(data);
                
                setZipcode(data.zonecode);
                setAddressDefault(fullAddress);
                setUserSignupData((prevData) => ({
                    ...prevData,
                    zipcode: data.zonecode,
                    addressDefault: fullAddress,
                }));
            },
        }).open();
    };

    const userSignup = useMutation(
        async () => await instance.post("/auth/signup", userSignupData),
        {
            onSuccess: () => {
                alert("회원가입이 완료되었습니다.");
                navigate("/auth/signin");
            },
            onError: error => {
                alert("회원가입에 실패했습니다." + error.response?.data.message || error.message);
            },
        }
    );

    const handleUserSignupSubmitClick = () => {
        if (userSignupData.password !== userSignupData.checkPassword) {
            console.log(userSignupData);
            return;
        }

        console.log(userSignupData);
        userSignup.mutateAsync();
        // navigate("/auth/signup/pet");
    };

    return (
        <>
            <body css={s.layout}>
                <MainHeader />

                <h1>회원가입</h1>
                <div css={s.userSignupContainer}>
                    <div css={s.userSignupNavBox}>
                        <div css={s.userSignupNavBoxHeader}>
                            회원가입
                        </div>
                        <div css={s.userSignupNavBoxBody}>
                            <li>
                                회원정보 입력
                            </li>
                            <li>
                                반려동물 정보 입력
                            </li>
                        </div>
                        <div css={s.userSignupNavBoxFooter}>
                            네브박스 컴포넌트로 빼기
                        </div>
                    </div>
                    <div css={s.signupBox}>
                        <div css={s.formInput}>
                            <h3>회원정보 입력</h3>
                            
                            <div>
                                {/* 네브박스 컴포넌트로 빼기, 중복확인 기능, 글자수 제한, 검색창, 장바구니 구현 */}
                                <label htmlFor="">아이디</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    onChange={handleUserSginupDataChange} 
                                    value={userSignupData.username}
                                />
                                <button>중복화깅</button>
                            </div>
                            <div>
                                <label htmlFor="">비밀번호</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    onChange={handleUserSginupDataChange} 
                                    value={userSignupData.password}
                                />
                            </div>
                            <div>
                                <label htmlFor="">비밀번호 확인</label>
                                <input 
                                    type="password" 
                                    name="checkPassword" 
                                    onChange={handleUserSginupDataChange} 
                                    value={userSignupData.checkPassword}
                                />
                            </div>
                            <div>
                                <label htmlFor="">이름</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    onChange={handleUserSginupDataChange} 
                                    value={userSignupData.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">전화번호</label>
                                <input 
                                    type="text" 
                                    name='phone'
                                    onChange={handleUserSginupDataChange}
                                    value={userSignupData.phone} 
                                />
                            </div>
                            <div>
                                <label htmlFor="">주소</label>
                                <div css={s.addressInput}>
                                    <div>
                                        <input 
                                            type="text" 
                                            name="zipcode" 
                                            placeholder="우편번호" 
                                            value={zipcode} 
                                            readOnly 
                                        />
                                        <button type="button" onClick={handleSearchAddress}>
                                            주소찾기
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="addressDefault" 
                                        placeholder="주소" 
                                        value={addressDefault} 
                                        readOnly 
                                    />
                                    <input 
                                        type="text" 
                                        name="addressDetail" 
                                        placeholder="상세주소" 
                                        onChange={handleUserSginupDataChange} 
                                        value={userSignupData.addressDetail} 
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div css={s.formInput}>
                            <h4>반려동물 정보 입력</h4>
                            <div>
                                <label htmlFor="">반려동물 이름</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label htmlFor="">나이</label>
                                <input type="text" />
                            </div>
                            <div>
                                <div css={s.typeBox}>
                                    <label htmlFor="">종류</label>
                                    <div>
                                        <input type="radio" name='type'/>
                                        <label htmlFor="">강아지</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='type'/>
                                        <label htmlFor="">고양이</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='type'/>
                                        <label htmlFor="">그 외 아이들</label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <button onClick={handleUserSignupSubmitClick}>회원가입</button>
                    </div>
                </div>
            </body>
        </>
    );
}

export default UserSignupPage;