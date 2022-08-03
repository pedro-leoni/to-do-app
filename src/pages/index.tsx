import type { GetServerSideProps } from 'next';
import { Task } from '../interfaces/Tasks';
import TasksList from '../components/tasks/TasksList';
import NoData from '../components/NoData/NoData';

interface Props{
  tasks: Task[]
}

const Home = ({ tasks }: Props) => {
  return (
    <>
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
  const url = "http://localhost:3000/api/tasks"
  const res = await fetch(url)
  const tasks = await res.json()

  return{
    props: { tasks }
  }
}
