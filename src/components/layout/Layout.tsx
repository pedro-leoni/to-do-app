import { Container } from '@chakra-ui/react';
import React from 'react'
import NavBar from './NavBar/NavBar'
import style from './Layout.module.css'



function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div>
      <NavBar/>
      <div className={style.container}>
        {children}
      </div>

    </div>
  )
}

export default Layout