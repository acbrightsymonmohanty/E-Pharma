import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import myContext from "../../context/myContext";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const filteredProducts = getAllProduct
        .filter(p => p.category.includes(categoryname))
        .filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
        .sort((a, b) => sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price);

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row mt-10">
                <div className={`md:block ${filterOpen ? "block" : "hidden"} fixed left-0 top-0 h-screen md:h-auto md:static bg-white shadow-md md:shadow-none z-10 w-3/4 md:w-1/4 p-4 overflow-y-auto`}>
                    <button onClick={() => setFilterOpen(false)} className="md:hidden mb-4">Close</button>
                    <h2 className="font-bold text-lg mb-4">Filter Products</h2>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                            Sort Order
                        </label>
                        <select
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-700">Price Range</label>
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                className="mb-2 p-2 border rounded w-full"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                className="mb-4 p-2 border rounded w-full"
                            />
                        </div>
                    </div>
                </div>
                <button className="md:hidden mb-4" onClick={() => setFilterOpen(true)}>Filter</button>
                <div className="flex-grow md:ml-4">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="container mx-auto px-4">
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {filteredProducts.map((item, index) => (
                                        <div key={index} className="border p-4">
                                            <img
                                                onClick={() => navigate(`/productinfo/${item.id}`)}
                                                src={item.productImageUrl}
                                                alt={item.title}
                                                className="w-70 h-40 object-cover items-center"
                                            />
                                            <div className="mt-2">
                                                <h3 className="font-bold">{item.title}</h3>
                                                <p>₹{item.price}</p>
                                                <button
                                                    onClick={() => cartItems.some(p => p.id === item.id) ? deleteCart(item) : addCart(item)}
                                                    className={`mt-2 text-white p-2 rounded ${cartItems.some(p => p.id === item.id) ? 'bg-red-500' : 'bg-green-500'}`}
                                                >
                                                    {cartItems.some(p => p.id === item.id) ? 'Remove from Cart' : 'Add to Cart'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No products found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
