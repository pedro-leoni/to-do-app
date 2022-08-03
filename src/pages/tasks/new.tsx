import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "../../interfaces/Tasks";

const initialState = {
  title: "",
  description: "",
  priority: 0,
  state: "",
  term: "",
};

type ChangeInputHandler = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
type SubmitForm = FormEvent<HTMLFormElement>;

const NewPage = (): JSX.Element => {
  const [inputs, setInputs] = useState<Task>(initialState);
  const handleChange = ({ target: { name, value } }: ChangeInputHandler) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleRadioChange = (e: string) => {
    setInputs({
      ...inputs,
      state: e,
    });
  };

  const handleSubmit = (e: SubmitForm) => {
    e.preventDefault();
    try {
      postTask(inputs);
      alert("todo bien, chequear db");
    } catch (err) {
      console.log(err);
    }
  };

  const postTask = async (inputs: Task) => {
    const url = "http://localhost:3000/api/tasks";
    const config = {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(url, config);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='column' maxW="sm" borderWidth="1px" borderRadius="lg" padding={3}>
        <FormControl isRequired>
          <FormLabel> Title </FormLabel>
          <Input name="title" onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel> Description </FormLabel>
          <Textarea name="description" onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel> Priority </FormLabel>
          <Select
            placeholder="Priority level from 1 to 3"
            name="priority"
            onChange={handleChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel> State </FormLabel>
          <RadioGroup name="state" onChange={handleRadioChange} ml={2}>
            <Stack direction="row">
              <Radio value="ready">Lista</Radio>
              <Radio value="process">En Proceso</Radio>
              <Radio value="awaiting">Por empezar</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel> Term </FormLabel>
          <Input placeholder="dd/mm/yyyy" name="term" onChange={handleChange} />
        </FormControl>
        <Button type="submit" variant="solid" alignSelf='flex-end' leftIcon={<AddIcon />} mt={3}>
          {" "}
          Create{" "}
        </Button>
      </Box>
    </form>
  );
};

export default NewPage;
