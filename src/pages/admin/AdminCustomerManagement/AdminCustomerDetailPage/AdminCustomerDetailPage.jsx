/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../../../apis/util/instance";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function AdminCustomerDetailPage(props) {

    const params = useParams();

    const [ isOpen, setOpen ] = useState(false);
    const [ membership, setMembership] = useState([]);
    const [ selectedMembership, setSelectedMembership ] = useState();

    useEffect(() => {
        membershipChangeMutation.mutateAsync()
            .then(() => customerDetailData.refetch())
            .catch(error => console.log(error.response));
    }, [selectedMembership]);

    const customerDetailData = useQuery(
        ["customerDetailDataQuery"],
        async () => await instance.get("/admin/user/" + params.id),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => setSelectedMembership(success.data.membership),
            onError: error => console.log(error.response)
        }
    );

    const membershipData = useQuery(
        ["membershipDataQuery"],
        async () => await instance.get("/admin/memberships"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                setMembership(success.data.membershipList);
            },
            onError: error => console.log(error.response)
        }
    );

    const membershipChangeMutation = useMutation(
        async () => await instance.put(`/admin/user/${params.id}/membership`, {userId: params.id, membershipId: selectedMembership.id})
    );

    const handleBackOnClick = (e) => {
        e.stopPropagation();
        setOpen(false);
    }

    const handleModalItemClick = (e, membership) => {
        e.stopPropagation();
        setOpen(false);
        setSelectedMembership(membership);
    };

    return (
        <div css={s.layout}>
            <div css={s.buttons}>
                <button>정보 수정 요청</button>
            </div>
            <span>기본정보</span>
            <table>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td>{customerDetailData?.data?.data.username}</td>
                        <th>이름</th>
                        <td>{customerDetailData?.data?.data.name}</td>
                        <th>연락처</th>
                        <td>{customerDetailData?.data?.data.phone}</td>
                        <th>등급</th>
                        <td onClick={() => setOpen(open => !open)} css={s.membershipCell}>
                            {customerDetailData?.data?.data.membership.membershipLevelName}
                            {
                                isOpen ?
                                <>
                                    <IoMdArrowDropup />
                                    <span css={s.backClick} onClick={handleBackOnClick}></span>
                                    <div css={s.modal}>
                                        {
                                            membership.map(data => (
                                                <button type="button" key={data.id} onClick={(e) => handleModalItemClick(e, data)}>
                                                    {data.membershipLevelName}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </>
                                :
                                <IoMdArrowDropdown />
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>가입일</th>
                        <td>{customerDetailData?.data?.data.createDate}</td>
                        <th>최초 구매일자</th>
                        <td>{customerDetailData?.data?.data.userPurchaseData?.initialPurchaseDate || "-"}</td>
                        <th>최근 구매일자</th>
                        <td>{customerDetailData?.data?.data.userPurchaseData?.recentlyPurchaseDate || "-"}</td>
                        <th>소비금액</th>
                        <td>{customerDetailData?.data?.data.userPurchaseData?.totalPrice || "0"}</td>
                    </tr>
                    <tr>
                        <th>배송지</th>
                        <td colSpan={7}>{customerDetailData?.data?.data.address ?
                            "(" + customerDetailData?.data?.data.address.zipcode + ")"
                            + " " + customerDetailData?.data?.data.address.addressDefault 
                            + ", " + customerDetailData?.data?.data.address.addressDetail : "-"}</td>
                    </tr>
                </tbody>
            </table>
            <span>반려동물정보</span>
            <div css={s.petInfo}>
                <table>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>{customerDetailData?.data?.data.pet?.petName || "-"}</td>
                        </tr>
                        <tr>
                            <th>나이</th>
                            <td>{customerDetailData?.data?.data.pet?.petAge || "-"}</td>
                        </tr>
                        <tr>
                            <th>종류</th>
                            <td>{customerDetailData?.data?.data.pet?.petType || "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span>구매한 상품</span>
            <table css={s.productTable}>
                <thead>
                    <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>구매횟수</th>
                        <th>단가</th>
                        <th>금액</th>
                        <th>최근구매일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customerDetailData?.data?.data.products.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.count}</td>
                                <td>{product.productPrice}</td>
                                <td>{product.totalPrice}</td>
                                <td>{product.recentlyPurchaseDate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AdminCustomerDetailPage;