import Navbar from './Componets/navbar/Navbar'
import './globals.css'
import { Inter,Oswald,Urbanist } from 'next/font/google'
import AuthProvider from "./Componets/AuthProvider/AuthProvider";
import {KeywordProvider} from "./Componets/ContextApi/Keyword";


const inter = Inter({ subsets: ['latin'] })
const oswald = Oswald({ subsets: ['latin'] })
const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'Nike',
  description: 'This is a Nike Ecoomerce site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>
      <KeywordProvider>
        <AuthProvider>
          <Navbar/>
          {children}
        </AuthProvider>
      </KeywordProvider>
      </body>

    </html>
  )
}
