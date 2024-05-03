import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { fireDB } from "../../firebase/FirebaseConfig";
import 'react-toastify/dist/ReactToastify.css';

const Prescription = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        pincode: "",
        prescriptionFile: null
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        setData({ ...data, prescriptionFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.name || !data.email || !data.phone || !data.address || !data.pincode || !data.prescriptionFile) {
            toast.error("All fields are required.");
            return;
        }
        
        setLoading(true);
        const storage = getStorage();
        const storageRef = ref(storage, `prescriptions/${data.prescriptionFile.name}`);

        try {
            const fileSnapshot = await uploadBytes(storageRef, data.prescriptionFile);
            const fileUrl = await getDownloadURL(fileSnapshot.ref);
            const { prescriptionFile, ...uploadData } = data;
            const productRef = collection(fireDB, 'prescriptions');
            await addDoc(productRef, { ...uploadData, prescriptionUrl: fileUrl });
            toast.success("Prescription added successfully. Please wait, a doctor will contact you within 24 hours.");
            setData({
                name: "",
                email: "",
                phone: "",
                address: "",
                pincode: "",
                prescriptionFile: null
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to add prescription.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-10 bg-blue-gray-500">
            <h1 className="text-2xl font-semibold text-center mb-6 text-white">Upload Prescription</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="input-label">Name:</label>
                        <input type="text" id="name" name="name" value={data.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="input-label">Email:</label>
                        <input type="email" id="email" name="email" value={data.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="input-label">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={data.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="input-label">Address:</label>
                        <textarea id="address" name="address" value={data.address} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pincode" className="input-label">Pincode:</label>
                        <input type="text" id="pincode" name="pincode" value={data.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="prescription" className="input-label">Prescription:</label>
                        <input type="file" id="prescription" name="prescription" accept=".png, .jpg, .jpeg" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-300 transition duration-300">
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Prescription;
