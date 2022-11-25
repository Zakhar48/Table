import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";



export default function Body() {
  const { id } = useParams();
  const [body, setBody] = useState('')
  const [name, setName] = useState('')
  const [index, setIndex] = useState('')
  useEffect(() => {
    (async () => {
      try {
        let data = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        setBody(data.data.body)
        setName(data.data.title)
        setIndex(data.data.id)
      } catch (e) {
        console.log(e)
      }

    })()


  }, []);

  return (
    <section className="py-5">

      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <header className="text-center pb-5">
              <h1>{index}</h1>
              <p className="h2">{name.toLocaleUpperCase()}</p>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mx-auto">
            <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
              <p className="mb-0 mt-2 font-italic">{body}</p>

              <footer className="blockquote-footer pt-4 mt-4 border-top">Full information

              </footer>

            </blockquote>
            <Link to='/'>Home</Link>
          </div>
        </div>
      </div>

    </section>

  )



}