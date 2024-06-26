import { useState, useCallback, useEffect, useRef } from 'react'
function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

// useref hook
const passwordRef = useRef(null)


// generate password
  const passwordGenerator = useCallback(() => {
    let paas = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "1234567890"
    if (character) str += "@#$%^&*{(})?></|+=-"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      paas += str.charAt(char)
    }
    setPassword(paas)
  }, [length, number, character, setPassword])


  // copy paasword
  const copyPassword = useCallback(()=> {
    alert("Copied to Clipboard")
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => { passwordGenerator() },
    [length, number, character, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className=" text-center text-white my-3">Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} placeholder='password' className='outline-none w-full py-1 px-3' readOnly ref={passwordRef} />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={number} id='number-input' onChange={() => {
              setNumber((prev => !prev))
            }} />
            <label htmlFor="number-input">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev)
              }}
            />
          </div>
          <label htmlFor="char-input">Character</label>
        </div>
      </div>
    </>
  )
}

export default App
