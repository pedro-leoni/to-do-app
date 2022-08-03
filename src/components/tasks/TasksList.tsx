import { Task } from '../../interfaces/Tasks';
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';

interface Props{
  tasks: Task[]
}

function TasksList({ tasks = []}: Props) {
  const router = useRouter()

  return (
    <SimpleGrid columns={3} spacing={5}>
      {
        tasks.length &&
        tasks.map(( t => {return(
          <Box key={t.id} m={3} borderWidth="1px" borderRadius="lg" p={2}>
            <Text align='center' fontSize='2xl'>{t.title}</Text>
            <Text borderWidth="1px" borderRadius="lg" fontSize='lg' mt={2} p={2}>{t.description}</Text>
            <Text p={2}>Tiempo hasta: {new Date(t.term).toLocaleDateString()}</Text>
          </Box>
        )}))
      }
    </SimpleGrid>
  )
}

export default TasksList