import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


export default function Body() {
  const { id } = useParams();
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      try {
        let data = await axios.get(`https://dummyjson.com/products/${id}`)
        setData(data.data)
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
              <h1>{data.id}</h1>
              <span>{data.brand}</span>
              <p className="h2">{data.title}</p>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mx-auto">
            <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
              <img className="imgData" src={data.thumbnail} />
              <p className="mb-0 mt-2 font-italic">{data.description}</p>

              <footer className="blockquote-footer pt-4 mt-4 border-top">
                {data.category}
              </footer>

            </blockquote>
            <Link to='/'>Home</Link>
          </div>
        </div>
      </div>

    </section>

  )



}