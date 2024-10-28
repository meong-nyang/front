/** @jsxImportSource @emotion/react */
import * as s from "./style";

function AdminSiteSettingPage(props) {
    return (
        <div css={s.layout}>
            <span>정보수정</span>
            <div css={s.information}>
                <img src="" alt="" />
                <table>
                    <tbody>
                        <tr>
                            <th>상호명</th>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td></td>
                            <th>기본 배송비</th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span>공지사항</span>
            <div css={s.notice}>
                준비중
            </div>
        </div>
    );
}

export default AdminSiteSettingPage;