import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import PasswordBox from './PasswordBox';
import toast from "react-hot-toast";

const Body = () => {
  const [showpass, setshowpass] = useState(false)
  const [passtype, setpasstype] = useState('password')
  const handlepassclick = () => {
    setshowpass(prev => !prev)
    if (passtype === 'password') setpasstype('text')
    else setpasstype('password')
  }

  const [err, seterr] = useState(false)
  const handleerr = () => {
    seterr(true)
    setTimeout(() => {
      seterr(false)
    }, [2000])
  }

  const [pasarr, setpassarr] = useState([])

  const getpassfrombackend = async () => {
    //get item from backend
    const res = await fetch('http://localhost:3000/', { method: "GET" }) //response
    const array = await res.json() //Take JSON text from the response and convert it into JavaScript objects
    console.log(array)
  
    setpassarr(array)
    

  }
  useEffect(() => {
    getpassfrombackend()
  }, [])


  const deletefrombackend = async (obj) => {
    console.log(obj.id)
    const response = await fetch('http://localhost:3000/',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Task": "delete"
        },
        body: JSON.stringify(obj)
      })

    console.log(response)
  }
  const updateinsertinbackend = async (obj) => {
    const response = await fetch('http://localhost:3000/',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Task": "insert"
        },
        body: JSON.stringify(obj)
      })

      seturl('')
      setuser('')
      setpass('')
      
    console.log(response)


  }



  const [url, seturl] = useState('')
  const [user, setuser] = useState('')
  const [pass, setpass] = useState('')

  const handleSave = async () => {
    if (url === '' || user === '' || pass === '') {
      handleerr()
      return
    }
    let newobj = { id: crypto.randomUUID(), url: url, username: user, password: pass };
    setpassarr([...pasarr, newobj])

    updateinsertinbackend(newobj) //update in backend

    toast.success("Password saved successfully");

    
  }

  return (
    <div className='h-[90vh] bg-green-100 flex flex-col items-center'>

      <div className='font-extrabold text-3xl mt-8'>
        <span className='text-green-500'>&lt;</span>
        <span>Password</span>
        <span className='text-green-500'>OP/&gt;</span>
      </div>

      <p className='text-gray-500 font-bold'>Your personal Password Manager</p>

      <input placeholder='Enter website URL' type='text'
        className='bg-white border border-green-500 rounded-full text-sm p-1 w-[70vw] mt-8'
        value={url} onChange={(e) => seturl(e.target.value)}
      />

      <div className='flex gap-[4vw] mt-5 relative left-2'>
        <input placeholder='Enter Username' type='text'
          className='bg-white border border-green-500 rounded-full text-sm p-1 w-[46vw]'
          value={user} onChange={(e) => setuser(e.target.value)}
        />

        <span className='flex w-[20vw] items-center'>
          <input placeholder='Enter Password' type={passtype}
            className='bg-white border border-green-500 rounded-full text-sm p-1 w-full'
            value={pass} onChange={(e) => setpass(e.target.value)}
          />
          {showpass ? <FaEyeSlash className='relative right-6' onClick={handlepassclick} /> : <FaEye className='relative right-6' onClick={handlepassclick} />}
        </span>
      </div>


      <div className='bg-green-400 w-[4vw] h-[3vw]  rounded-3xl flex justify-center items-center mt-10 border border-white hover:border-green-950 transition'
        onClick={handleSave}
      > <IoSave /> <p>Save</p> </div>
      {err ? <p>Can not Save, Please fill all the given fields</p> : <p></p>}
      <div className=' w-[70vw] h-[50vw] mt-5 pl-5'>
        <p className='font-bold text-xl mb-5'>Your Passwords</p>
        {pasarr.length == 0 ?
          <div className='text-gray-500'>No passwords to show</div> :
          <div>
            <div className='bg-green-500 flex  items-center h-[4vh] text-white font-bold relative right-2 rounded'>
              <div className='w-[25vw] bg-green-500 flex justify-center'><p>Site</p></div>
              <div className='w-[15vw] bg-green-500 flex justify-center'><p>Username</p></div>
              <div className='w-[15vw] bg-green-500 flex justify-center'><p>Password</p></div>
              <div className='w-[15vw] bg-green-500 flex justify-center'><p>Actions</p></div>
            </div>
            {
              pasarr.map((p) => {
                return (
                  <PasswordBox obj={p} key={p.id} pasarr={pasarr} setpassarr={setpassarr} seturl={seturl} setuser={setuser} setpass={setpass} 
                  deletefrombackend = {deletefrombackend} 
                  />
                )
              })
            }
          </div>}
      </div>
    </div>


  )
}

export default Body