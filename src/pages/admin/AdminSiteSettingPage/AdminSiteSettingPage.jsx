/** @jsxImportSource @emotion/react */
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as s from "./style";
import { IMAGE_ADDRESS, instance } from "../../../apis/util/instance";
import { useRef, useState } from "react";
import { changeFormatToPhoneNumber, convertToCommaValue, convertToNumericValue, onlyNumber } from "../../../utils/changeStringFormat";

function AdminSiteSettingPage(props) {

    const inputFileRef = useRef();

    const queryClient = useQueryClient();

    const [ isModify, setModify ] = useState(false);
    const [ siteData, setSiteData ] = useState({
        siteName: "",
        siteAddress: "",
        sitePhone: "",
        defaultDeliverCost: "",
        imgSrc: "",
        deleteImgName: ""
    });
    const [ logo, setLogo ] = useState();

    const getSiteSettingData = useQuery(
        ["getSiteSettingDataQuery"],
        async () => await instance.get("/admin/setting"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                setSiteData({
                    siteName: success.data.siteName,
                    siteAddress: success.data.siteAddress,
                    sitePhone: success.data.sitePhone,
                    defaultDeliverCost: success.data.defaultDeliverCost,
                    imgSrc: IMAGE_ADDRESS + success.data.imgName,
                    deleteImgName: success.data.imgName
                });
            },
            onError: error => {
                if(error.response.data === "noData") {
                    alert("등록된 정보가 없습니다. 정보를 등록해주세요");
                    setModify(true);
                }
            }
        }
    );

    const modifySiteSettingMutation = useMutation(
        async () => {
            const formData = new FormData();
            const siteDataEntries = Object.entries(siteData);
            for (let i of siteDataEntries) {
                formData.append(i[0], i[1]);
            }
            console.log(logo);
            if (!!logo) {
                formData.append("logo", logo, "site_logo." + logo.name.split(".").pop());
            }
            return await instance.put("/admin/setting", formData);
        }
    );

    const handleImgOnClick = () => {
        if(!isModify) {
            return;
        }
        inputFileRef.current.click();
    }

    const handleModifyButtonOnClick = () => {
        setModify(true);
    }

    const handleSaveButtonOnClick = () => {
        modifySiteSettingMutation.mutateAsync()
            .then(success => {
                alert("저장되었습니다.");
                getSiteSettingData.refetch();
                queryClient.invalidateQueries("siteLogoQuery");
                setModify(false);
            })
            .catch(error => {
                alert("저장에 실패하였습니다.");
            });
    }

    const handleCancelButtonOnClick = () => {
        setModify(false);
        getSiteSettingData.refetch();
    }

    const handleInputOnChange = (e) => {
        if(e.target.name === "defaultDeliverCost") {
            const value = convertToNumericValue(e.target.value);
            setSiteData(data => ({
                ...data,
                defaultDeliverCost: value === "" ? "0" : value.replace(/^0+/, "")
            }));
            return;
        } else if (e.target.name === "sitePhone") {
            setSiteData(data => ({
                ...data,
                sitePhone: changeFormatToPhoneNumber(e.target.value)
            }));
            return;
        }
        setSiteData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const handleFileOnChange = (e) => {
        setSiteData(data => ({
            ...data,
            imgSrc: URL.createObjectURL(e.target.files[0])
        }));
        setLogo(e.target.files[0]);
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
                    <img src={siteData.imgSrc} onClick={handleImgOnClick} />
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
                                    value={convertToCommaValue(siteData.defaultDeliverCost)} />
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