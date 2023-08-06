import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Text, Badge, Image, Button, Group } from "@mantine/core";

export default function App() {
  const query = useQuery(["todos"], async () => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    if (response.status > 300 || response.status < 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  });
  const apiBaseUrl = "https://ac26-46-34-193-252.ngrok-free.app";
  useEffect(() => {
    const fetchNgrokUrl = async () => {
      try {
        const response = await axios.get("https://api.ngrok.com/api/1/tunnels");
        if (response.data?.tunnels?.length > 0) {
          setApiBaseUrl(response.data.tunnels[0].public_url);
        } else {
          console.error("No ngrok tunnel found!");
        }
      } catch (error) {
        console.error("Error fetching ngrok URL:", error);
      }
    };

    fetchNgrokUrl();
  }, []);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: ""
  });
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/ab7522001f0e49308066a5c5f4f7650a/create",
        newProduct
      );
      console.log(response.data);
      setNewProduct({
        title: "",
        price: "",
        category: "",
        image: ""
      });

      query.refetch();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const filteredResults = query.data?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults || []);
  };

  const mutationCreate = useMutation(
    async (input) => {
      const data = await axios.post(
        "https://crudcrud.com/api/ab7522001f0e49308066a5c5f4f7650a/create",
        {
          title: "Rick"
        }
      );
      console.log(data);
      return data;
    },
    {
      onSuccess: (response) => {
        navigate(`/product/${response.data._id}`);
      }
    }
  );

  return (
    <>
      <div className="container">
        {/* {JSON.stringify(query.data)} */}
        <header className="header" data-tag="header">
          <div className="container">
            <a href="/" className="logo">
              <img src="logo.svg" className="logoImg" alt="" />
            </a>

            <SearchBar onSearch={handleSearch} />

            <div className="headerMenu">
              <a href="/">
                <img src="user.svg" alt="" />
                <p>Log In</p>
              </a>
              <a href="/">
                <img src="cart.svg" alt="" />
                <p>Cart</p>
              </a>
            </div>
            <div className="headerMenuMobile">
              <a href="/">
                <img src="" alt="" />
              </a>
            </div>
          </div>
        </header>

        <Button
          className="addButton"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => {
            mutationCreate.mutate();
          }}
        >
          + Add
        </Button>

        <Grid>
          {searchResults.length > 0
            ? searchResults.map((product) => (
                <Grid.Col key={product.id} xs={6} sm={4} md={3} lg={2}>
                  <Card
                    className="productCard"
                    withBorder
                    my="xl"
                    shadow="sm"
                    p="lg"
                    radius="md"
                  >
                    <Group
                      className="productGroup"
                      position="apart"
                      mt="md"
                      mb="xs"
                    >
                      <Text className="productTitle" weight={500}>
                        {product.title}
                      </Text>
                      <div className="badges">
                        <Badge
                          className="productBadge"
                          color="pink"
                          variant="light"
                        >
                          {product.price + "$"}
                        </Badge>
                        <Badge
                          className="productBadge"
                          color="pink"
                          variant="light"
                        >
                          {product.category}
                        </Badge>
                        <Badge
                          className="productBadge"
                          color="pink"
                          variant="light"
                        >
                          ★ {product.rating.rate} ({product.rating.count})
                        </Badge>
                      </div>
                    </Group>
                    <Card.Section>
                      <div className="image"></div>
                      <Image
                        className="productImage"
                        src={product.image}
                        height="fitContent"
                        alt="Norway"
                      />
                    </Card.Section>

                    <Button
                      className="productButton"
                      fullWidth
                      mt="md"
                      radius="md"
                      component="a"
                      href={`/product/${product.id}`}
                    >
                      View
                    </Button>
                  </Card>
                </Grid.Col>
              ))
            : query.data?.map((product) => (
                <Grid.Col key={product.id} xs={6} sm={4} md={3} lg={2}>
                  <Card
                    className="productCard"
                    withBorder
                    my="xl"
                    shadow="sm"
                    p="lg"
                    radius="md"
                  >
                    <Group
                      className="productGroup"
                      position="apart"
                      mt="md"
                      mb="xs"
                    >
                      <Text className="productTitle" weight={500}>
                        {product.title}
                      </Text>
                      <div className="badges">
                        <Badge
                          className="productBadge"
                          color="pink"
                          variant="light"
                        >
                          {product.price + "$"}
                        </Badge>
                        <Badge
                          className="productBadge"
                          color="pink"
                          variant="light"
                        >
                          {product.category}
                        </Badge>
                        <Badge
                          className="productBadge"
                          color="pink"
                          variant="light"
                        >
                          ★ {product.rating.rate} ({product.rating.count})
                        </Badge>
                      </div>
                    </Group>
                    <Card.Section>
                      <div className="image"></div>
                      <Image
                        className="productImage"
                        src={product.image}
                        height="fitContent"
                        alt="Norway"
                      />
                    </Card.Section>

                    <Button
                      className="productButton"
                      fullWidth
                      mt="md"
                      radius="md"
                      component="a"
                      href={`/product/${product.id}`}
                    >
                      View
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
        </Grid>
      </div>
    </>
  );
}
