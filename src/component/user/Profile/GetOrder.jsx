import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

export default function GetOrder() {
  const getOrder = async () => {
    const token = localStorage.getItem("userToken");

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
      headers: { Authorization: `Tariq__${token}` },
    });
    return data.orders;
  };
  const { data, isLoading } = useQuery("getOrder", getOrder);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div className="getOrder">
      
        {data.length ? (
          data.map((order, index) => (
            <div className="getOrderDetails" key={order._id}>
              <table  width="700" className="px-5">
        <tr className="rowOne">
          <th width="100" className="px-2">address </th>
          <th width="100 " className="px-4">coupon Name </th>
          <th width="100" className="px-2" >created At </th>
          <th width="100" className="px-4">final Price </th>
          <th width="100" className="px-4">payment Type </th>
          <th width="100" className="px-4">phone Number </th>
          <th width="100" className="px-2">status </th>
        </tr>
              <tr className="rowTow" align="center">
                <td>{order.address}</td>
                <td>{order.couponName}</td>
                <td>{order.createdAt}</td>
                <td>{order.finalPrice}</td>
                <td>{order.paymentType}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.status}</td>
              </tr>      </table>

            </div>
          ))
        ) : (
          <h2> order not found</h2>
        )}
    </div>
  );
}
