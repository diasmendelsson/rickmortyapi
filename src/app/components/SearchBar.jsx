import styles from './search.module.css'
import { useState } from 'react';


export default function SearchBar({onSearch}){

    // 1° passo -  Declarar as variaveis de estado
    const [query, setQuery ] = useState('');

    // 2° passo - Declarar a função que vai dentro do Input no onChange
    const handleChange = (e) => {
        onSearch(e.target.value)
       
    }



    // 3° passo - Declarar a função que vai enviar os dados do formula´rio 
    /* const handleSubmit = (e) =>{
        e.preventDefault();
        onSearch(query)
        setQuery('');
    } */




    return(

        


            <input type='text' placeholder='Buscar..' /* value={query} */ required onChange={handleChange}/>
          
        
      
    )
}