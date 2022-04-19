import './App.less';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Interest from "./pages/Interest";
import Report from "./pages/Report";
import Recommendation from "./pages/Recommendation";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Forget from "./pages/Forget";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/interest" element={<Interest/>}/>
                    <Route path="/report" element={<Report/>}/>
                    <Route path="/recommendation" element={<Recommendation/>}/>
                    <Route path="/detail" element={<Detail/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/forget" element={<Forget/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
