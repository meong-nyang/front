/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../../apis/util/instance";
import { useState } from "react";

function ProductDetailModal({ setProductDetailModalOpen }) {

    const [ imgData, setImgData ] = useState(new Blob());

    const [ myUrl, setMyUrl ] = useState();

    const imgTest = useQuery(
        ["imgTest"],
        async () => await instance.get("/images/bdaee1a0-3b20-4b52-9b17-7f150a2d5db0_다운로드.jfif", {
            responseType: "blob"
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response.data);
                setImgData(response.data);
                setMyUrl(URL.createObjectURL(response.data));
            }
        }
    );

    return (
        <div css={s.background} onClick={() => setProductDetailModalOpen(false)}>
            <div css={s.layout}>
                {/* <img src="http://localhost:8080/images/25cc8765-b8dc-459b-ac1a-eed24f1be190다운로드 (1).jpg" alt="" /> */}
                <img src={myUrl} alt="" />
            </div>
        </div>
    );
}

export default ProductDetailModal;