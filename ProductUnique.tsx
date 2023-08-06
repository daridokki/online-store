import {
  Badge,
  Button,
  Title,
  Input,
  Checkbox,
  Group,
  Box,
  NumberInput,
  Textarea,
  Grid
} from "@mantine/core";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import "../public/style.css";
export function ProductUniquePage() {
  let { productId } = useParams();
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
      price: 0
    }
  });

  // const query = useQuery(
  //   "product",
  //   async () => {
  //     return await axios
  //       .get(`https://fakestoreapi.com/products/${productId}`)
  //       .then((res) => res.data);
  //   },
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //       form.setValues({
  //         keywords: data.keywords,
  //         text: data.text,
  //         nickname: data.nickname
  //       });
  //     }
  //   }
  // );
  const query = useQuery(
    ["todos"],
    async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        form.setValues({
          keywords: data.keywords,
          text: data.text,
          nickname: data.nickname
        });
      }
    }
  );
  const mutation = useMutation(async (input) => {
    const data = await axios.post("local.com/posts/create", {
      ...input,
      productTitle: input.title,
      access_key: "dccc5d11-925a-4214-bb9d-f52320fb4464"
    });
    console.log(data);
  });
  const mutationAi = useMutation(
    async (input) => {
      return `Dreamscape Author: Develop an AI platform that turns people's dreams and imaginative thoughts into written stories. Users can describe their dreams, and the AI will transform them into engaging narratives, blurring the line between reality and fiction.

      Time-Travel Diaries: Create an app that generates journal entries, letters, and diary entries `;
    },
    {
      onSuccess: (data) => {
        form.setFieldValue("email", data);
      }
    }
  );
  const navigate = useNavigate();

  const mutationDelete = useMutation(
    async (input) => {
      const data = await axios.post("https://api.web3forms.com/submit", {
        id: input.id,
        access_key: "dccc5d11-925a-4214-bb9d-f52320fb4464"
      });
      console.log(data);
    },
    {
      onSuccess: (data) => {
        navigate("/");
      }
    }
  );
  if (query.isSuccess) {
    return (
      <>
        <div className="container">
          <div className="buttons">
            <Button component="a" href="/">
              Go back
            </Button>
            <Button
              color={mutation.isSuccess ? "green" : "blue"}
              fullWidth
              mt="md"
              radius="md"
              onClick={() => {
                mutation.mutate({
                  title: query.data.title
                });
              }}
            >
              Purchase
            </Button>
            <Button
              color={mutationDelete.isSuccess ? "green" : "blue"}
              fullWidth
              mt="md"
              radius="md"
              onClick={() => {
                mutationDelete.mutate({
                  id: query.data.id
                });
              }}
            >
              Delete
            </Button>
          </div>
          <Title>{query.data.title}</Title>

          <Grid>
            <Grid.Col span={6}>
              <div className="badgesUnique">
                <Badge>{query.data.price}$</Badge>
                <Badge>{query.data.category}</Badge>
                <Badge>
                  ★ {query.data.rating.rate} ({query.data.rating.count})
                </Badge>
              </div>
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6}>
              <img className="productUniqueImage" src={query.data.image} />
            </Grid.Col>
            <Grid.Col span={6}>
              <p className="productDescription">{query.data.description}</p>
              <form
                onSubmit={form.onSubmit((values) => {
                  mutation.mutate(values);
                })}
              >
                <Input
                  className="formInput"
                  placeholder="Your email"
                  label="Email"
                  {...form.getInputProps("email")}
                />

                <NumberInput
                  className="formInput"
                  {...form.getInputProps("price")}
                />

                <Checkbox
                  mt="md"
                  label="Include delivery"
                  {...form.getInputProps("termsOfService", {
                    type: "checkbox"
                  })}
                />

                <Group position="right" mt="md" className="buttons">
                  <Button type="submit" className="aButton">
                    Submit
                  </Button>
                  <Button
                    className="aButton"
                    onClick={() => {
                      mutationAi.mutate();
                    }}
                  >
                    Generate
                  </Button>
                </Group>
              </form>
            </Grid.Col>
          </Grid>
        </div>
      </>
    );
  }
  return <>{productId}</>;
}
