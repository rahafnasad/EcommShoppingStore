import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

export default function GetOrder() {
  const getOrder = async () => {
    const token = localStorage.getItem("userToken");

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
      headers: { Authorization: `Tariq__${token}` },
    });
console.log(data);
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
                        <h3> Order {index}</h3>

                        <table bgcolor="black" width="700" className="px-5">
        <tr bgcolor="grey">
            <th width="100">address  </th>
            <th width="100" >coupon Name  </th>
            <th width="100">created At  </th>
            <th width="100">final Price  </th>
            <th width="100">payment Type  </th>
            <th width="100">phone Number  </th>
            <th width="100">status  </th>
        </tr>
        <tr bgcolor="lightgrey" align="center">
            <td>{order.address}</td>
            <td>{order.couponName}</td>
            <td>{order.createdAt}</td>
            <td>{order.finalPrice}</td>
            <td>{order.paymentType}</td>
            <td>{order.phoneNumber}</td>
            <td>{order.status}</td>
        </tr>

            </table>
            


          </div>
        ))
      ) : (
        <h2> order not found</h2>
      )}
    </div>
  );
}
