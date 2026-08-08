import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "", id:"" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        const getPasswords = async () => {
            let req = await fetch("http://localhost:3000/")
            let passwords = await req.json()

            setpasswordArray(passwords)
        }

        getPasswords()
    }, [])
    const showPassword = () => {
        alert("show the password")
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "/icons/eye-cross.svg";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "/icons/eye.svg";
        }
    }
    const savePassword = async () => {

        if (form.id) {

            
            let req = await fetch(`http://localhost:3000/${form.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            let result = await req.json()

            console.log(result)

            setpasswordArray(
                passwordArray.map(item =>
                    item.id === form.id ? form : item
                )
            )

            toast('Password updated!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            })

        } else {

            
            const passwordWithId = {
                ...form,
                id: uuidv4()
            }

            let req = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(passwordWithId)
            })

            let result = await req.json()

            console.log(result)

            setpasswordArray([...passwordArray, passwordWithId])

            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            })
        }

        
        setform({
            site: "",
            username: "",
            password: "",
            id: ""
        })
    }
    const deletePassword = async (id) => {

        let c = confirm("Do you really want to delete this password?")

        if (c) {

            let req = await fetch(`http://localhost:3000/${id}`, {
                method: "DELETE"
            })

            let result = await req.json()

            console.log(result)

            setpasswordArray(
                passwordArray.filter(item => item.id !== id)
            )

            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }
    const editPassword = (id) => {
        console.log("Editing Password with id", id)

        const passwordToEdit = passwordArray.find(item => item.id === id)

        setform(passwordToEdit)
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                draggable
                theme="light"
                transition={Bounce}
            />

            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
                <div className="mycontainer">
                    <h1 className='text-4xl text font-bold text-center'>
                        <span className='text-green-700'>/ &lt;</span>
                        Pass
                        <span className='text-green-700'>OP/ &gt;</span>
                    </h1>
                    <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                    <div className='flex flex-col p-4 text-black gap-8 items-center'>
                        <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                            <div className="relative w-full">
                                <input
                                    ref={passwordRef}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="rounded-full border border-green-500 w-full p-4 py-1 pr-10"
                                    type="password"
                                    name="password"
                                />

                                <span
                                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={showPassword}
                                >
                                    <img
                                        ref={ref}
                                        src="/icons/eye.svg"
                                        alt="eye"
                                        className="w-6 h-6"
                                    />
                                </span>
                            </div>
                        </div>
                        <button onClick={savePassword} className='flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full
                    px-8 py-2 w-fit gap-2'>
                            <lord-icon
                                src="https://cdn.lordicon.com/fqbvgezn.json"
                                trigger="hover">
                            </lord-icon>
                            Add Password</button>
                    </div>
                    <div className="passwords">
                        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No Passwords to Show</div>}

                        {passwordArray.length != 0 &&
                            <div className="overflow-x-auto">
                                <table className='table-fixed w-full rounded-md overflow-hidden mb-10'>
                                    <thead className=' bg-green-800 text-white'>
                                        <tr>
                                            <th className='py-2 w-1/4'>Site</th>
                                            <th className='py-2 w-1/4'>Username</th>
                                            <th className='py-2 w-1/4'>Password</th>
                                            <th className='py-2 w-1/4'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {passwordArray.map((item, index) => {


                                            return <tr key={index}>
                                                <td className='py-2 text-center w-32'><a href={item.site} target='_blank'>{item.site} </a></td>
                                                <td className='py-2 text-center w-32'>{item.username}</td>
                                                <td className='py-2 text-center w-32'>{item.password}</td>
                                                <td className='justify-center py-2 text-center'>
                                                    <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}><lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon></span>
                                                    <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}><lord-icon
                                                        src="https://cdn.lordicon.com/jzinekkv.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon></span>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
