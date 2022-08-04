import axios from 'axios';
import { useState, useEffect } from 'react';
function CreatePokeTable() {
  const [loading, setLoading] = useState(true)
  const [pokeList, setPokeList] = useState([]);
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
      .then((res) => {
        let pokes = res.data.results;
        setPokeList(pokes)
      })
      .catch(err => {
        throw err
      })
      .finally(() => [
        setLoading(false)
      ])
  }, [])
  if (loading) {
    return (
      <div>
        <h3>...Loading</h3>
      </div>
    )
  }
  return (
    <div className='poke-table'>
      <div className='container-fluid'>
        <table className="table table-striped table-success ">
          <thead>
            <tr className="table-dark">
              <th scope="col">Numbers</th>
              <th scope="col">Name</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {pokeList.map((poke, index) => [
              <tr key={index}>
                <th scope="col">{index+1}</th>
                <td>{poke.name}</td>
                <td><a href={poke.url} target="_blank" rel="noreferrer">{poke.url}</a></td>
              </tr>
            ])}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreatePokeTable;
