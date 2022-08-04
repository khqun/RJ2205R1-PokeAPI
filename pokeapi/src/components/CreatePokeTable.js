import axios from 'axios';
import { useState, useEffect } from 'react';
function CreatePokeTable() {
  const [loading, setLoading] = useState(true);
  const [pokeList, setPokeList] = useState([]);
  const [previousUrl, setPreviousUrl] = useState();
  const [nowUrl, setNowUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
  const [nextUrl, setNextUrl] = useState();
  const goToNextPage = () => {
    setNowUrl(nextUrl)
  }
  const goToPreviousPage = () => {
    setNowUrl(previousUrl)
  }
  useEffect(() => {
    axios.get(nowUrl)
      .then((res) => {
        let pokes = res.data.results;
        setPokeList(pokes);
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
      })
      .catch(err => {
        throw err
      })
      .finally(() => [
        setLoading(false)
      ])
  })
  if (loading) {
    return (
      <div>
        <h3>...Loading</h3>
      </div>
    )
  }
  return (
    <div>
      <div className='container-fluid d-flex'>
        <button className={`btn btn-danger `} onClick={goToPreviousPage} disabled={previousUrl ? false : true}>Previous</button>
        <button className='btn btn-success' onClick={goToNextPage}  disabled={nextUrl ? false : true}>Next</button>
      </div>
      <div className='poke-table'>
        <div className='container-fluid'>
          <table className="table table-striped table-success ">
            <thead>
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">URL</th>
              </tr>
            </thead>
            <tbody>
              {pokeList.map((poke, index) => [
                <tr key={index + 1}>
                  <th scope="col">{index + 1}</th>
                  <td>{poke.name}</td>
                  <td><a href={poke.url} target="_blank" rel="noreferrer">{poke.url}</a></td>
                </tr>
              ])}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreatePokeTable;
