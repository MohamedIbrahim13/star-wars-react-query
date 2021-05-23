import React, { useState } from 'react';
import {useQuery,usePaginatedQuery} from 'react-query';
import Person from './Person';
import axios from 'axios';

const fetchPeople = async(key,page)=>{
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
}

const People = () => {
  const [page,setPage] = useState(1);
  const {resolvedData,latestData,status} = usePaginatedQuery(['people',page],fetchPeople);
  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && (<div>Loading...</div>)}
      {status === 'error' && (<div>Error Fetching Data </div>)}
      {status === 'success' && (
        <>
          <button onClick={()=>setPage(oldPage=>Math.max(oldPage - 1,1))} disabled={page===1}>Previous Page</button>
          <span>{page}</span>
          <button onClick={()=>setPage(oldPage=>(!latestData || !latestData.next ? oldPage : oldPage + 1))} disabled={!latestData || !latestData.next}>Next Page</button>
          <div>
            {resolvedData.results.map(person=> <Person key={person.name} person={person} />)}
          </div>
        </>
      )}
    </div>
  );
}
 
export default People;
