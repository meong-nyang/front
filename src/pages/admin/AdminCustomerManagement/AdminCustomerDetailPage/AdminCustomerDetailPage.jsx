/** @jsxImportSource @emotion/react */
import * as s from "./style";

function AdminCustomerDetailPage(props) {
    return (
        <div css={s.layout}>
            <div css={s.buttons}>
                <button>정보 수정 요청</button>
            </div>
            <span>기본정보</span>
            <table css={s.basicInfo}>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td></td>
                        <th>이름</th>
                        <td></td>
                        <th>연락처</th>
                        <td></td>
                        <th>등급</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>가입일</th>
                        <td></td>
                        <th>최초 구매일자</th>
                        <td></td>
                        <th>최근 구매일자</th>
                        <td></td>
                        <th>소비금액</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>배송지</th>
                        <td></td>
                        <th>결제수단</th>
                        <td></td>
                        <th>요청사항</th>
                        <td colSpan={3}></td>
                    </tr>
                </tbody>
            </table>
            <span>반려동물정보</span>
            <div css={s.petInfo}>
                <img src="" alt="" />
                <table>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>나이</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>종류</th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span>구매한 상품</span>
            <table css={s.productTable}>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>구매횟수</th>
                        <th>단가</th>
                        <th>금액</th>
                        <th>최근구매일</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    );
}

export default AdminCustomerDetailPage;