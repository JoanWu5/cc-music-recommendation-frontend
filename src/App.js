import './App.less';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Interest from "./pages/Interest";
import Report from "./pages/Report";
import Recommendation from "./pages/Recommendation";
import Profile from "./pages/Profile";
import Forget from "./pages/Forget";
import Search from "./pages/Search";

function App() {
    // console.log("hash app", window.location.hash);
    let hash = window.location.hash;
    let token = localStorage.getItem("token");
    if (token === null && hash && hash !== "") {
        const result = hash.split('&').reduce(function (res, item) {
            const parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});
        console.log("token", result["#access_token"]);
        if ("#access_token" in result){
            console.log("token", result["#access_token"]);
            token = result["#access_token"];
            localStorage.setItem("token", token);
            window.location.hash = "";
        }
    }
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
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/forget" element={<Forget/>}/>
                    <Route path="/search" element={<Search/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
