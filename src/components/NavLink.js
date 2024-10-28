import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-indigo-400 text-gray-200 focus:border-white'
                : 'border-transparent text-white hover:text-gray-200 hover:border-gray-300'
        }`}>
        {children}
    </Link>
)

export default NavLink
