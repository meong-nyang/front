/** @jsxImportSource @emotion/react */
import * as s from "./style";

function AdminSigninPage(props) {
    return (
        <div css={s.layout}>
            <main css={s.main}>
                <div>관리자 로그인</div>
                <div css={s.inputBox}>
                    <p>아이디</p>
                    <input type="text" />
                </div>
                <div css={s.inputBox}>
                    <p>비밀번호</p>
                    <input type="text" />
                </div>
                <div css={s.findPassword}><div>비밀번호 찾기</div></div>
                <button css={s.button}>로그인</button>
            </main>
        </div>
    );
}

export default AdminSigninPage;