import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { CartContext } from '../../context/cart.contex';
import { ShoppingCartSimple, UserCircle } from 'phosphor-react';
import './Navbar.css';
import logo from '/assets/logo.png';

function Navbar() {
	const { user, loading, logout } = useContext(AuthContext);
	const { cartTotalQuantity } = useContext(CartContext);
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleDiscoverServices = () => {
		// Clear the category state, navigate and refresh
		navigate('/main', { state: { category: '' } });
		navigate(0);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
	};

	return (
		<nav className='bg-black w-full'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						{/* <!-- Mobile menu button--> */}
						<button
							type='button'
							onClick={toggleMobileMenu} // Toggle the menu on click
							className='relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded={isMobileMenuOpen}>
							<span className='absolute -inset-0.5'></span>
							<span className='sr-only'>Open main menu</span>
							{/* <!--
							Icon when menu is closed.

							Menu open: "hidden", Menu closed: "block"
							--> */}
							<svg
								className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
								/>
							</svg>
							{/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
							<svg
								className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex flex-shrink-0 items-center'>
							<img
								className='nav-title h-6 w-auto'
								src={logo}
								alt='oMERCADO'
							/>
						</div>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								{/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

								<Link to='/'>
									<button className='rounded-full px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
										Homepage
									</button>
								</Link>

								<button
									onClick={handleDiscoverServices}
									className='rounded-full px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
									Browse all
								</button>

								{!loading && user && user.typeOfUser.includes('Seller') && (
									<>
										<Link to='/add-service'>
											<button className='rounded-full px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
												Add service
											</button>
										</Link>
									</>
								)}

								{!loading && !user && (
									<>
										<Link to='/signup'>
											<button className='rounded-full px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
												Sign up
											</button>
										</Link>
										<Link to='/login'>
											<button className='rounded-full px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
												Log in
											</button>
										</Link>
									</>
								)}

								{!loading && user && (
									<button
										className='rounded-full px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'
										onClick={logout}>
										Log out
									</button>
								)}
							</div>
						</div>
					</div>
					<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
						<div className='cart'>
							<p className='cart-quantity'>{cartTotalQuantity}</p>

							<Link to='/cart'>
								<ShoppingCartSimple
									size={28}
									color='#ffffff'
								/>
							</Link>
						</div>

						<div className='userName-icon'>
							<p className='userName'>{user ? `${user.name}` : ''}</p>

							{!loading && user && (
								<>
									<Link to='/user-profile'>
										<UserCircle
											size={32}
											color='#ffffff'
										/>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Mobile menu, show/hide based on menu state. --> */}
			<div
				className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
				id='mobile-menu'>
				<div className='flex flex-col items-start space-y-1 px-2 pb-3 pt-2'>
					{/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

					<Link to='/'>
						<button className='rounded-full px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
							Homepage
						</button>
					</Link>

					<button
						onClick={handleDiscoverServices}
						className='rounded-md bg-black px-3 py-2 text-md font-medium text-white'
						aria-current='page'>
						Browse all
					</button>

					{!loading && user && user.typeOfUser.includes('Seller') && (
						<>
							<Link to='/add-service'>
								<button className='rounded-md px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
									Add service
								</button>
							</Link>
						</>
					)}

					{!loading && !user && (
						<>
							<Link to='/signup'>
								<button className='rounded-md px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
									Sign up
								</button>
							</Link>
							<Link to='/login'>
								<button className='rounded-md px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'>
									Log in
								</button>
							</Link>
						</>
					)}

					{!loading && user && (
						<button
							className='rounded-md px-3 py-2 text-md font-medium hover:bg-gray-700 hover:text-white'
							onClick={logout}>
							Log out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
