import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from 'next/router';

function NoData() {
    const router = useRouter()
    const handleCreate = () => {
        router.push('/tasks/new')
    }
  return (
    <Box display='flex' flexDirection='column' alignItems='center' h='100vh' w='100vw' m={5}>
        <Text>No hay tareas</Text>
        <Button leftIcon={<AddIcon/>} variant='ghost' onClick={handleCreate}>Crear la primera</Button>
    </Box>
  )
}

export default NoData