/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../../apis/util/instance";
import { useState } from "react";

function ProductDetailModal({ setProductDetailModalOpen }) {

    const [ imgData, setImgData ] = useState(new Blob());

    const imgTest = useQuery(
        ["imgTest"],
        async () => await instance.get("/images/25cc8765-b8dc-459b-ac1a-eed24f1be190다운로드 (1).jpg", {
            responseType: "blob"
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response.data);
                setImgData(response.data);
            }
        }
    );

    return (
        <div css={s.background} onClick={() => setProductDetailModalOpen(false)}>
            <div css={s.layout}>
                {/* <img src="http://localhost:8080/images/25cc8765-b8dc-459b-ac1a-eed24f1be190다운로드 (1).jpg" alt="" /> */}
                <img src={URL.createObjectURL(imgData)} alt="" />
            </div>
        </div>
    );
}

export default ProductDetailModal;