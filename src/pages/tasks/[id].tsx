import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Task } from '../../interfaces/Tasks';
interface Props{
    task: Task
  }

export default function NewPage({task}: Props) {
    const router = useRouter()
    const id = router.query.id

    console.log(task)
    return (
    <div>Id</div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) =>{
    console.log('soy el context -< ', context)
    // const url = `http://localhost:3000/tasks/${id}`
    // const resp = await fetch(url)
    // const task = resp.json()
    return{
        //  props: { task }
    }
}