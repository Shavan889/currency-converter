import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [lenght, setLenght] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()`*/-=_+{}[]|"

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [lenght, charAllowed, numberAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
   toast.success("✅ Password copied!", {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  style: {
    background: "#111827",   // Tailwind gray-900
    color: "#10b981",        // Tailwind green-500
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px",
    padding: "12px 16px",
  }
  })

  },[password])

useEffect(()=>{
  passwordGenerator()
},[lenght, charAllowed, numberAllowed, setPassword])

  return (
    
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-2xl shadow-lg p-6 my-10">
      <h1 className="text-center text-2xl font-semibold text-white mb-6">
        🔐 Password Generator
      </h1>

      {/* Password Display */}
      <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-4 bg-gray-800 text-gray-100 font-mono text-sm"
          placeholder="Your password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPassword} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium transition">
          Copy
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4 text-gray-200 text-sm">
        {/* Length Slider */}
        <div className="flex items-center justify-between">
          <label className="font-medium">Length: {lenght}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={lenght}
            onChange={(e) => setLenght(e.target.value)}
            className="cursor-pointer accent-blue-500 w-2/3"
          />
        </div>

        {/* Number Option */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="w-4 h-4 accent-blue-500"
          />
          <label htmlFor="numberInput" className="cursor-pointer">
            Include Numbers
          </label>
        </div>

        {/* Character Option */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
            className="w-4 h-4 accent-blue-500"
          />
          <label htmlFor="characterInput" className="cursor-pointer">
            Include Symbols
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-6">
        <button
          onClick={passwordGenerator}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Generate Password
        </button>
      </div>
     <ToastContainer />
    </div>
  )
}

export default App
