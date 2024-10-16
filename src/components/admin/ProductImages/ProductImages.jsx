/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { RiImageAddLine } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

function ProductImages( {selectedFiles, setSelectedFiles} ) {
    
    const [ imgsPreview, setImgsPreview ] = useState([]);

    useEffect(() => {
        const result = [];
        for (let i of selectedFiles) {
            result.push(URL.createObjectURL(i));
        }
        setImgsPreview(result);
    }, [selectedFiles]);

    const handleImageChangeOnClick = () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");
        fileInput.setAttribute("multiple", "true");
        fileInput.click();

        fileInput.onchange = (e) => {
            if (selectedFiles.length + e.target.files.length > 10) {
                return alert("이미지는 최대 10개까지만 등록이 가능합니다");
            }
            for (let i of e.target.files) {
                setSelectedFiles(file => [...file, i]);
            }
        }
    }

    const handleImageDeleteOnClick = (index) => {
        const newFiles = []
        for (let i = 0; i < selectedFiles.length; i++) {
            if (i !== index) {
                newFiles.push(selectedFiles[i]);
            }
        }
        setSelectedFiles(newFiles);
    }

    return (
        <div css={s.images}>
            {
                imgsPreview.map((img, index) =>
                    <span key={index} onClick={() => handleImageDeleteOnClick(index)}>
                        <img src={img}/>
                        <GiCancel />
                    </span>
                )
            }
            {
                imgsPreview.length < 10 &&
                <div onClick={handleImageChangeOnClick}><RiImageAddLine /></div>
            }
        </div>
    );
}

export default ProductImages;