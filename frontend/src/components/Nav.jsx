import { NavLink } from 'react-router-dom';

//assets
import pokemonLogo from '../assets/pokemonLogo.png';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

function Nav() {
	return (
		<div>
			<nav className="bg-white border-gray-200 dark:bg-gray-900 ">
				<div className="w-full flex flex-wrap items-center justify-between p-4">
					<div className="flex items-center gap-10 ms-16">
						<NavLink to={'/'}>
							<img src={pokemonLogo} alt="" className="w-40" />
						</NavLink>
						<div>
							<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
								<li>
									<NavLink
										to={'/'}
										className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
										aria-current="page"
									>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'/pokemon'}
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										All Pokemon
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'/arena'}
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Go to Arena
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
					<div className="flex me-20">
						<div className="me-5">
							<Flowbite>
								<DarkThemeToggle />
							</Flowbite>
						</div>
						<button
							type="button"
							data-collapse-toggle="navbar-search"
							aria-controls="navbar-search"
							aria-expanded="false"
							className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
						>
							<span className="sr-only">Search</span>
						</button>
						<div className="relative hidden md:block">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
								<span className="sr-only">Search icon</span>
							</div>

							<input
								type="text"
								id="search-navbar"
								className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search for a Pokemon"
							/>
						</div>
						<button
							data-collapse-toggle="navbar-search"
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-search"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
						</button>
						<div
							className="items-center justify-between hidden w-full md:flex md:w-auto"
							id="navbar-search"
						>
							<div className="relative mt-3 md:hidden">
								<input
									type="text"
									id="search-navbar"
									className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Search..."
								/>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Nav;
