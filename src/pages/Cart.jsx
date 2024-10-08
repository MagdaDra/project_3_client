import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart.contex';
import ServicesAPIService from '../services/services.api';
import { Trash } from 'phosphor-react';

const servicesService = new ServicesAPIService();

const Cart = () => {
	const { services, totalCartSum, setTotalCartSum, addToCart, removeFromCart } =
		useContext(CartContext);
	const [servicesFromAPI, setServicesFromAPI] = useState([]);

	// Getting details of the services stored in the 'services' from cart context as they are only stored as _id and quantity. (To get Img, Name, etc)
	const getServicesFromAPI = async () => {
		try {
			const response = await servicesService.getCartInfo(services);
			console.log('Response:', response);

			setServicesFromAPI(response.data);
		} catch (error) {
			console.error('Error fetching services from API in Cart', error);
		}
	};

	useEffect(() => {
		if (services.length > 0) {
			getServicesFromAPI();
		}
	}, [services]);

	useEffect(() => {
		const calculateTotal = () => {
			const totalAmount = servicesFromAPI.reduce((acc, item) => {
				const serviceInCart = services.find(
					(service) => service._id === item._id,
				);
				if (serviceInCart) {
					return acc + item.price * serviceInCart.quantity;
				}
			}, 0);
			setTotalCartSum(totalAmount);
			localStorage.setItem('Cart_Total', JSON.stringify(totalAmount));
		};

		calculateTotal();
	}, [servicesFromAPI, services, setTotalCartSum]);

	return (
		<div>
			{services.length === 0 && (
				<h3 className='text-center pt-10'>No items in the cart</h3>
			)}

			{services.length > 0 && (
				<div className=' bg-white text-gray-900 rounded-3xl md:w-3/4 m-auto mt-14 shadow-lg shadow-gray-200'>
					{servicesFromAPI.map((item) => {
						const serviceInCart = services.find(
							(service) => service._id === item._id,
						);

						if (!serviceInCart) return null;

						return (
							<div
								className='flex flex-col items-center md:flex md:flex-row md:justify-between md:ml-10 md:mr-10 md:pt-5 md:overflow-hidden'
								key={item._id}>
								<div
									className='mt-8 w-20 h-20'
									style={{
										backgroundImage: `url(${item.img})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}></div>
								<p className='mt-2 md:w-1/4'>{item.serviceName}</p>
								<p className='mt-2 md:w-1/5'>Unit price: {item.price} €</p>

								<div className='mt-2 flex justify-between w-20'>
									<button
										onClick={() =>
											addToCart({ _id: item._id, quantity: -1 }, item.quantity)
										}>
										-
									</button>
									<p>{serviceInCart.quantity}</p>
									<button
										onClick={() =>
											addToCart({ _id: item._id, quantity: 1 }, item.quantity)
										}>
										+
									</button>
								</div>

								<div onClick={() => removeFromCart({ _id: item._id })} className='mt-2'>
									<Trash size={20} />
								</div>

								<p className='mt-2'>Total: {item.price * serviceInCart.quantity} €</p>
								
							</div>
						);
					})}

					<div className='flex justify-end border-t-2 mt-10 mr-10 ml-10 pt-5 mb-10'>
						Total: {totalCartSum} €
					</div>
					<div className='flex justify-end items-center mr-10 pb-10'>
						<Link to={'/main'}>
							<button className='text-black text-sm font-semibold items-center rounded-full justify-center p-2 md:w-48 bg-[#F5F581] hover:bg-[#8d8d4a] mt-2'>
								Continue shopping
							</button>
						</Link>
						<Link to={'/checkout'}>
							<button className='text-white text-sm font-semibold items-center rounded-full justify-center p-2 w-24 border bg-black hover:bg-[#9a9a9a] mt-2 ml-5'>
								Checkout
							</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
