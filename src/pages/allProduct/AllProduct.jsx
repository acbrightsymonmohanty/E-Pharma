import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import Carousal from "../carousal/Carousal";
import myContext from "../../context/myContext";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [filterOpen, setFilterOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [sortOrder, setSortOrder] = useState('lowToHigh');

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const filteredProducts = getAllProduct
        .filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
        .sort((a, b) => {
            if (sortOrder === 'lowToHigh') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div className="mb-5">
                    <Carousal />
                    <h1 className="text-center text-2xl font-semibold">All Products</h1>
                </div>

                {/* Filter */}
                <div className="flex justify-center mb-5">
                    <button
                        className="bg-gray-200 px-4 py-2 rounded-md mr-4"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        {filterOpen ? "Close Filter" : "Open Filter"}
                    </button>
                    {filterOpen && (
                        <div className="flex items-center">
                            <label className="mr-2">Price Range:</label>
                            <input
                                type="number"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                className="mr-2 w-16 border border-gray-400 rounded-md py-1 px-2"
                                placeholder="Min"
                            />
                            -
                            <input
                                type="number"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                className="ml-2 w-16 border border-gray-400 rounded-md py-1 px-2"
                                placeholder="Max"
                            />
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="ml-4 border border-gray-400 rounded-md py-1 px-2"
                            >
                                <option value="lowToHigh">Price: Low to High</option>
                                <option value="highToLow">Price: High to Low</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Products */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filteredProducts.map((item, index) => (
                                <div key={index} className="border p-4">
                                    <img
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                        src={item.productImageUrl}
                                        alt={item.title}
                                        className="w-70 h-60 object-cover cursor-pointer items-center"
                                    />
                                    <div className="mt-2">
                                        <h3 className="font-bold">{item.title}</h3>
                                        <p>₹{item.price}</p>
                                        <div className="flex justify-center mt-2">
                                            {cartItems.some((p) => p.id === item.id) ? (
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="bg-red-700 text-white px-4 py-2 rounded-md"
                                                >
                                                    Remove from Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addCart(item)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
