/** @jsxImportSource @emotion/react */
import { IMAGE_ADDRESS } from "../../../apis/util/instance";
import * as s from "./style";

function ProductDetailModal({ detailImg, setOpen }) {

    return (
        <div css={s.background} onClick={() => setOpen(false)}>
            <div css={s.layout} onClick={(e) => e.stopPropagation()}>
                {console.log(detailImg)}
                {
                    detailImg.map(imgName => 
                        <img src={IMAGE_ADDRESS + imgName} />
                    )
                }
            </div>
        </div>
    );
}

export default ProductDetailModal;