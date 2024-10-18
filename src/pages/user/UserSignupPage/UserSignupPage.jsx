import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';
import { useMutation } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';

function UserSignupPage(props) {
    const [ userSignupData, setUserSignupData ] = useState({
        username: "",
        password: "",
        checkPassword: "",
        name: "",
        phone: "",
        address: "",
        zipcodce: "",
        addressDefault: "",
        addressDetail: "",
        request: "",
        petName: "",
        petAge: "",
        petType: "",
        
    });

    const navigate = useNavigate();
    const [ phone, setPhone ] = useState("");       // phone, address => userSignupData 에 묶어서 처리해주기
    const [ address, setAddress ] = useState("");
    const [ postcode, setPostcode ] = useState("");
    const [ extraAddress, setExtraAddress ] = useState(''); // 참고 항목
    const [ detailAddress, setDetailAddress ] = useState(''); // 상세 주소


    // 핸드폰 번호 입력 시 하이픈 자동 생성
    const addHyphenToPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return numbers;
    };

    const handleInputChange = (e) => {
        const formattedPhoneNumber = addHyphenToPhoneNumber(e.target.value);
        setPhone(formattedPhoneNumber);
    };

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
        setUserSignupData(userSignupData => ({
            ...userSignupData,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 주소 검색 결과를 처리하는 로직
                let fullAddress = data.address;
                let extraAddress = '';

                // 참고 항목이 있을 경우 추가
                if (data.addressType === 'R') {
                    if (data.bname) {
                        extraAddress += data.bname;
                    }
                    if (data.buildingName) {
                        extraAddress += (extraAddress ? ', ' + data.buildingName : data.buildingName);
                    }
                    fullAddress += (extraAddress ? ` (${extraAddress})` : '');
                }

                // 우편번호와 주소 상태 업데이트
                setPostcode(data.zonecode);
                setAddress(fullAddress);
                setExtraAddress(extraAddress);
            }
        }).open();
    };

    const userSignup = useMutation(
        async () => await instance.post("/auth/signup", userSignupData),
        {
            onSuccess: () => {
                alert("");
                navigate();
            },
            onError: error => {
                alert("x");
            }
        }
    );

    const handleUserSignupSubmitClick = () => {
        console.log(userSignupData);
        userSignup.mutateAsync();
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

                        </div>
                    </div>
                    <div css={s.signupBox}>
                        <div css={s.formInput}>
                            <h3>회원정보 입력</h3>
                            <div>
                                <label htmlFor="">아이디</label>
                                <input type="text" name="username" onChange={handleUserSginupDataChange} value={userSignupData.username}/>
                            </div>
                            <div>
                                <label htmlFor="">비밀번호</label>
                                <input type="password" name="password" onChange={handleUserSginupDataChange} value={userSignupData.password}/>
                            </div>
                            <div>
                                <label htmlFor="">비밀번호 확인</label>
                                <input type="password" name="checkPassword" onChange={handleUserSginupDataChange} value={userSignupData.checkPassword}/>
                            </div>
                            <div>
                                <label htmlFor="">이름</label>
                                <input type="text" name="name" onChange={handleUserSginupDataChange} value={userSignupData.name}/>
                            </div>
                            <div>
                                <label htmlFor="phone">전화번호</label>
                                <input type="text" name='phone' id='phone' onChange={handleInputChange} value={phone} />
                            </div>
                            <div>
                                <label htmlFor="">주소</label>
                                <div css={s.addressInput}>
                                    <div>
                                        <input 
                                            type="text" 
                                            name="postcode" 
                                            placeholder="우편번호" 
                                            value={postcode} 
                                            readOnly 
                                        />
                                        <button type="button" onClick={handleAddressSearch}>
                                            우편번호 찾기
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="address" 
                                        placeholder="주소" 
                                        value={address} 
                                        readOnly 
                                    />
                                    <input 
                                        type="text" 
                                        name="detailAddress" 
                                        placeholder="상세주소" 
                                        value={detailAddress} 
                                        onChange={(e) => setDetailAddress(e.target.value)} 
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
                        <button onClick={handleUserSignupSubmitClick}>반려동물 정보입력</button>
                    </div>
                </div>
            </body>
        </>
    );
}

export default UserSignupPage;