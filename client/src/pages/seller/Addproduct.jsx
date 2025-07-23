import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';



const Addproduct = () => {
  const {axios}=useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(prev => {
    const newImages = [...prev.images];
    newImages[index] = file; // Store the actual file

    return {
      ...prev,
      images: newImages,
      imagePreviews: {
        ...(prev.imagePreviews || {}),
        [index]: URL.createObjectURL(file) // Just for UI
      }
    };
  });
  };

  const handleSubmit =async  (e) => {
    try {
      e.preventDefault();

      const { images, ...productData } = formData;
      productData.description=productData.description.split('\n');
      const form = new FormData();
      form.append('productData', JSON.stringify(productData));

      images.forEach((img) => {
       form.append('images', img);
      });

       const {data}=await axios.post('/api/product/add', form);
        
       if(data.success){
        toast.success('product added successfully')
        setFormData({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
    images: []
  })
       }else{
        toast.error(data.message)
       }
    } catch (error) {
       toast.error(error.message)
    }
  };

  return (
    <div className="no-scrollbar py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => handleImageUpload(e, index)}
                />
                <img
                  className="max-w-24 cursor-pointer rounded border"
                  src={(formData.imagePreviews && formData.imagePreviews[index])|| assets.upload_area}
                  alt="uploadArea"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-base font-medium">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-base font-medium">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="outline-none py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            required
          ></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-base font-medium">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.path}>{cat.path}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="price" className="text-base font-medium">Product Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="offerPrice" className="text-base font-medium">Offer Price</label>
            <input
              id="offerPrice"
              name="offerPrice"
              type="number"
              value={formData.offerPrice}
              onChange={handleInputChange}
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-primary text-white font-medium rounded hover:bg-primary/50 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
