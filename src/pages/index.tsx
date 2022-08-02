import type { GetServerSideProps } from 'next';
import { Task } from '../interfaces/Tasks';


interface Props{
  tasks: Task[]
}

const Home = ({ tasks }: Props) => {
  return (
    <>
      {
        tasks.length ? 
        <p>Hay data</p> 
        : <p>No hay data</p>

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
