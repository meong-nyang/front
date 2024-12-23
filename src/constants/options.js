export const MENU_DATAS = [
    {
        menuId: 1,
        name: "대시보드",
        address: "/admin"
    },
    {
        menuId: 2,
        name: "상품관리",
        address: "/admin/product/list?page=1"
    },
    {
        menuId: 3,
        name: "재고관리",
        address: "/admin/stock?page=1"
    },
    {
        menuId: 4,
        name: "주문관리",
        address: "/admin/order?page=1"
    },
    {
        menuId: 5,
        name: "고객관리",
        address: "/admin/customer?page=1"
    },
    {
        menuId: 6,
        name: "통계",
        address: "/admin/statistics"
    },
    {
        menuId: 7,
        name: "사이트설정",
        address: "/admin/setting"
    }
];

export const LOCATION_DATAS = [
    {
        address: "/admin/product/list",
        menuId: 2,
        name: "상품관리 > 상품목록"
    },
    {
        address: "/admin/product/register",
        menuId: 2,
        name: "상품관리 > 상품등록"
    },
    {
        address: "/admin/product/detail",
        menuId: 2,
        name: "상품관리 > 상세정보"
    }, 
    {
        address: "/admin/product/modify",
        menuId: 2,
        name: "상품관리 > 상품수정"
    },
    {
        address: "/admin/stock/detail",
        menuId: 3,
        name: "재고관리 > 상세"
    },
    {
        address: "/admin/stock",
        menuId: 3,
        name: "재고관리"
    },
    {
        address: "/admin/order/detail",
        menuId: 4,
        name: "주문관리 > 상세"
    },
    {
        address: "/admin/order",
        menuId: 4,
        name: "주문관리 > 주문목록"
    },
    {
        address: "/admin/customer/detail",
        menuId: 5,
        name: "고객관리 > 상세"
    },
    {
        address: "/admin/customer",
        menuId: 5,
        name: "고객관리"
    },
    {
        address: "/admin/statistics",
        menuId: 6,
        name: "통계"
    },
    {
        address: "/admin/setting",
        menuId: 7,
        name: "사이트설정"
    },
    {
        address: "/admin",
        menuId: 1,
        name: "대시보드"
    }
]

export const PRODUCT_SEARCH_OPTIONS = [
    {
        id: "all",
        name: "전체",
    },
    {
        id: "code",
        name: "상품코드",
    },
    {
        id: "product",
        name: "상품명",
    },
    {
        id: "category",
        name: "카테고리",
    }
]

export const ORDER_SEARCH_OPTIONS = [
    {
        id: "all",
        name: "전체"
    },
    {
        id: "number",
        name: "주문번호"
    },
    {
        id: "productId",
        name: "상품코드"
    },
    {
        id: "productName",
        name: "상품명"
    },
    {
        id: "status",
        name: "상태"
    }
]

export const CUSTOMER_SEARCH_OPTIONS = [
    {
        id: "all",
        name: "전체"
    },
    {
        id: "id",
        name: "아이디"
    },
    {
        id: "name",
        name: "이름"
    },
    {
        id: "membership",
        name: "등급"
    }
]

export const STOCK_SEARCH_OPTIONS = [
    {
        id: "전체",
        name: "전체"
    },
    {
        id: "상품코드",
        name: "상품코드"
    },
    {
        id: "상품명",
        name: "상품명"
    },
]

export const STOCK_DETAIL_SEARCH_OPTIONS = [
    {
        id: "전체",
        name: "전체"
    },
    {
        id: "구분",
        name: "구분"
    },
    {
        id: "상태",
        name: "상태"
    }
]