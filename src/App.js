import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import UserDetails from './components/users/UserDetails';
import UserGroupDetails from './components/user-groups/UserGroupDetails'
import RoleGroupDetails from './components/role-groups/RoleGroupDetails';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path='/user/:userId' element={<UserDetails/>}/>
      <Route path='/userGroup/:groupId' element={<UserGroupDetails/>}/>
      <Route path='/roleGroup/:groupId' element={<RoleGroupDetails/>}/>
      <Route path='/role/:roleId' element={<div>Role Group Details</div>}/>
      <Route path='/permission/:permissionId' element={<div>Permission Details</div>}/>
    </Routes>
    </BrowserRouter>
  );
  
};

export default App;
