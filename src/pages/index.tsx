import type { GetServerSideProps } from 'next';
import { Task } from '../interfaces/Tasks';
import TasksList from '../components/tasks/TasksList';
import NoData from '../components/NoData/NoData';
import { Heading } from '@chakra-ui/react';
import Layout from '../components/layout/Layout';

interface Props{
  tasks: Task[]
}

const Home = ({ tasks }: Props) => {

  return (
    <>
      <Heading textAlign='center' p={20} pt='12vh'> Lista de tareas </Heading>
      {
        tasks.length 
        ? <TasksList tasks={tasks}/>   
        : <NoData />

      }
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = `${process.env.API_URL}/api/tasks`
  const res = await fetch(url)
  const tasks = await res.json()

  return{
    props: { tasks }
  }
}
