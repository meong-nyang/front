/** @jsxImportSource @emotion/react */
import * as s from "./style";

function ProductDetailModal({ detailImg, setOpen }) {

    return (
        <div css={s.background} onClick={() => setOpen(false)}>
            <div css={s.layout} onClick={(e) => e.stopPropagation()}>
                <button>이거</button>
            </div>
        </div>
    );
}

export default ProductDetailModal;