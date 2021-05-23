import React, { useState } from 'react';
import { useQuery,usePaginatedQuery } from "react-query";
import Planet from './Planet';
import axios from "axios";

const fetchPlanets = async(key,page)=>{
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
}

const Planets = () => {
  const [page,setPage] = useState(1);
  const {resolvedData,latestData,status} = usePaginatedQuery(['planets',page],fetchPlanets);
  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && (<div>Loading...</div>)}
      {status === 'error' && (<div>Error Fetching Data </div>)}
      {status === 'success' && (
        <>
          <div>
            <button onClick={()=>setPage(oldPage=> Math.max(oldPage - 1,1))} disabled={page===1}>Previous Page</button>
            <span>{page}</span>
            <button onClick={()=>setPage(oldPage=>(!latestData || !latestData.next ? oldPage : oldPage + 1))} disabled={!latestData || !latestData.next}>Next Page</button>
            {resolvedData.results.map(planet=> <Planet key={planet.name} planet={planet} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Planets;
