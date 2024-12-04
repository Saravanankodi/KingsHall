import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backbtn from '../assets/img/Previous page.png';
import loginbtn from '../assets/img/Next page.png';
import vectorimg from '../assets/img/Name.png';
import '../css/pages/login.css';
import MainHeader from '../components/MainHeader';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handelLogin = async (e) => {
        e.preventDefault(); 

        if (name === 'Principal' && password === 'Kingshall') {
            navigate('/login/admin');
        } else if (name === 'Chera' && password === 'Cherahall') {
            navigate('/login/admin/chera');
        } else if (name === 'Pallava' && password === 'Pallavahall') {
            navigate('/login/admin/pallava');
        } else if (name === 'Av' && password === 'Avhall'){
            navigate('/login/admin/av');
        }else
        {
            alert('Enter valid username and password')
        }
    };

    return (
        <>
            <section className="login-page">
                <MainHeader />
                <p className="welcome-text">
                    Welcome Admin
                </p>
                <main className="login-container">
                    <div className="left">
                        <img src={vectorimg} alt="" className="vector-img" />
                    </div>
                    <div className="right">
                        <form onSubmit={handelLogin} className="login-form">
                            <div className="input-container">
                                <label htmlFor="" className="text">
                                    Enter your ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your ID"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-box"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="" className="text">
                                    Enter your Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-box"
                                    required
                                />
                            </div>
                            <div className="btns">
                                <a href="/" className="back-btn btn">
                                    <img src={backbtn} alt="" className="btn-icon" />
                                    Back
                                </a>
                                <button type="submit" className="login-btn btn" onClick={handelLogin}>
                                    Login
                                    <img src={loginbtn} alt="" className="btn-icon" />
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </section>
        </>
    );
}

export default Login;
