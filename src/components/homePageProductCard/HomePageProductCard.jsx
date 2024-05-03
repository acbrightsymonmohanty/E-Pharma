import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Group products by category
    const groupedProducts = {};
    getAllProduct.forEach((item) => {
        if (!groupedProducts[item.category]) {
            groupedProducts[item.category] = [];
        }
        groupedProducts[item.category].push(item);
    });

    // Last 10 products
    const lastTenProducts = getAllProduct.slice(-20);

    return (
        <div className="mt-10">
            {/* Display Last 10 Products */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="mb-5">
                        <h1 className="text-center mb-3 text-2xl font-semibold">New Launch</h1>
                    </div>
                    <div className="flex items-center overflow-x-scroll" style={{ "-ms-overflow-style": "none", "scrollbar-width": "none", "overflow": "-moz-scrollbars-none" }}>
                        {lastTenProducts.map((item, index) => (
                            <div key={index} className="p-4 md:w-1/4" style={{ minWidth: "320px", maxWidth: "100%" }}>
                                <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                    <img
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                        className="lg:h-80 h-96 w-full"
                                        src={item.productImageUrl}
                                        alt={item.title}
                                    />
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                            E-Pharma
                                        </h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                            {item.title.substring(0, 25)}
                                        </h1>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                            ₹{item.price}
                                        </h1>
                                        <div className="flex justify-center">
                                            {cartItems.some((p) => p.id === item.id) ? (
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                >
                                                    Delete From Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addCart(item)}
                                                    className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                >
                                                    Add To Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Display Products Grouped by Category */}
            {Object.entries(groupedProducts).map(([category, products], index) => (
                <section key={index} className="text-gray-600 body-font">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="mb-5">
                            <h1 className="text-center mb-3 text-2xl font-semibold">{category}</h1>
                        </div>
                        <div className="flex items-center overflow-x-scroll" style={{ "-ms-overflow-style": "none", "scrollbar-width": "none", "overflow": "-moz-scrollbars-none" }}>
                            {products.map((item, index) => (
                                <div key={index} className="p-4 md:w-1/4" style={{ minWidth: "320px", maxWidth: "100%" }}>
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <img
                                            onClick={() => navigate(`/productinfo/${item.id}`)}
                                            className="lg:h-80 h-96 w-full"
                                            src={item.productImageUrl}
                                            alt={item.title}
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                E-Pharma
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {item.title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{item.price}
                                            </h1>
                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                    >
                                                        Delete From Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                    >
                                                        Add To Cart
                                                </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default HomePageProductCard;
