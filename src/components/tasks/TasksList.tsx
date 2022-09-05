// @ts-nocheck
import { Task } from "../../interfaces/Tasks";
import { Box, Button, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";
import { FormEvent } from "react";

interface Props {
  tasks: Task[];
}
type SubmitForm = FormEvent<HTMLFormElement>;

function TasksList({ tasks = [] }: Props) {
  const router = useRouter();
  const deleteTask = (id) => {
    const url = `/api/tasks/${id}`;
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
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (confirm("Eliminar?")) {
      deleteTask(id);
    }
  };

  return (
    <SimpleGrid pl={20} pr={20} columns={3} spacing={5}>
      {tasks.length &&
        tasks.map((t) => {
          return (
            <Box
              key={t.id}
              m={3}
              borderWidth="1px"
              borderRadius="lg"
              p={2}
              backgroundColor="rgba(255, 255, 255, 0.674)"
              boxShadow="31px 33px 13px 8px rgba(0,0,0,0.08)"
            >
              <Box display="flex" w="100%" justifyContent="space-between">
                <Link
                  onClick={() => router.push(`/tasks/${t.id}`)}
                  textAlign="center"
                  fontSize="2xl"
                  fontWeight='bold'
                >
                  {t.title}
                </Link>
                <Button size='sm' variant='outline' borderColor='grey' onClick={(e) => handleDelete(e, t.id)}>
                  <DeleteIcon />
                </Button>
              </Box>
              <Text
                borderWidth="1px"
                borderRadius="lg"
                borderColor='grey'
                fontSize="lg"
                mt={2}
                p={2}
              >
                {t.description}
              </Text>
              <Text p={2}>
                Tiempo hasta: {new Date(t.term).toLocaleDateString()}
              </Text>
            </Box>
          );
        })}
    </SimpleGrid>
  );
}

export default TasksList;
