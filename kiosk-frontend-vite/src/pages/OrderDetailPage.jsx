import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/admin/orders/${orderId}`)
      .then(res => {
        console.log("✅ 주문 상세 응답:", res.data);
        setOrder(res.data);
      })
      .catch(err => {
        console.error("❌ 상세 조회 실패:", err);
        alert("상세 조회 실패");
      });
  }, [orderId]);

  const updateStatus = async () => {
    try {
      await axios.patch(`http://localhost:8081/api/admin/orders/${orderId}/status`, null, {
        params: { status: "COMPLETED" }
      });
      alert("✅ 상태 변경 완료");
      setOrder(prev => ({ ...prev, status: "COMPLETED" }));
    } catch (err) {
      console.error("❌ 상태 변경 실패:", err);
      alert("상태 변경 실패");
    }
  };

  if (!order) return <p>📦 주문 정보를 불러오는 중입니다...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 주문 상세</h2>
      <p>🆔 주문번호: {order.orderId}</p>
      <p>💰 총 금액: {order.totalPrice.toLocaleString()}원</p>
      <p>📌 상태: {order.status}</p>

      <h4>🧾 주문 항목</h4>
      <ul>
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.menuName} / 수량: {item.quantity}개 / 단가: {item.price.toLocaleString()}원
          </li>
        ))}
      </ul>

      {order.status === "PENDING" && (
        <button onClick={updateStatus} style={{ marginTop: "20px" }}>
          ✅ 완료 처리(COMPLETED)
        </button>
      )}

      <br />
      <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        🔙 뒤로가기
      </button>
    </div>
  );
}

export default OrderDetailPage;
