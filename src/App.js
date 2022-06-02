import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [post, setPost] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const data = await response.json();
      setData(data.slice(0, 5));
    };
    getData();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        completed: false,
        id: data.length,
        title: post,
        userId: new Date().getTime(),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Hello autoComplete!</h1>
      <input value={post} onChange={(e) => setPost(e.target.value)} />
      {data
        .filter((item) => {
          if (post === '') {
            return item;
          }
          return item.title.toLowerCase().includes(post.toLowerCase());
        })
        .map((item) => {
          return (
            <p>
              {item.id}. {item.title}
            </p>
          );
        })}
      <button onClick={handleAdd}>Submit</button>
    </div>
  );
}
