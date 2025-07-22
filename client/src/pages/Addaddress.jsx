import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const InputField = ({ type, placeholder, name, handlechange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handlechange}
    name={name}
    value={address[name]}
    required
    className="w-full px-2 py-2.5 border border-gray-300 rounded outline-none text-gray-700 focus:border-primary transition"
  />
);

const Addaddress = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phone: '',
  });

  const { navigate,axios,user} = useAppContext();

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler =async(e) => {
    e.preventDefault();
    try {
      const {data}= await axios.post('/api/address/add',{formData})

      if(data.success){
           toast.success(data.message);
           navigate('/cart');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
    
  };


  useEffect(()=>{
     if(!user){
      navigate('/cart')
     }
  },[])

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-600">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col md:flex-row justify-between mt-10">
        <img
          className="md:mr-16 mb-16 md:mt-1 max-w-sm"
          src={assets.add_address_iamge}
          alt="add address"
        />

        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField type="text" name="firstName" handlechange={handlechange} address={formData} placeholder="First Name" />
              <InputField type="text" name="lastName" handlechange={handlechange} address={formData} placeholder="Last Name" />
            </div>
            <InputField type="email" name="email" handlechange={handlechange} address={formData} placeholder="Email" />
            <InputField type="text" name="street" handlechange={handlechange} address={formData} placeholder="Street" />
            <div className="grid grid-cols-2 gap-4">
              <InputField type="text" name="city" handlechange={handlechange} address={formData} placeholder="City" />
              <InputField type="text" name="state" handlechange={handlechange} address={formData} placeholder="State" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField type="text" name="country" handlechange={handlechange} address={formData} placeholder="Country" />
              <InputField type="number" name="zipcode" handlechange={handlechange} address={formData} placeholder="Zip Code" />
            </div>
            <InputField type="number" name="phone" handlechange={handlechange} address={formData} placeholder="Phone" />
            <button
              type="submit"
              className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary/90 transition cursor-pointer"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addaddress;
