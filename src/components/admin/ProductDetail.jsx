import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");

    const totalPages = Math.ceil(getAllProduct.length / itemsPerPage);
    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully');
            getAllProductFunction();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error('Failed to delete product');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredProducts = getAllProduct.filter(product => {
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesCompany = !selectedCompany || product.company === selectedCompany;
        return matchesCategory && matchesCompany;
    });

    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-5 flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-xl text-pink-300 font-bold mb-4 sm:mb-0">All Products</h1>
                <div className="flex space-x-4 mb-4 sm:mb-0">
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            <option value="">All Categories</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Elderly Care">Elderly Care</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Food and Drinks">Food and Drinks</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Ayurvedic Care">Ayurvedic Care</option>
                            <option value="Home Care">Home Care</option>
                            <option value="Sexual Wellness">Sexual Wellness</option>
                        </select>
                    </div>
                </div>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">Add Product</button>
                </Link>
            </div>

            {loading && <div className="flex justify-center mt-4"><Loader /></div>}

            <div className="overflow-x-auto mb-5">
                <table className="w-full text-left border-collapse sm:border-separate border border-pink-100 text-white">
                    <thead className="bg-pink-200">
                        <tr>
                            <th className="px-4 py-3 sm:px-6">No.</th>
                            <th className="px-4 py-3 sm:px-6">Image</th>
                            <th className="px-4 py-3 sm:px-6">Title</th>
                            <th className="px-4 py-3 sm:px-6">Price</th>
                            <th className="px-4 py-3 sm:px-6">Category</th>
                            <th className="px-4 py-3 sm:px-6">Date</th>
                            <th className="px-4 py-3 sm:px-6">Status</th>
                            <th className="px-4 py-3 sm:px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item;
                            return (
                                <tr key={id} className="text-pink-300">
                                    <td className="px-4 py-2 sm:px-6">{indexOfFirstItem + index + 1}.</td>
                                    <td className="px-4 py-2 sm:px-6">
                                        <div className="flex justify-center">
                                            <img className="w-16 sm:w-20" src={productImageUrl} alt="Product" />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 sm:px-6">{title}</td>
                                    <td className="px-4 py-2 sm:px-6">₹{price}</td>
                                    <td className="px-4 py-2 sm:px-6">{category}</td>
                                    <td className="px-4 py-2 sm:px-6">{date}</td>
                                    <td className="px-4 py-2 sm:px-6 text-green-500 cursor-pointer" onClick={() => navigate(`/updateproduct/${id}`)}>Edit</td>
                                    <td className="px-4 py-2 sm:px-6 text-red-500 cursor-pointer" onClick={() => deleteProduct(id)}>Delete</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center space-x-4 my-4">
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
            </div>
        </div>
    );
};

export default ProductDetail;
