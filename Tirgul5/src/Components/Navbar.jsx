import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { LuSun, LuMoon } from "react-icons/lu";
export default function Navbar(props) {
      const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Contact', path: '/contact' },
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' },
      ]
    return (
         <header className="fixed w-full top-0 py-1 px-2 drop-shadow-md bg-white dark:bg-zinc-900 transition-colors duration-300">
            <div className="flex items-left justify-between">
                

                <ul className="hidden md:flex items-center gap-12 font-semibold text-base">
                    <a href="#"><img src={logo} alt="Logo" className="w-20 hover:scale-120  transition-all"></img></a>
                    {menuItems.map((item) => (
                        <Link to={item.path}>
                            <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer ">
                                {item.label}
                            </li>
                        </Link>
                    ))}
                </ul>

                <button onClick={props.onClick} className='bg-zinc-100 dark:bg-zinc-700 p-3 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg text-yellow-400 transition-all duration-300 transform hover:scale-110'>
                    {props.theme==='' && <LuSun size={24} />}
                    {props.theme==='dark' && <LuMoon size={24} />}
                </button>
            </div>
        </header>
    );
}
