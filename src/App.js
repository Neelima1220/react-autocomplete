import React, { useEffect, useState } from 'react';
// import { debounce } from 'loadash';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [post, setPost] = useState('');
  const [resfound, setResfound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  // const getData = async () => {
  //   setIsLoading(true);
  //   const response = await fetch('https://restcountries.com/v3.1/all');
  //   const data = await response.json();
  //   console.log(data);
  //   setData(data);
  //   setIsLoading(false);
  // };

  const handleChange = async (e) => {
    setPost(e.target.value);
    setIsLoading(true);
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };
  return (
    <div className="main-div">
      <input value={post} onChange={handleChange} className="input" />
      {!isLoading ? (
        <div className="suggest-countries">
          <ul
            style={{
              listStyleType: 'none',
              paddingLeft: '0px',
            }}
          >
            {data
              .filter((item) => {
                if (post === '') {
                  return item;
                }
                if (
                  item.name.official.toLowerCase().includes(post.toLowerCase())
                ) {
                  return <p>'not found'</p>;
                }
                return item.name.official
                  .toLowerCase()
                  .includes(post.toLowerCase());
              })
              .map((item) => {
                return <li>{item.name.official} </li>;
              })}
          </ul>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

{
  /* <button onClick={handleAdd}>Submit</button> */
}

// const handleAdd = (e) => {
//   e.preventDefault();
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//       completed: false,
//       id: data.length,
//       title: post,
//       userId: new Date().getTime(),
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then((response) => response.json())
//     .then((res) => console.log(res));
// };
