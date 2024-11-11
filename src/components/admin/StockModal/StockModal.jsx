/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { IoClose } from "react-icons/io5";

function StockModal({ setOpen,  }) {

    return (
        <div css={s.background} onClick={() => setOpen(false)}>
            <div css={s.layout} onClick={(e) => e.stopPropagation()}>
                <IoClose onClick={() => setOpen(false)}/>
                <div css={s.headerInput}>
                    <span>주문 수량</span>
                    <input type="text" />
                    <span>입고 예정 일자</span>
                    <input type="date" />
                    <button>입고 신청</button>
                </div>
                <div css={s.mainContainer}>
                    <div css={s.inbound}>
                        <span>입고 신청 내역</span>
                        <table css={s.table}>
                            <thead>
                                <th>신청일자</th>
                                <th>주문수량</th>
                                <th>도착 예정일</th>
                                <th>재고확정</th>
                            </thead>
                        </table>
                    </div>
                    <div css={s.inoutHistory}>
                        <span>입출고 기록</span>
                        <table>
                            <thead>
                                <th>구분</th>
                                <th>일자</th>
                                <th>수량</th>
                                <th>상태</th>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockModal;