import { Box, Button, Text, Title } from "@lorewave/core";

const App = () => {
  return (
    <Box m="xl">
      <Title order={2} mb="md">
        Lorewave
      </Title>
      <Text mb="xl">Typography components are now available in core.</Text>
      <Button size="xs">Hello World</Button>
      <Button disabled>Hello World</Button>
      <Button loading>Hello World</Button>
    </Box>
  );
};

export default App;
