const Navbar = () => {
  return (
    <div className='bg-gray-800 text-white h-15 flex  items-center justify-around'>
      <div className='font-extrabold text-3xl'>
        <span className='text-green-500'>&lt;</span>
        <span>Password</span>
        <span className='text-green-500'>OP/&gt;</span>
      </div>
      <a href="https://github.com/BlazZy54" >
      <div className='rounded-4xl bg-green-400 font-bold h-11 flex justify-center items-center border-2 hover:border-black transition'>
        <img src='./images/githublogo.png' className='h-12.5'/>
      </div>
      </a>
    </div>
  )
}

export default Navbar