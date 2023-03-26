import React, { useEffect, useState } from "react";
import { addItem, handleLoading } from "../redux/productSlice";
import AddProductForm from "../components/AddProductForm";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();

  const productList = useSelector((item) => item.productReducer);

  const getData = async (e) => {
    dispatch(handleLoading("pending"));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      dispatch(addItem([]));
      const response = await fetch(
        "https://react-redux-firebase-40205-default-rtdb.firebaseio.com/products.json",
        requestOptions
      );

      if (!response.ok) {
        dispatch(handleLoading("rejected"));
        throw new Error("api send request error");
      }
      const result = await response.json();
      let data = [];
      for (const key in result) {
        data.push({
          id: key,
          name: result[key].name,
          price: result[key].price,
        });
      }

      dispatch(handleLoading("accepted"));
      dispatch(addItem(data));
    } catch (err) {
      dispatch(handleLoading("rejected"));
      throw new Error("api is not a working");
    }
  };
  if (productList.status === "rejected") {
    return <div>500 error</div>;
  }
  return (
    <div className="w-[80%] m-auto mt-10">
      <AddProductForm getData={getData} />
      <div>
        {productList.status === "pending"
          ? "loading..."
          : productList.products.map((item) => {
              return (
                <div>
                  <div>name:{item.name}</div>
                  <div>price:{item.price}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Home;
