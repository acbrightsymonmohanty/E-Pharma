import React, { useEffect, useState } from 'react';
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import * as sgMail from '@sendgrid/mail';

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('508414E5751169B4C14392830DF071450C14AFCC8620523FBD9FA00B62FF5692C9F0E063E358F7C8CC2738C0096FAEB9');


const PrescriptionDetail = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [confirmationResponse, setConfirmationResponse] = useState(null);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireDB, 'prescriptions'));
                const fetchedPrescriptions = [];
                querySnapshot.forEach((doc) => {
                    fetchedPrescriptions.push({ id: doc.id, ...doc.data() });
                });
                setPrescriptions(fetchedPrescriptions);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(fireDB, 'prescriptions', id));
            setPrescriptions(prevPrescriptions => prevPrescriptions.filter(prescription => prescription.id !== id));
            console.log('Prescription deleted successfully');
        } catch (error) {
            console.error('Error deleting prescription:', error);
        }
    };

    const handleConfirm = async (id, email) => {
        try {
            // Update prescription status
            await updateDoc(doc(fireDB, 'prescriptions', id), { status: 'confirmed' });

            // Send confirmation email
            const msg = {
                to: email,
                from: 'acbrightsymonm@gmail.com', // Your verified sender
                subject: 'Prescription Confirmation',
                text: 'Your prescription has been confirmed.',
            };
            await sgMail.send(msg);

            setConfirmationResponse('Confirmation email sent successfully.');
            console.log('Prescription confirmed successfully and email sent.');
        } catch (error) {
            console.error('Error confirming prescription and sending email:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">All Prescriptions</h1>
            <p><b className='text-pink-500 font-bold font'>Total Prescriptions: {prescriptions.length}</b></p>
            {confirmationResponse && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> {confirmationResponse}</span>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b border-gray-200">Name</th>
                            <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b border-gray-200">Email</th>
                            <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b border-gray-200">Phone</th>
                            <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b border-gray-200">Address</th>
                            <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b border-gray-200">Prescription</th>
                            <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b border-gray-200">Status</th>
                            <th className="px-6 py-3 bg-gray-100 text-left font-semibold text-sm uppercase border-b border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.map((prescription, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{prescription.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{prescription.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{prescription.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{prescription.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <img src={prescription.prescriptionUrl} alt="Prescription" className="cursor-pointer max-w-20 h-auto" onClick={() => window.open(prescription.prescriptionUrl)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <button onClick={() => handleConfirm(prescription.id, prescription.email)} className="text-green-500 cursor-pointer">Confirm</button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <button onClick={() => handleDelete(prescription.id)} className="ml-2 text-red-500 cursor-pointer">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PrescriptionDetail;
