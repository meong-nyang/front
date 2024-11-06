/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { RiImageAddLine } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { IMAGE_ADDRESS } from "../../../apis/util/instance";

function ProductImages({imgSource, setImgSource, isModify}) {
    
    const [ preview, setPreview ] = useState([]);

    useEffect(() => {
        console.log(imgSource);
        if(!!imgSource) {
            let tempPreview = [];
            for (let i of imgSource) {
                if (i instanceof Blob) {
                    tempPreview.push(URL.createObjectURL(i));
                } else {
                    tempPreview.push(IMAGE_ADDRESS + i);
                }
            }
            setPreview(tempPreview);
        }
    }, [imgSource]);

    const handleImageChangeOnClick = () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");
        fileInput.setAttribute("multiple", "true");
        fileInput.click();

        fileInput.onchange = (e) => {
            if (imgSource.length + e.target.files.length > 10) {
                return alert("이미지는 최대 10개까지만 등록이 가능합니다");
            }
            for (let i of e.target.files) {
                setImgSource(file => [...file, i]);
            }
        }
    }

    const handleImageDeleteOnClick = (index) => {
        setImgSource(img => img.filter((data, i) => i !== index));
    }

    return (
        <div css={s.images}>
            {
                preview.map((img, index) => 
                    <span key={index}>
                        <img src={img}/>
                        {
                            isModify &&
                            <GiCancel onClick={() => handleImageDeleteOnClick(index)}/>
                        }
                    </span>
                )
            }
            {
                 isModify && imgSource.length < 10 &&
                <div onClick={handleImageChangeOnClick}><RiImageAddLine /></div>
            }
        </div>
    );
}

export default ProductImages;