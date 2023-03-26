import React, { useEffect, useState } from "react";
import { addItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const AddProductForm = (props) => {
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: productInfo.name,
      price: productInfo.price,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-redux-firebase-40205-default-rtdb.firebaseio.com/products.json",
        requestOptions
      );
      if (!response.ok) {
        alert("something went wrong");
        throw new Error("api is not a working");
      }
      const result = await response.json();
      setIsLoading(false);
      props.getData();
      setProductInfo({
        name: "",
        price: "",
      });
    } catch (err) {
      console.log(err, "eroor");
      alert("api not working error");
    }
  };
  // dispatch(addItem(productInfo));
  return (
    <form onSubmit={formSubmitHandler}>
      <div class="mb-6">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Product name
        </label>
        <input
          onChange={(e) =>
            setProductInfo({ ...productInfo, name: e.target.value })
          }
          value={productInfo.name}
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="product name"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="price"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Price
        </label>
        <input
          onChange={(e) =>
            setProductInfo({ ...productInfo, price: e.target.value })
          }
          value={productInfo.price}
          type="text"
          id="price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AddProductForm;
