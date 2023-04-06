import { Header } from "./components/Header"
import { Post } from "./components/Post";
import { Sidebar } from "./components/sidebar";

import styles from "./App.module.css";

import "./global.css"



export function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
          <main>
              <Post 
              author="Mario Campos" 
              content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et odio repudiandae quidem fugit laboriosam praesentium velit totam modi? Magnam corporis adipisci voluptatem eligendi dolore, repellendus fuga pariatur nesciunt quisquam dolorem!" 
              />
              <Post 
              author="Antônio Maria" 
              content="Este é um novo post para testes"
              />
          </main>
      </div>
    </div>
   
  )
}


