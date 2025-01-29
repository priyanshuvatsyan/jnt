import React, { useState } from 'react'
import { storage } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default function AdminPannel() {

    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const storage = getStorage();
    const firestore = getFirestore();

    const handleImage = async (e) => {
        e.preventDefault();

        if (!productImage) {
            alert('Please select an image');
            return;
        }
        setLoading(true);

        try {
            const storageRef = ref(storage, `products/${productImage.name}`);
            await uploadBytes(storageRef, productImage);
            const imageUrl = await getDownloadURL(storageRef);

            await addDoc(collection(firestore, 'products'), {
                name: productName,
                category: productCategory,
                price: productPrice,
                imageUrl,
            });
            alert('Product uploaded successfully');

        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Failed to upload product. Please try again.");
        }
        finally {
            setLoading(false);
            setProductImage(null);
            setProductPrice("");
            setProductName("");
            setProductCategory("");
        }
    };

    return (
        <div>
            <h1>Upload Product</h1>
            <form onSubmit={handleImage} >

                <div>
                    <label htmlFor="">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Price:</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        required
                    />
                </div>
                <div>
                    <label>Product Category:</label>
                    <input
                        type="text"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        required
                    />
                </div>


                <button type='submit' disabled={loading} >
                    {loading ? "Uploading..." : "Upload Product"}

                </button>


            </form>

        </div>
    )
}
