import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import About from '../../about/About';
import style from './NavBar.module.css';

type Props = {}

function NavBar({}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  
  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>{
      e.preventDefault();
      setOpen(true);
  }

  return (
    <>
    <div className={style.navContent}>
      <div>
        <a onClick={()=>router.push('/')}>
          Home
        </a>
      
        <a onClick={()=>router.push('/tasks/new')}>
          Nueva tarea
        </a>

        <a onClick={handleOpen}>
          Sobre mi 
        </a>
      
      </div>
    </div>
    {
      open && <About open={open} setOpen={setOpen} />
    }
    </>
  )
}

export default NavBar