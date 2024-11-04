/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../../apis/util/instance";
import { useRef, useState } from "react";
import { isNumber, onlyNumber } from "../../../utils/checkFormat";
import { v4 as uuidv4 } from 'uuid';

function AdminSiteSettingPage(props) {

    const inputFileRef = useRef();

    const [ isModify, setModify ] = useState(false);
    const [ siteData, setSiteData ] = useState({
        siteName: "",
        siteAddress: "",
        sitePhone: "",
        defaultDeliverCost: ""
    });
    const [ logo, setLogo ] = useState();

    const getSiteSettingData = useQuery(
        ["getSiteSettingDataQuery"],
        async () => await instance.get("/admin/setting"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                setSiteData(success.data);
            },
            onError: error => console.log(error.response)
        }
    );

    const modifySiteSettingMutation = useMutation(
        async () => await instance.put("/admin/setting", siteData)
    );

    const modifySiteLogoMutation = useMutation(
        async () => {
            const formData = new FormData();
            console.log("site_logo." + logo.name.split(".").pop());
            formData.append("logo", logo, "site_logo." + logo.name.split(".").pop());
            await instance.post("/admin/setting/logo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        }
    );

    const handleImgOnClick = () => {
        if(!isModify) {
            return;
        }
        if(window.confirm("사이트 로고를 변경하시겠습니까?")) {
            inputFileRef.current.click();
        }
    }

    const handleModifyButtonOnClick = () => {
        setModify(true);
    }

    const handleSaveButtonOnClick = () => {
        modifySiteSettingMutation.mutateAsync()
            .then(success => {
                modifySiteLogoMutation.mutateAsync()
                    .then(success => {
                        alert("수정되었습니다.");
                        getSiteSettingData.refetch();
                    })
                    .catch(error => {
                        alert("알수 없는 이유로 수정에 실패하였습니다.");
                        getSiteSettingData.refetch();
                    });
            })
            .catch(error => {
                alert("알수 없는 이유로 수정에 실패하였습니다.");
                getSiteSettingData.refetch();
            });
        setModify(false);
    }

    const handleCancelButtonOnClick = () => {
        setModify(false);
        getSiteSettingData.refetch();
    }

    const handleInputOnChange = (e) => {
        if(e.target.name === "defaultDeliverCost") {
            const value = onlyNumber(e.target.value);
            setSiteData(data => ({
                ...data,
                defaultDeliverCost: value === "" ? "0" : value.replace(/^0+/, "")
            }));
            return;
        }
        setSiteData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const handleFileOnChange = (e) => {
        setLogo(e.target.files[0]);
        console.log(e.target.files[0].name.split(".").pop());
    }

    return (
        <div css={s.layout}>
            <div css={s.title}>
                <span>정보수정</span>
                {
                    isModify
                    ? 
                    <div>
                        <button onClick={handleSaveButtonOnClick}>저장</button>
                        <button onClick={handleCancelButtonOnClick}>취소</button>
                    </div>
                    : <button onClick={handleModifyButtonOnClick}>수정하기</button>
                }
            </div>
            <div css={s.information}>
                <div css={s.imageLayout(isModify)}>
                    <img src={!!logo && URL.createObjectURL(logo)} onClick={handleImgOnClick} />
                    
                </div>
                <input type="file" css={s.fileInput} ref={inputFileRef} onChange={handleFileOnChange}/>
                <table>
                    <tbody>
                        <tr>
                            <th>상호명</th>
                            <td colSpan={3}>
                                <input type="text" 
                                    disabled={!isModify}
                                    onChange={handleInputOnChange}
                                    name="siteName"
                                    value={siteData.siteName} />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan={3}>
                                <input type="text"
                                    disabled={!isModify}
                                    onChange={handleInputOnChange}
                                    name="siteAddress"
                                    value={siteData.siteAddress} />
                            </td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td>
                                <input type="text"
                                    disabled={!isModify}
                                    onChange={handleInputOnChange}
                                    name="sitePhone"
                                    value={siteData.sitePhone} />
                            </td>
                            <th>기본 배송비</th>
                            <td>
                                <input type="text"
                                    disabled={!isModify}
                                    onChange={handleInputOnChange}
                                    name="defaultDeliverCost"
                                    value={siteData.defaultDeliverCost} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span>공지사항</span>
            <div css={s.notice}>
                준비중
            </div>
        </div>
    );
}

export default AdminSiteSettingPage;