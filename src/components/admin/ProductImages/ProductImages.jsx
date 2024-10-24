/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { RiImageAddLine } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

function ProductImages({blobs, setBlobs, isModify}) {
    
    const [ imgsPreview, setImgsPreview ] = useState([]);

    useEffect(() => {
        const urls = blobs.map(blob => URL.createObjectURL(blob));
        setImgsPreview(urls);
    }, [blobs]);

    const handleImageChangeOnClick = () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");
        fileInput.setAttribute("multiple", "true");
        fileInput.click();

        fileInput.onchange = (e) => {
            if (blobs.length + e.target.files.length > 10) {
                return alert("이미지는 최대 10개까지만 등록이 가능합니다");
            }
            for (let i of e.target.files) {
                setBlobs(file => [...file, i]);
            }
        }
    }

    const handleImageDeleteOnClick = (index) => {
        const newFiles = []
        for (let i = 0; i < blobs.length; i++) {
            if (i !== index) {
                newFiles.push(blobs[i]);
            }
        }
        setBlobs(newFiles);
    }

    return (
        <div css={s.images}>
            {
                imgsPreview.map((img, index) =>
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
                imgsPreview.length < 10 && isModify &&
                <div onClick={handleImageChangeOnClick}><RiImageAddLine /></div>
            }
        </div>
    );
}

export default ProductImages;