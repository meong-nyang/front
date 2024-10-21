/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../apis/util/instance";
import { useNavigate } from "react-router-dom";

function AdminSigninPage(props) {

    const navigate = useNavigate();

    const [ loginData, setLoginData ] = useState({
        username: "",
        password: ""
    });

    const loginMutation = useMutation(
        async () => await instance.post("/auth/admin/signin", loginData)
    );

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
            navigate("/admin");
        }).catch((error) => {
            alert(error.response.data);
        });
    }

    return (
        <div css={s.layout}>
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
                <div css={s.findPassword}><div>비밀번호 찾기</div></div>
                <button css={s.button} onClick={handleLoginButtonOnClick}>로그인</button>
            </main>
        </div>
    );
}

export default AdminSigninPage;