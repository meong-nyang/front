/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function AdminSigninPage(props) {

    const navigate = useNavigate();

    const [ loginData, setLoginData ] = useState({
        username: "",
        password: ""
    });

    const loginMutation = useMutation(
        async () => await instance.post("/auth/admin/signin", loginData),
    );

    const handleBackButtonOnClick = () => {
        navigate("/");
    }

    const handleInputOnChange = (e) => {
        setLoginData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const handleLoginButtonOnClick = () => {
        loginMutation.mutateAsync().then((response) => {
            localStorage.setItem("accessToken", "Bearer " + response.data.token);
            instance.interceptors.request.use(config => {
                config.headers["Authorization"] = localStorage.getItem("accessToken");
                return config;
            });
            navigate("/admin", {replace: true});
        }).catch((error) => {
            alert("로그인에 실패하였습니다. \n정보를 확인해주세요");
        });
    }

    return (
        <div css={s.layout}>
            <button css={s.back} onClick={handleBackButtonOnClick} ><MdArrowBack />홈페이지로 이동</button>
            <main css={s.main}>
                <div>관리자 로그인</div>
                <div css={s.inputBox}>
                    <p>아이디</p>
                    <input type="text" name="username" onChange={handleInputOnChange} />
                </div>
                <div css={s.inputBox}>
                    <p>비밀번호</p>
                    <input type="password" name="password" onChange={handleInputOnChange} />
                </div>
                {/* <div css={s.findPassword}><div>비밀번호 찾기</div></div> */}
                <button css={s.button} onClick={handleLoginButtonOnClick}>로그인</button>
            </main>
        </div>
    );
}

export default AdminSigninPage;