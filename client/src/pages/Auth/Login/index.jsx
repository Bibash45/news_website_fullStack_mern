import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../features/authSlice.js";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [currentAccount, setCurrentAccount] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email: currentAccount.email,
          password: currentAccount.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);
      dispatch(setCredentials({ ...data }));
      setCurrentAccount({ email: "", password: "" });
      toast("Welcome to Admin Panel !!");
      navigate("/admin");
    } catch (error) {
      console.log(error?.response?.data?.message);

      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );

      if (statusCode === 400) {
        setValidationErrors(errorMessage);
        console.log("error: ", error.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    setCurrentAccount((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setValidationErrors(""); // Clears validation errors when typing
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <ToastContainer />
      <div className="max-w-lg w-full p-10 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            className="w-[50px] h-[50px] rounded-full object-contain"
            src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/456430359_484335661016328_3546235393355045369_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vjdPWoj0f44Q7kNvgElBfRU&_nc_oc=Adgbh63HEG9O_TzwvCezhUoLUskF9E5OD4edMQAm4GWcD5pq4QQkoUpBLSsalQG83kU_hjRyMlsqY1Wsn4nhiz0F&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AA7yXxjHt35j6e08pU1M9tr&oh=00_AYCUoVwCD_LlTc_ISEBoKB8Qw47U9DFFilGis-eGiAGkgg&oe=67A97661"
            alt="Admin"
          />
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Log in to Admin account
          </h2>
        </div>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                id="email-address"
                name="email"
                autoComplete="email"
                required
                placeholder="Email Address"
                className="text-gray-900 border border-gray-800 rounded block w-full p-3 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
                value={currentAccount.email}
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                className="text-gray-900 border border-gray-800 rounded block w-full p-3 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
                value={currentAccount.password}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>
          </div>

          {validationErrors && (
            <div className="text-red-600 mt-4 text-sm">
              {typeof validationErrors === "object" ? (
                Object.keys(validationErrors).map((key) => (
                  <p key={key} className="mb-2">
                    {validationErrors[key]}
                  </p>
                ))
              ) : (
                <p>{validationErrors}</p>
              )}
            </div>
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-md font-bold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
