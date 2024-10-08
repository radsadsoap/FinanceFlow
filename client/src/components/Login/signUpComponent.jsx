import { IoMdArrowRoundForward } from "react-icons/io";
import React, { useState } from "react";
import { register } from "../../utils/api";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function SignUpComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const result = await register({ name, email, password });
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate("/login");
        } catch (error) {
            setError("Signup failed. Please try again.");
        }
    };
    return (
        <>
            <div className="bg-white rounded-3xl px-8 py-4">
                <h1 className="text-6xl text-center">Create Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 pt-4">
                        <input
                            type="text"
                            name="name"
                            className="border border-zinc-300 rounded-full p-3 px-5"
                            placeholder="User Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            className="border border-zinc-300 rounded-full p-3 px-5"
                            placeholder="Phone / Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex items-center justify-between border p-3 border-zinc-300 rounded-full bg-white px-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="outline-none"
                                placeholder="Passcode"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                htmlFor="showPassword"
                                className="text-gray-500 cursor-pointer"
                            >
                                {showPassword ? (
                                    <TbEye size={25} />
                                ) : (
                                    <TbEyeClosed size={25} />
                                )}
                                <input
                                    id="showPassword"
                                    type="checkbox"
                                    className="hidden"
                                    checked={showPassword}
                                    onChange={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="border border-zinc-300 rounded-full px-5 p-3 bg-black text-white flex items-center justify-between"
                        >
                            Create Account
                            <IoMdArrowRoundForward size="25px" />
                        </button>
                    </div>

                    <div className="flex justify-center pt-4">
                        {error && (
                            <span className="text-red-500 text-sm">
                                {error}
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
