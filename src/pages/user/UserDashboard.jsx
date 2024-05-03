import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { saveAs } from "file-saver";
import { fireDB } from "../../firebase/FirebaseConfig";
import myContext from "../../context/myContext";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { loading, getAllOrder, orderDelete } = context;

  // State to hold filtered orders
  const [userOrders, setUserOrders] = useState([]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (user && getAllOrder) {
      const filteredOrders = getAllOrder.filter(
        (order) => order.userid === user.uid
      );
      if (JSON.stringify(filteredOrders) !== JSON.stringify(userOrders)) {
        setUserOrders(filteredOrders);
      }
    }
  }, [user, getAllOrder, userOrders]);

  // Function to generate invoice for a single product
  const generateInvoice = (product, order) => {
    const invoiceContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invoice</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
              }
              .invoice-container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 2px solid #000;
                  border-radius: 10px;
              }
              .invoice-header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .invoice-header h2 {
                  margin: 0;
                  padding: 0;
                  font-size: 24px;
              }
              .invoice-header div {
                  font-size: 18px;
                  margin-bottom: 10px;
              }
              .invoice-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
              }
              .invoice-table th, .invoice-table td {
                  padding: 10px;
                  border-bottom: 1px solid #ddd;
                  text-align: left;
              }
              .invoice-table th {
                  background-color: #f5f5f5;
              }
              .invoice-total {
                  margin-top: 20px;
                  text-align: right;
                  font-size: 20px;
              }
          </style>
      </head>
      <body>
          <div class="invoice-container">
              <div class="invoice-header">
                  <h2>Invoice</h2>
                  <div>Order ID: ${order.id}</div>
                  <div>Date: ${order.date}</div>
                  <div>Category: ${product.category}</div>
              </div>
              <table class="invoice-table">
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>${product.title}</td>
                          <td>₹${product.price}</td>
                          <td>${product.quantity}</td>
                          <td>₹${product.price * product.quantity}</td>
                      </tr>
                  </tbody>
              </table>
              <div class="invoice-total">
                  Total: ₹${product.price * product.quantity}
              </div>
          </div>
      </body>
      </html>
      `;
    const blob = new Blob([invoiceContent], {
      type: "text/html;charset=utf-8",
    });
    saveAs(blob, `${product.title}_Invoice.html`);
  };

  // Function to handle review submission
  const submitReview = (productId) => {
    if (reviewText.trim() !== "") {
      fireDB
        .ref(`products/${productId}/reviews`)
        .push({
          user: user.uid,
          review: reviewText.trim(),
          date: new Date().toISOString(),
        })
        .then(() => {
          setReviewText("");
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
        });
    }
  };

  const cancelOrderStatus = async (orderId) => {
    try {
      const orderRef = doc(fireDB, "order", orderId); // Make sure the collection name is correct
      await updateDoc(orderRef, {
        status: "cancel",
      });

      getAllOrderFunction();
      // Assuming this function refreshes the orders from Firestore
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };
 
  return (
    <Layout>
      <div className="container mx-auto px-4 py-5 lg:py-8">
        <div className="top bg-pink-50 py-5 rounded-xl border border-pink-100">
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              alt="User Icon"
            />
          </div>
          <div>
            <h1 className="text-center text-lg">
              <span className="font-bold">Name: </span>
              {user?.name || "Not Available"}
            </h1>
            <h1 className="text-center text-lg">
              <span className="font-bold">Email: </span>
              {user?.email || "Not Available"}
            </h1>
            <h1 className="text-center text-lg">
              <span className="font-bold">Date: </span>
              {user?.date || "Not Available"}
            </h1>
            <h1 className="text-center text-lg">
              <span className="font-bold">Role: </span>
              {user?.role || "Not Available"}
            </h1>
          </div>
        </div>

        <div className="bottom mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
          <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
          <div className="flex justify-center relative top-10">
            {loading && <Loader />}
          </div>
          {userOrders.length > 0 ? (
            userOrders.map((order, index) => (
              <div key={index}>
                {order.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
                  >
                    <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                      <div className="p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                          <div className="mb-4">
                            <div className="text-sm font-semibold text-black">
                              Product Id
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              #{item.id || "Unknown"}
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="text-sm font-semibold">Date</div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.date || "Unknown"}
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="text-sm font-semibold">
                              Total Amount
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              ₹ {item.price * item.quantity || 0}
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="text-sm font-semibold">
                              Order Status
                            </div>
                            <div
                              className={`text-sm font-medium ${
                                order.status === "pending"
                                  ? "text-red-800"
                                  : "text-green-900"
                              }`}
                            >
                              {order.status
                                ? order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)
                                : "Delivered"}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => generateInvoice(item, order)}
                            className="bg-pink-500 text-white py-2 px-4 rounded mt-4 hover:bg-pink-600"
                          >
                            Download Invoice
                          </button>
                          <button
                            onClick={() => cancelOrderStatus(order.id)}
                            className="bg-orange-500 text-white py-2 px-4 rounded mt-4 ml-2 hover:bg-red-600"
                          >
                            Cancel Order
                          </button>
                          
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-8">
                      <ul className="-my-7 divide-y divide-gray-200">
                        <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                          <div className="flex flex-1 items-stretch">
                            <div className="flex-shrink-0">
                              <img
                                className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                src={
                                  item.productImageUrl ||
                                  "https://via.placeholder.com/150"
                                }
                                alt="Product"
                              />
                            </div>
                            <div className="ml-5 flex flex-col justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  {item.title || "No Title"}
                                </p>
                                <p className="mt-1.5 text-sm font-medium text-gray-500">
                                  {item.category || "No Category"}
                                </p>
                              </div>
                              <div className="border-spacing-7 m-5">
                                <textarea
                                  type="text"
                                  placeholder="Review"
                                  value={reviewText}
                                  onChange={(e) =>
                                    setReviewText(e.target.value)
                                  }
                                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
                                />
                                <button
                                  onClick={() => submitReview(item.productId)}
                                  className="bg-pink-500 ml-5 rounded-3xl w-20 text-white hover:bg-pink-300"
                                >
                                  Submit
                                </button>
                              </div>
                              <p className="mt-4 text-sm font-medium text-gray-500">
                                x {item.quantity || 0}
                              </p>
                            </div>
                          </div>
                          <div className="ml-auto flex flex-col items-end justify-between">
                            <p className="text-right text-sm font-bold text-gray-900">
                              ₹ {item.price || 0}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-xl font-medium py-10">
              No orders found for this user.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
