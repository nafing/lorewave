import { Box, Button } from "@lorewave/core";

const App = () => {
  return (
    <Box m="xl">
      <Button size="xs">Hello World</Button>
      <Button disabled>Hello World</Button>
      <Button loading>Hello World</Button>
    </Box>
  );
};

export default App;
