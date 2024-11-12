/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import { IMAGE_ADDRESS, instance } from "../../../../apis/util/instance";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { convertToCommaValue } from "../../../../utils/changeStringFormat";

function OrderDetailPage(props) {

    const params = useParams();
    const navigate = useNavigate();

    const orderDetailData = useQuery(
        ["orderDetailDataQuery"],
        async () => await instance.get(`/admin/orders/detail/${params.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => console.log(success),
            onError: error => console.log(error.response)
        }
    );

    const orderDeleteMutation = useMutation(
        async () => await instance.delete(`/admin/order/${params.id}`)
    );

    const handleOrderCancelOnClick = () => {
        if (window.confirm("정말로 주문을 삭제하시겠습니까?")) {
            orderDeleteMutation.mutateAsync()
            .then(success => {
                alert("삭제되었습니다.");
                navigate("/admin/order?page=1");
            })
            .catch(error => alert("알수 없는 이유로 삭제에 실패했습니다."))
        }
    }

    return (
        <div css={s.layout}>
            {/* <div css={s.buttons}>
                <button onClick={handleOrderCancelOnClick}>주문 취소</button>
            </div> */}
            {
                orderDetailData.isSuccess && !orderDetailData.isFetching &&
                <>
                    <span>고객 정보</span>
                    <table>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>{orderDetailData.data.data.orderName}</td>
                                <th>연락처</th>
                                <td>{orderDetailData.data.data.phone}</td>
                                <th>결제수단</th>
                                <td>{orderDetailData.data.data.paymentName}</td>
                                <th>결제 여부</th>
                                <td>{orderDetailData.data.data.orderStatus}</td>
                            </tr>
                            <tr>
                                <th>요청사항</th>
                                <td colSpan={7}>{orderDetailData.data.data.request}</td>
                            </tr>
                        </tbody>
                    </table>
                    <span>주문 정보</span>
                    <table>
                        <tbody>
                            <tr>
                                <th>주문번호</th>
                                <td>{orderDetailData.data.data.id}</td>
                                <th>주문날짜</th>
                                <td>{orderDetailData.data.data.orderDate}</td>
                                <th>총 개수</th>
                                <td>{convertToCommaValue(orderDetailData.data.data.orderItemCount)}</td>
                                <th>총 금액</th>
                                <td>{convertToCommaValue(orderDetailData.data.data.totalPrice)}</td>
                            </tr>
                            <tr>
                                <th>배송지</th>
                                <td colSpan={7}>{orderDetailData.data.data.addressDefault}</td>
                            </tr>
                        </tbody>
                    </table>
                    <span>주문 상품 목록</span>
                    <div css={s.productList}>
                        {
                            orderDetailData?.data &&
                            orderDetailData.data.data.products.map((product, index) => (
                                <div>
                                    <span>{"상품" + (index + 1)}</span>
                                    <div css={s.productTable}>
                                        <img src={IMAGE_ADDRESS + product.imgName} />
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>상품명</th>
                                                    <td colSpan={3}>{product.productName}</td>
                                                </tr>
                                                <tr>
                                                    <th>상품코드</th>
                                                    <td>{product.id}</td>
                                                    <th>판매가격</th>
                                                    <td>{convertToCommaValue(product.productPrice)}</td>
                                                </tr>
                                                <tr>
                                                    <th>개수</th>
                                                    <td>{convertToCommaValue(product.productCount)}</td>
                                                    <th>합계</th>
                                                    <td>{convertToCommaValue(parseInt(product.productPrice) * parseInt(product.productCount))}</td>
                                                </tr>
                                            </tbody>
                                        </table> 
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default OrderDetailPage;