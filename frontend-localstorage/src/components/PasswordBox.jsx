import React from 'react'
import { FaCopy } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

const PasswordBox = ({ obj, pasarr, setpassarr, seturl, setuser, setpass, url, user, pass }) => {
    const handledelete = () => {
        const res = confirm('Do you really want to delete this password?')
        if (res) {
            setpassarr(pasarr.filter((p) => obj.id !== p.id))
            toast.success("Password deleted successfully");
        }
    }

    const handleedit = () => {
        seturl(obj.url)
        setuser(obj.username)
        setpass(obj.password)
        handledelete()
    }

    let passinstar = '';
    for(let i=0; i<obj.password.length; i++){
        passinstar += '*'
    }

    const handleCopy = async (text) => {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard")
    }
    return (
        <div className='bg-white flex  items-center h-[4vh] relative right-2'>
            <div className='w-[25vw] bg-white flex justify-center'><div className='flex'><p>{obj.url}</p><FaCopy className='h-4 ml-2 relative top-1' onClick={() => handleCopy(obj.url)} /></div></div>
            <div className='w-[15vw] bg-white flex justify-center'><div className='flex'><p>{obj.username}</p><FaCopy className='h-4 ml-2 relative top-1' onClick={() => handleCopy(obj.username)} /></div></div>
            <div className='w-[15vw] bg-white flex justify-center'><div className='flex'><p>{passinstar}</p><FaCopy className='h-4 ml-2 relative top-1' onClick={() => handleCopy(obj.password)} /></div></div>
            <div className='w-[15vw] bg-white flex justify-center'><div className='flex'><FaEdit className='h-4 ml-2' onClick={handleedit} /> <RiDeleteBin6Line className='h-4 ml-2' onClick={handledelete} /></div></div>
        </div>
    )
}

export default PasswordBox