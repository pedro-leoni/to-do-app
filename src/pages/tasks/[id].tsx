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
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
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
type SubmitForm = MouseEvent<HTMLElement>;

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
  const [putSwitch, setPutSwitch] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    const url = `/api/tasks/${id}`;
    fetch(
      url,{      
      headers: {
      "Content-Type": "application/json",
      }}
    )
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
    const url = `/api/tasks/${id}`;
    setLoading(true);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }).then((res) => {
      if (res.status >= 400) {
        setPutSwitch(!putSwitch);
        return alert("hubo un problema, intentalo de nuevo");
      } else {
        return res
          .json()
          .then((json) => setInfo(json.data))
          .then(() => alert("Editado con exito"));
      }
    });
    setPutSwitch(!putSwitch);
    setLoading(false);
  };
  const deleteTask = () => {
    const { id } = router.query;
    const url = `/api/tasks/${id}`;
    setLoading(true);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      alert("Tarea eliminada");
      router.push("/");
    });
  };
  const handleDelete = () => {
    if (confirm("estas seguro?")) {
      deleteTask();
    }
  };

  const handleSubmit = (e: SubmitForm) => {
    e.preventDefault();
    if (inputs === initialState) {
      alert("no hay cambios");
    } else {
      putTask();
      setInputs(initialState);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      minHeight="30vh"
      height="auto"
      p={5}
      mt={20}
      width="25vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      position="absolute"
      sx={{ left: "37%" }}
      backgroundColor="rgba(255, 255, 255, 0.674)"
      boxShadow="31px 33px 13px 8px rgba(0,0,0,0.08)"
    >
      <Box display="flex" flexDirection='column-reverse' alignContent='center' mb={9} mt={9}>
        {edit ? (
          <Input
            name="title"
            placeholder={info?.title}
            onChange={handleChange}
            borderColor="black"
          />
        ) : (
          <Text fontSize="3xl">{info?.title}</Text>
        )}
        <Box display="flex" alignSelf="flex-end" position='absolute' sx={{top:3, right: 3}} >
          <Button
            size="sm"
            mr={2}
            onClick={
              edit
                ? () => {
                    setEdit(false);
                    setInputs(initialState);
                  }
                : () => router.push("/")
            }
            variant="outline"
            borderColor="black"
          >
            <ArrowBackIcon />
          </Button>
          <Button
            size="sm"
            mr={2}
            onClick={() => setEdit(true)}
            variant="outline"
            borderColor="black"
          >
            <EditIcon />
          </Button>
          <Button
            size="sm"
            onClick={handleDelete}
            variant="outline"
            borderColor="black"
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
      <Box borderWidth="1px" borderColor="grey" borderRadius="lg" p={2} mb={9}>
        {loading && <Spinner />}
        <Box
          display="flex"
          width="20vw"
          flexDir="column"
          justifyContent="space-around"
        >
          {edit ? (
            <>
              <Textarea
                name="description"
                height="auto"
                placeholder={info?.description}
                onChange={handleChange}
                borderColor="black"
              />
              <Box display="flex" justifyContent="space-around">
                <Input
                  name="term"
                  placeholder={new Date(info?.term).toLocaleDateString()}
                  onChange={handleChange}
                  borderColor="black"
                />
                <Select name="priority" onChange={handleChange} borderColor="black">
                  <option value={info?.priority}>Prioridad</option>
                  <option value={1}>Urgente</option>
                  <option value={2}>Media</option>
                  <option value={3}>Puede esperar</option>
                </Select>
                <Select name="state" onChange={handleChange} borderColor="black">
                  <option value={info?.state}>Estado</option>
                  <option value="ready"> Lista </option>
                  <option value="process"> En Proceso </option>
                  <option value="awaiting"> Por empezar </option>
                </Select>
              </Box>
            </>
          ) : (
            <>
              <Text fontSize="1.5rem">{info?.description}</Text>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Text>
                  Tiempo hasta: {new Date(info?.term).toLocaleDateString()}
                </Text>
                <Text>
                  Prioridad: {info?.priority}
                  <span style={{ marginLeft: "10px" }}>
                    Estado: {info?.state}
                  </span>
                </Text>
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
              onClick={() => {
                setEdit(false);
                setInputs(initialState);
              }}
              variant="outline"
              borderColor="black"
            >
              Cancelar
            </Button>
            <Button
              variant="outline"
              borderColor="black"
              rightIcon={<CheckIcon />}
              onClick={handleSubmit}
            >
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
  const url = `${process.env.API_URL}/api/tasks/${id}`;
  const res = await fetch(
    url, 
    {headers: {
    "Content-Type": "application/json",
    }}
  );
  const tasks = await res.json();

  return {
    props: { tasks },
  };
};
