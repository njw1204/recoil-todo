import ToDoList from "./component/ToDoList";
import styled from "styled-components";

const AppContainer = styled.div`
  padding: 32px 16px;
`;

function App() {
  return (
    <AppContainer>
      <ToDoList/>
    </AppContainer>
  );
}

export default App;
