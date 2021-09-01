import { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';


const StyledContainer = styled.ul`
  margin: 10px;
`

const StyledItem = styled.li`
  margin: 5px 0;
`


function App() {
const [contributors, setContributors] = useState([]);
const [error,setError] = useState('');
useEffect(() => {
  setError('');
  axios.get('https://api.github.com/repos/facebook/react/contributors')
    .then((res) => setContributors(res.data))
    .catch((err) => {
      console.log(err)
      setError('An error happened');
    });  
}, []);

const sortedContributors = [...contributors].sort((a,b) => a.login.toLowerCase() > b.login.toLowerCase());
  return (
    <div>
    {error ? error : <StyledContainer>{sortedContributors.map(each => <StyledItem key={each.login}>{each.login}</StyledItem>)}</StyledContainer>}    
    </div>
  );
}

export default App;
