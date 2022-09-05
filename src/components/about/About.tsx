import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react';
import { Linkedin, Github } from '@icons-pack/react-simple-icons';


type Props = {
    open: boolean,
    setOpen: (value: boolean) => void;
}

function About({open, setOpen}:Props) {
    
    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpen(false);
    }
  return (
    <>
     <Modal isOpen={open} onClose={()=>handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={handleClose}/>
          <ModalBody display='flex' flexDirection='column'>
            <Text fontSize='2xl'>
                Pedro Leoni - Fullstack Developer
            </Text>
            <a style={{marginTop: '15px', textDecoration: 'underline'}} href='https://github.com/pedro-leoni/to-do-app' target='#blank'>
                Repositorio del proyecto
            </a>
          </ModalBody>
          <ModalFooter fontSize='smaller' display='flex' justifyContent='space-between'>
            <div style={{display:'flex'}}>
                <a style={{marginRight: '10px', marginLeft: '10px',}} href='https://www.linkedin.com/in/pedro-leoni/' target='#blank'>
                    <Linkedin color='#003a94' />
                </a>
                <a href='https://github.com/pedro-leoni' target='#blank'>
                    <Github />
                </a>
            </div>
            Todos los derechos reservados ®
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default About