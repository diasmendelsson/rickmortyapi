'use client'
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios'
import SearchBar from "./components/SearchBar";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

export default function Home(){

  const [dados, setDados ] = useState([]);
  const [filterResults, setFilterResults ] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getCaracter = async (page) => {
    await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${page}`)
      .then((response) => {
        setDados(response.data.results)
        setTotalPages(response.data.info.pages);
      })
      .catch((err) =>{
        console.log('Erro:', err)
      });
  }

  useEffect(() => { 
    getCaracter();
  }, [searchQuery, currentPage]);

  useEffect(() =>{
    const filterCharacters = () => {
      if (searchQuery) {
        const filterdData = dados.filter(caracter => 
          caracter.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
          setFilterResults(filterdData)
      } else {
        setFilterResults([]);
      }
    };
    filterCharacters();
  }, [searchQuery, dados]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    getCaracter(newPage);
  }

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
    getCaracter(newPage);
  }

  return(
    <main className={styles.container}> 
      <SearchBar onSearch={handleSearch} />
      {(filterResults.length > 0 ? filterResults : dados).map(caracter =>  (
        <div key={caracter.id} className={styles.card}>
          <img
            className={styles.images}
            src={caracter.image}
            width={100}
            height={100}
          />
          <h1>{caracter.name}</h1>
          <p>{caracter.species}</p>
        </div>
      ))}
      <div className={styles.nav}>
        <button className={styles.btn} onClick={handlePrevPage} disabled={currentPage === 1}><FaCaretLeft /></button>
        <span>Página {currentPage} de {totalPages}</span>
        <button className={styles.btn} onClick={handleNextPage} disabled={currentPage === totalPages}><FaCaretRight /></button>
      </div>
    </main>
  )
}