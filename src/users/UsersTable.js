import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";



export default function Get() {
    const [data, setData] = useState([]);
    const [modalActive, setModalActive] = useState(false)
    const [idModal, setIdModal] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

        (async () => {
            try {
                let data = await axios.get('https://jsonplaceholder.typicode.com/posts')
                setData(data.data)

            } catch (e) {
                console.log(e)
            }

        })()
    }, []);



    async function deletePost(id) {
        try {

            let delet = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            if (delet.status == '200') {
                setData(data.filter((data) => data.id != id))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const arr = () => {

        return (data.map((dataI, index) => {

            return (
                <tr key={dataI.id}>
                    <td key={dataI.id}>{dataI.id}</td>
                    <td>{dataI.title}</td>
                    <td><button onClick={() => {
                        navigate(`/body/${dataI.id}`)
                    }} type="button" className="btn btn-primary">Information</button></td>
                    <td><button onClick={() => {
                        setIdModal(dataI.id)
                        setModalActive(true)
                    }} type="button" className="btn btn-outline-dark">Delete</button></td>
                </tr>

            )
        })
        )
    }

    return (
        <>

            <div className="divTable">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr()}

                    </tbody>
                </table>
            </div>
            <Modal modalActive={modalActive} setModalActive={() => setModalActive(false)} deletePost={deletePost} data={data} id={idModal} />
        </>
    )
}