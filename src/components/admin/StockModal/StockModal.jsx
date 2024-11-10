/** @jsxImportSource @emotion/react */
import * as s from "./style";

function StockModal({ setOpen,  }) {

    return (
        <div css={s.background} onClick={() => setOpen(false)}>
            <div css={s.layout} onClick={(e) => e.stopPropagation()}>
                <div css={s.headerInput}>
                    <span>주문 수량</span>
                    <input type="text" />
                    <span>입고 일자</span>
                    <input type="date" />
                    <button>입고 신청</button>
                </div>
                <div css={s.mainContainer}>
                    
                </div>
            </div>
        </div>
    );
}

export default StockModal;