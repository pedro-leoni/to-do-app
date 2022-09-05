import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "../../interfaces/Tasks";
import { useRouter } from 'next/router';

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
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();


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
    } catch (err) {
      alert('Se produjo un error')
      // console.log(err);
    }
  };

  const postTask = async (inputs: Task) => {
    setLoading(true)
    const url = "/api/tasks";
    const config = {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(url, config);
    setLoading(false);
    alert('Creado con exito');
    router.push('/')
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        marginTop="15vh"
        padding={3}
        width="25vw"
        backgroundColor="rgba(255, 255, 255, 0.674)"
        boxShadow='31px 33px 13px 8px rgba(0,0,0,0.08)'
      >
        {
          loading ? 
          <Spinner/>
          :
          <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel> Title </FormLabel>
            <Input name="title" onChange={handleChange} borderColor='black'/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel> Description </FormLabel>
            <Textarea name="description" onChange={handleChange} borderColor='black'/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel> Priority </FormLabel>
            <Select
              borderColor='black'
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
                <Radio value="ready" borderColor='grey'>Lista</Radio>
                <Radio value="process" borderColor='grey'>En Proceso</Radio>
                <Radio value="awaiting" borderColor='grey'>Por empezar</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel> Term </FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="date"
              name="term"
              onChange={handleChange}
              borderColor='black'
            />
          </FormControl>
          <Button
            type="submit"
            
            marginLeft='70%'
            leftIcon={<AddIcon />}
            mt={3}
            variant='outline'
            borderColor='black'
          >
            {" "}
            Create{" "}
          </Button>
        </form>
        }
      </Box>
    </div>
  );
};

export default NewPage;
