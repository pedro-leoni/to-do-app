import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { GetStaticPaths, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "../../interfaces/Tasks";
import { Spinner } from "@chakra-ui/react";
import {
  EditIcon,
  ArrowBackIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
} from "@chakra-ui/icons";

interface Props {
  task: Task;
}
type ChangeInputHandler = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
type SubmitForm = FormEvent<HTMLFormElement>;

const initialState = {
  title: "",
  description: "",
  priority: 0,
  state: "",
  term: "",
};

export default function NewPage() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [info, setInfo] = useState<Task>(initialState);
  const [edit, setEdit] = useState<Boolean>(false);
  const [inputs, setInputs] = useState<Task>(initialState);
  const [putSwitch, setPutSwitch] = useState<Boolean>(false)
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    const url = `http://localhost:3000/api/tasks/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => setInfo(json.data));
    setLoading(false);
    return () => setInfo(initialState);
  }, [router.query, putSwitch]);

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const putTask = () => {
    const { id } = router.query;
    const url = `http://localhost:3000/api/tasks/${id}`;
    setLoading(true)
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => {
        if (res.status >= 400) {
          setPutSwitch(!putSwitch)
          return alert("hubo un problema, intentalo de nuevo");
        } else {
          return res.json().then((json) => setInfo(json.data)).then(() => alert("Todo ok"));;
        }
      })
      setPutSwitch(!putSwitch)
      setLoading(false)
  };
  const deleteTask = () => {
    const { id } = router.query;
    const url = `http://localhost:3000/api/tasks/${id}`
    setLoading(true)
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res)=>{
      console.log(res)
      alert('Tarea eliminada')
      router.push('/')
    })
  }
  const handleDelete = () => {
    if (confirm('estas seguro?')){
      deleteTask()
    }
  }

  const handleSubmit = (e: SubmitForm) => {
    e.preventDefault();
    console.log("Inputs cuando submiteo => ", inputs);
    if (inputs === initialState) {
      alert("no hay cambios");
    } else {
      putTask();
      setInputs(initialState)
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      minHeight="30vh"
      height="auto"
      p={11}
      mt={20}
      width="40vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      position="absolute"
      sx={{ left: "30%" }}
    >
      <Box display="flex" mb={9} mt={3}>
        {edit ? (
          <Input
            name="title"
            placeholder={info?.title}
            onChange={handleChange}
          />
        ) : (
          <Heading>{info?.title}</Heading>
        )}
        <Box display="flex" alignSelf="flex-end" ml="300px">
          <Button
            mr={2}
            onClick={edit ? () => {setEdit(false) ; setInputs(initialState)} : () => router.push("/")}
          >
            <ArrowBackIcon />
          </Button>
          <Button mr={2} onClick={() => setEdit(true)}>
            <EditIcon />
          </Button>
          <Button onClick={handleDelete}>
            <DeleteIcon/>
          </Button>
        </Box>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" width="70%" p={2} mb={9}>
        {loading && <Spinner />}
        <Box display="flex" flexDir="column" justifyContent="space-around">
          {edit ? (
            <>
              <Textarea
                name="description"
                height="auto"
                placeholder={info?.description}
                onChange={handleChange}
              />
              <Box display="flex" justifyContent="space-around">
                <Input
                  name="term"
                  placeholder={new Date(info?.term).toLocaleDateString()}
                  onChange={handleChange}
                />
                <Select name="priority" onChange={handleChange}>
                  <option value={1}>Urgente</option>
                  <option value={2}>Media</option>
                  <option value={3}>Puede esperar</option>
                </Select>
                <Select name="state" onChange={handleChange}>
                  <option value="ready"> Lista </option>
                  <option value="process"> En Proceso </option>
                  <option value="awaiting"> Por empezar </option>
                </Select>
              </Box>
            </>
          ) : (
            <>
              <Text fontSize="2xl">{info?.description}</Text>
              <Box display="flex" justifyContent="space-around">
                <Text>
                  Tiempo hasta: {new Date(info?.term).toLocaleDateString()}
                </Text>
                {info?.priority === 1 && <Text>!</Text>}
                {info?.priority === 2 && <Text>!!</Text>}
                {info?.priority === 3 && <Text>!!!</Text>}
                Estado: {info?.state}
              </Box>
            </>
          )}
        </Box>
      </Box>
      {edit && (
        <>
          <Box alignSelf="center">
            <Button
              margin={4}
              rightIcon={<CloseIcon />}
              onClick={() =>{ setEdit(false); setInputs(initialState)}}
            >
              Cancelar
            </Button>
            <Button rightIcon={<CheckIcon />} onClick={handleSubmit}>
              Listo
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params;
  const url = `http://localhost:3000/api/tasks/${id}`;
  const res = await fetch(url);
  const tasks = await res.json();

  return {
    props: { tasks },
  };
};
