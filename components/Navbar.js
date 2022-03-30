import Link from "next/link";
import Image from "next/image";
import logo from '../public/disneyhotstar.svg'

const Navbar = ({account}) => {
    return ( 
        <div className="navbar">
            <div className="logo-wrapper">
            <Link href="/"><Image src={logo} alt="Disney Logo" width={90} height={50}></Image></Link>
            </div>
            <div className="account-info">
                <p>{account.username}</p>
                <img src={account.avatar.url} className="avatar"/>
            </div>
        </div>
     );
}
 
export default Navbar;