import React, { useState } from 'react'
import Logo from '../../component/Images/logo2x.png'
import LogoDark from '../../component/Images/logo-dark2x.png'
import { Link, useNavigate } from "react-router-dom";
import Head from '../../layout/Head';
import {
    Block,
    BlockHead,
    BlockContent,
    BlockDes,
    PreviewCard,
    BlockTitle,
    Icon,
    Button
} from '../../component/Component'
import { useForm } from "react-hook-form";
import { useFormik } from 'formik';
import { Spinner } from "reactstrap";

const Register = () => {
    const { formState: { errors } } = useForm();
    const [passState, setPassState] = useState(false);
    const [conPassState, setConPassState] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            nama: '',
            user_name: '',
            password: '',
            konfirmasi_password: '',
            kode_sekolah: '',
            nip: '',
            nuptk: '',
            notelp: '',
            alamat: '',
            email: '',
            tgl_lahir: '',
            tgl_mulaitugas: '',
            tempat_lahir: '',
            jenis_kelamin: '',
            roles_users: '',
            tenant_id: '',
        },
        onSubmit: (values) => {
            // Send a POST request to your FastAPI backend with form data
            fetch(`https://linksmart-1-t2560421.deta.app/register/`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(values).toString(),
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the backend (e.g., success message or error)
                    console.log(data);
                    if (data.message === 'Registration successful') {
                        // Redirect to the dashboard page
                        navigate('/dashboard');
                    }
                })
                .catch(error => {
                    // Handle errors, e.g., network errors
                    console.error(error);
                });
        },
    });
    return <>
        <Head title="Register" />
        <Block className="nk-block-middle nk-auth-body  wide-xs">
            <div className="brand-logo pb-4 text-center">
                <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                    <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                </Link>
            </div>
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                <BlockHead>
                    <BlockContent>
                        <BlockTitle tag="h4">Register</BlockTitle>
                        <BlockDes>
                            <p>Create New Dashlite Account</p>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
                <form onSubmit={formik.handleSubmit} className="is-alter">
                    <div className="form-group">
                        <label className="form-label" htmlFor="nama">
                            Nama
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                onChange={formik.handleChange}
                                value={formik.values.nama}
                                placeholder="Enter your nama"
                                className="form-control-lg form-control" />
                            {errors.nama && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                                Username
                            </label>
                        </div>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                bssize="lg"
                                id="user_name"
                                name="user_name"
                                onChange={formik.handleChange}
                                value={formik.values.user_name}
                                className="form-control-lg form-control"
                                placeholder="Enter your username" />
                            {errors.user_name && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
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
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder="Enter your passcode"
                                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                            {errors.password && <span className="invalid">{errors.password.message}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="password">
                                Konfirmasi Password
                            </label>
                        </div>
                        <div className="form-control-wrap">
                            <a
                                href="#conpassword"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setConPassState(!conPassState);
                                }}
                                className={`form-icon lg form-icon-right passcode-switch ${conPassState ? "is-hidden" : "is-shown"}`}
                            >
                                <Icon name="eye" className="passcode-icon icon-show"></Icon>
                                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                            </a>
                            <input
                                type={conPassState ? "text" : "password"}
                                id="konfirmasi_password"
                                name="konfirmasi_password"
                                onChange={formik.handleChange}
                                value={formik.values.konfirmasi_password}
                                placeholder="Enter your passcode"
                                className={`form-control-lg form-control ${conPassState ? "is-hidden" : "is-shown"}`} />
                            {errors.konfirmasi_password && <span className="invalid">{errors.konfirmasi_password.message}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="kode_sekolah">
                            Kode Sekolah
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="kode_sekolah"
                                name="kode_sekolah"
                                onChange={formik.handleChange}
                                value={formik.values.kode_sekolah}
                                placeholder="Enter your kode_sekolah"
                                className="form-control-lg form-control" />
                            {errors.kode_sekolah && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nip">
                            NIP
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="nip"
                                name="nip"
                                onChange={formik.handleChange}
                                value={formik.values.nip}
                                placeholder="Enter your nip"
                                className="form-control-lg form-control" />
                            {errors.nip && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nuptk">
                            NUPTK
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="nuptk"
                                name="nuptk"
                                onChange={formik.handleChange}
                                value={formik.values.nuptk}
                                placeholder="Enter your nuptk"
                                className="form-control-lg form-control" />
                            {errors.nuptk && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="notelp">
                            No. Telp
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="notelp"
                                name="notelp"
                                onChange={formik.handleChange}
                                value={formik.values.notelp}
                                placeholder="Enter your notelp"
                                className="form-control-lg form-control" />
                            {errors.notelp && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nik">
                            NIK
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="nik"
                                name="nik"
                                onChange={formik.handleChange}
                                value={formik.values.nik}
                                placeholder="Enter your nik"
                                className="form-control-lg form-control" />
                            {errors.nik && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="alamat">
                            Alamat
                        </label>
                        <div className="form-control-wrap">
                            <textarea
                                type="text"
                                id="alamat"
                                name="alamat"
                                onChange={formik.handleChange}
                                value={formik.values.alamat}
                                placeholder="Enter your alamat"
                                className="form-control-lg form-control" />
                            {errors.alamat && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder="Enter your email"
                                className="form-control-lg form-control" />
                            {errors.email && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="tgl_lahir">
                            Tanggal Lahir
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="tgl_lahir"
                                name="tgl_lahir"
                                onChange={formik.handleChange}
                                value={formik.values.tgl_lahir}
                                placeholder="Enter your tgl_lahir"
                                className="form-control-lg form-control" />
                            {errors.tgl_lahir && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="tgl_mulaitugas">
                            Tanggal Mulai Tugas
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="tgl_mulaitugas"
                                name="tgl_mulaitugas"
                                onChange={formik.handleChange}
                                value={formik.values.tgl_mulaitugas}
                                placeholder="Enter your tgl_mulaitugas"
                                className="form-control-lg form-control" />
                            {errors.tgl_mulaitugas && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="jenis_kelamin">
                            Jenis Kelamin
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                onChange={formik.handleChange}
                                value={formik.values.jenis_kelamin}
                                placeholder="Enter your jenis_kelamin"
                                className="form-control-lg form-control" />
                            {errors.jenis_kelamin && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="roles_users">
                            Roles
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="roles_users"
                                name="roles_users"
                                onChange={formik.handleChange}
                                value={formik.values.roles_users}
                                placeholder="Enter your roles_users"
                                className="form-control-lg form-control" />
                            {errors.roles_users && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="tenant_id">
                            Tenant ID
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="tenant_id"
                                name="tenant_id"
                                onChange={formik.handleChange}
                                value={formik.values.tenant_id}
                                placeholder="Enter your tenant_id"
                                className="form-control-lg form-control" />
                            {errors.tenant_id && <p className="invalid">This field is required</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <Button type="submit" color="primary" size="lg" className="btn-block">
                            {loading ? <Spinner size="sm" color="light" /> : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="form-note-s2 text-center pt-4">
                    {" "}
                    Already have an account?{" "}
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                        <strong>Sign in instead</strong>
                    </Link>
                </div>
            </PreviewCard>
        </Block>
    </>

}

export default Register
