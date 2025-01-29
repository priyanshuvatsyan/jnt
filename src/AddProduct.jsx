import React, { useState } from 'react';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import AdminNav from './AdminNav';
import './styles/AddProduct.css';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!image) {
        alert('Please select an image');
        return;
      }

      // Remove background using Remove.bg API
      const BGForm = new FormData();
      BGForm.append('image_file', image);
      BGForm.append('size', 'auto');

      const BGRemovedResponse = await axios.post('https://api.remove.bg/v1.0/removebg', BGForm, {
        headers: {
          'X-Api-Key': 'BobFsasTFcepTjaeYjodJYRX',
        },
        responseType: 'blob',
      });

      const bgRemovedImg = new File([BGRemovedResponse.data], 'bgRemovedImg.png', { type: 'image/png' });

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', bgRemovedImg);
      formData.append('upload_preset', 'priva_space');
      formData.append('cloud_name', 'dv6jvvcqc');

      const response = await axios.post('https://api.cloudinary.com/v1_1/dv6jvvcqc/image/upload', formData);
      const imageUrl = response.data.secure_url;

      const productData = {
        name,
        category,
        price: parseFloat(price),
        imageUrl,
      };

      await addDoc(collection(db, 'products'), productData);

      alert('Product added successfully!');

      // Reset form
      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
  
    <div className="container">
      <div className="title">JN Traders</div>
      <div className="addProductContainer">
        <div className="nav">
          <AdminNav />
        </div>
        <div className="form-container">
          {isLoading ? (
            <div className="loading-circle-container">
              <div className="loading-circle"></div>
            </div>
          ) : (
            <form className="product-form" onSubmit={handleSubmit}>
              <div className="product-form-left">
                <label htmlFor="">Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                
                
                  Category
                  <br />
                  <input
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
              
                  Price
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
               
                  Upload Image
                  <input type="file" onChange={handleImageChange} />
            

                <button type="submit" className="submit-btn">
                  Add Product
                </button>
              </div>
              <div className="product-form-right">
                <h2>Preview</h2>
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
              </div>

            </form>
          )}
        </div>
      </div>
      </div>
    
  );
}
