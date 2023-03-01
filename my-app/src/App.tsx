import { Routes, Route, useLocation } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import { Home } from "./components/Home/Home";
import { MyBookList } from "./components/MyBooks/MyBooksList";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase";
import { BookDetails } from "./components/BookDetails/BookDetails";
import { AppContext } from "./providers/AppProvider";
import { Logout } from "./components/Logout/Logout";
import {Admin} from './components/Admin/Admin';
import "./App.module.css";

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);

function App() {
  const { setUsername, myBookList, setmyBookList, setIsLogged, books } =
    useContext(AppContext);
    const [isAdmin, setAdmin] = useState<boolean>(false);
    const {pathname} = useLocation();

  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setUsername(userEmail);
        setIsLogged(true);
        const docRef = doc(firebaseDb, "MyList", `${user.email}`);
        const docSnap = await getDoc(docRef);
        if (user.email  === "admin@admin.pl") {
          setAdmin(true);
          } 

        if (docSnap.exists()) {
          const data = docSnap.data();
          setmyBookList(data.books);
        }
      } else {
        setUsername("");
        setmyBookList([]);
    
      }
    });
  }, [setmyBookList, setUsername, setIsLogged, books, isAdmin, setAdmin]);

  useEffect((): void => {
window.scrollTo(0,0);
  }, [pathname])

  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/mybooks"
          element={<MyBookList myBooksList={myBookList} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
