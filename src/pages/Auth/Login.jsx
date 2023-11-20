import React, { useState } from 'react'
import Head from '../../layout/Head'
import Logo from '../../component/Images/logo2x.png'
import LogoDark from '../../component/Images/logo-dark2x.png'
import { Block, BlockHead, BlockContent, BlockTitle, BlockDes, PreviewCard, Icon, Button } from '../../component/Component'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passState, setPassState] = useState(false);
    // const [errorVal, setError] = useState("");
    const [error, setError] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `https://linksmart-1-t2560421.deta.app/login/users?username=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                const token = responseData
                localStorage.setItem('jwtToken', token);
                // const token = responseData.token;
                // const user = responseData.user;

                // localStorage.setItem('jwtToken', token);
                // localStorage.setItem('user_id', user.user_id);

                // console.log(localStorage.getItem('jwtToken'));
                // console.log(user); // Tampilkan data pengguna

                navigate('/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const { formState: { errors } } = useForm();
    return <>

        <Head title="Login" />
        <Block className="nk-block-middle nk-auth-body  wide-xs">
            <div className="brand-logo pb-4 text-center">
                <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                </Link>
            </div>
        

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
                <BlockContent>
                    <BlockTitle tag="h4">Sign-In</BlockTitle>
                    <BlockDes>
                        <p>Access Dashlite using your email and passcode.</p>
                    </BlockDes>
                </BlockContent>
            </BlockHead>
            {error && (
                <div className="mb-3">
                    <Alert color="danger" className="alert-icon">
                        <Icon name="alert-circle" /> Unable to login with credentials{" "}
                    </Alert>
                </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                            Username
                        </label>
                    </div>
                    <div className="form-control-wrap">
                        <input
                            type="username"
                            name="username"
                            id="username"
                            placeholder="UserName"
                            className="form-control-lg form-control"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                        {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="password">
                            Passcode
                        </label>
                        <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                            Forgot Code?
                        </Link>
                    </div>
                    <div className="form-control-wrap">
                        <a
                            href="#password"
                            onClick={(ev) => {
                                ev.preventDefault();
                                setPassState(!passState);
                            }}
                            className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                        >
                            <Icon name="eye" className="passcode-icon icon-show"></Icon>

                            <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                        </a>
                        <input
                            type={passState ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                        {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <Button size="lg" className="btn-block" type="submit" color="primary">
                        {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                    </Button>
                </div>
            </Form>
            <div className="form-note-s2 text-center pt-4">
            New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
          </div>
          <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>OR</span>
            </h6>
          </div>
          <ul className="nav justify-center gx-4">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Facebook
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Google
              </a>
            </li>
          </ul>
        </PreviewCard>
        </Block>
      {/* <AuthFooter /> */}

    </>

}

export default Login
