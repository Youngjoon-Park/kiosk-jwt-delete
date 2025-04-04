import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/api/admin/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch(error => {
        console.error("주문 불러오기 실패:", error);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!Array.isArray(orders)) return <div>오류: 주문 형식이 배열이 아닙니다.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 주문 목록</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">주문번호</th>
            <th className="border p-2">메뉴</th>
            <th className="border p-2">수량</th>
            <th className="border p-2">총액</th>
            <th className="border p-2">상태</th>
            <th className="border p-2">시간</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr
              key={order.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/admin/orders/${order.id}`)}
            >
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">
                {Array.isArray(order.items)
                  ? order.items.map(item => item.name).join(', ')
                  : 'No items'}
              </td>
              <td className="border p-2">
                {Array.isArray(order.items)
                  ? order.items.map(item => item.quantity).join(', ')
                  : 'No items'}
              </td>
              <td className="border p-2">{order.totalAmount}원</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
