export const introCellsData = [
  {
    content:
      "## Js Jotter\nThis is an interactive coding environment. You can write javascript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one), to edit it\n- The code in the code editor is all joined into one file. If you define a variable or function in a code cell, you can refer to it in any following code cells.\n- You can show any React component, string, number, object or anything else in the preview window, by calling the ***show*** function\n- Reorder or delete the cells using the buttons on the top right of each cell.\n- Add a new cell by hovering over the space between two cells.\n\nAll your changes get saved to the file you opened Js Jotter with! So if you ran\n\n*npx jbook serve test.js*\n\nAll your changes will be saved to the test.js file.",
    type: "text",
    id: "kv0dz",
  },
  {
    content:
      "// An example Component:\r\n\r\nimport {useState} from 'react'; // No need to import React! Just import the hooks use need!\r\nimport {styled} from 'styled-components'; // just import the libraries you need, their code be fetched automatically\r\n\r\n// Style them as you want, styling using styled-components here\r\nconst Wrapper = styled.div`\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n  align-items: center;\r\n`\r\nconst Heading = styled.div`\r\n  color: #7F9F80;\r\n  font-size: 24px;\r\n  font-weight: bold;\r\n`\r\nconst SubHeading = styled.div`\r\n  color: #4F6F52;\r\n  font-size: 14px;\r\n`\r\nconst CountText = styled.div`\r\n  color: #7F9F80;\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n`\r\nconst Button = styled.button`\r\n    padding: 10px;\r\n    fontSize: 16px;\r\n    background-color: #4CAF50;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n`\r\n// Define your component\r\nconst Counter = () => {\r\n  const [count, setCount] = useState(0);\r\n  return (\r\n    <Wrapper>\r\n      <Heading>Counter</Heading>\r\n      <SubHeading>This is an example counter component</SubHeading>\r\n      <Button onClick={() => setCount(count + 1)}>Increment +</Button>\r\n      <CountText>Count: {count}</CountText>\r\n    </Wrapper>\r\n  )\r\n}\r\n\r\n// Render it to the preview using the show function😍\r\nshow(<Counter/>)",
    type: "code",
    id: "9tafh",
  },
  { content: "Another text cell", type: "text", id: "yo3el" },
];
