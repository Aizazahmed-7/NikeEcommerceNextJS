'use client'
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import { KeywordContext } from "../ContextApi/Keyword"
import { useRouter } from 'next/navigation'
const Navbar = () => {


  const [showMenu, setShowMenu] = React.useState(false)
  const {setKeyword} = React.useContext(KeywordContext)
  const router = useRouter();

  const handleClick = (e) => {  
    if (e.key === 'Enter') {
      setKeyword(e.target.value)
      router.push(`/Search`)
    }
  }
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const links = [
  
    {
      id: 2,
      title: "Shoes",
      url: "/Search?category=Shoes",
    },
    {
      id: 3,
      title: "Clothing",
      url: "/Search?category=Clothing",
    },
    {
      id: 4,
      title: "Accessories",
      url: "/Search?category=Accessories",
    },
 
  ];

  return (<>

    <nav className={styles.container}>

    <Link className={''} href="/"> 
      {/* <img  className={styles.img} width={500} height={500} src='/nikelogo.jpeg' /> */}
      <svg aria-hidden="true" class="pre-logo-svg" focusable="false" viewBox="0 0 24 24" role="img" width="100px" height="100px" fill="none" className='ml-10'><path fill="currentColor" fill-rule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clip-rule="evenodd"></path></svg>
     </Link>

    <div className={styles.links} >

      {links.map((link) => (
        <Link  className={ styles.underlineAnimation} href={link.url} key={link.id}> {link.title} </Link>
      ))}

        

    </div>

    <div className='p-2 md:p-8 flex justify-center items-center gap-1 md:gap-4 ' >   
        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
        <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input onKeyUp={handleClick} onChange={(e) => setKeyword(e.target.value)} type="search" id="default-search" className="block   hover:bg-gray-300  hover:placeholder:text-gray-600 h-10 rounded-full w-36 p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50" placeholder="Search" />
        </div>
        

      <div className='md:hidden block font-bold'>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>  

        

      <div className='hover:bg-gray-300 rounded-full p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
      </div>

      <Link href='/Cart'>
      <div className='hover:bg-gray-300 rounded-full p-2' >
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
      </div>
      </Link>

        <button onClick={toggleMenu} className='md:hidden block font-bold' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
        </button>

    </div>



    </nav>

    <div style={{width : showMenu ? '250px' : '0px' }} className={styles.sidenav}>
  <button className ={styles.closebtn} onClick={toggleMenu}>&times;</button>

  {links.map((link) => (
        <Link  className={styles.underlineAnimation} href={link.url} key={link.id}> {link.title} </Link>
      ))}
    
      </div>

    {showMenu  &&  <div className={styles.overlay} ></div> }

  </>
  )
}

export default Navbar