import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import Pagination from "./Pagination";
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table'
import { Dropdown } from "bootstrap";

const tableHeaders = ['id','title', 'brand']

export default function Get() {
    
    const [data, setData] = useState([]);
    const [modalActive, setModalActive] = useState(false)
    const [idModal, setIdModal] = useState('')
    // const [dataPage, setDataPage] = useState(1)
    const [limit,setLimita] = useState(0)
    const [query, setQuery] = useState('')
    const [pageLimit, setPageLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [newData, setNewData] = useState(null)

    const [addData, setAddData] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {

        getProducts()
        
    }, [pageLimit,skip]);

    const getProducts = async () => {
        try {
            let data = await axios.get(`https://dummyjson.com/products?limit=${+pageLimit}&skip=${skip}`)
            console.log(data)
            if(data.data.products.length != 0 ){
                setData(data.data.products)
                
            }
            setLimita(data.data.limit)
            
            

        } catch (e) {
            console.log(e)
        }
    }

    // const lastCountryIndex = dataPage * countData
    // const firstCountryIndex = lastCountryIndex - countData
    // const currentCountry = data.slice(firstCountryIndex, lastCountryIndex)

    // const paginate = pogeNumber => setDataPage(pogeNumber)

    async function deletePost(id) {
        try {

            let delet = await axios.delete(`https://dummyjson.com/products/${id}`)
            if (delet.status == '200') {
                toast.success('Delete Post!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                setData(data.filter((data) => data.id != id))
            }
        } catch (e) {
            console.log(e)
        }
    } 
   


       
    async function addPost(){
        try{
            let add = await axios.post('https://dummyjson.com/products/add',
        {
            title: addData.title,
            brand: addData.brand
        })
            if(add.status == '200'){
                toast.success('Wow so easy!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            
                setData([
                    ...data,
                    {
                        ...data,
                        title : addData.title,
                        brand: addData.brand,
                    }
                ])
            }
            
        }catch(e){
            console.log(e)
        }
        
    }


    async function editPost(id) {
        try {
            let edit = await axios.put(`https://dummyjson.com/products/${id}`,
                {
                    title: newData.title,
                    brand: newData.brand
                }
            )


            if (edit.status == '200') {
                toast.success('Edit Post!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                setData((prev) => {
                    const newState = prev.map(obj => {
                        if (obj.id == id) {
                            obj.isEdit = false
                            return { ...obj, title: newData.title, brand: newData.brand }
                        }
                        return obj
                    })

                    return newState
                })
            }
        } catch (e) {
            console.log(e)
        }
    }


    function editTable(id, status) {
     
        setData(data.map(e => {
            if(e.id == id){
              e.isEdit = status
              
            }
            return e
        }))
        
    }



    const handleChange = (e) => {

        const { name, value } = e.target;
      
        setNewData((prev) => {
            return { ...prev, [name]: value }
        })
    }



   const addChange = (e)=> {
    const {name,value} = e.target
    setAddData((prev)=>{
        return {...prev,[name]:value}
    })
   }

   
//    console.log(currentCountry.filter((search) =>
//    search.brand.toLowerCase().includes(query)

//    ))
let SearchData = data.filter((search) =>
    search.brand.toLowerCase().includes(query))
    
    const ThData = ()=> {
       
            return tableHeaders.map((data) => {
                return <th className="th" key={data}>{data}</th>
            })
        
    }
    


    const Arr = () => {
        
            return (SearchData.map((dataI, index) => {
                

                return (
                    <tr key={dataI.id}>
                        { 
                        dataI.isEdit != true ?
                        <>
                            {
                                tableHeaders.map((v)=>{
                                    return <td key={v}>{dataI[v]}</td>
                                })
                            }
                                   
                             <td>   
                                
                                <button onClick={() => {
                                    navigate(`/body/${dataI.id}`)
                                }} className="btn"><i className="bi bi-eye"></i></button>
                                <button onClick={() => editTable(dataI.id, true)} className="btn"><i className="bi bi-pencil-square"></i></button>
                                <button onClick={() => {
                                    setIdModal(dataI.id)
                                    setModalActive(true)
                                }} className="btn"><i className="bi bi-trash3"></i></button>
                            </td>
                            </> 
                            :
                            <>
                                <td>{dataI.id}</td>
                                <td>
                                    {/* <img src={dataI.thumbnail} style={{ width: 55, height: 55 }} /> */}
                                    <input defaultValue={dataI.title} type='text' name='title' onChange={handleChange} />
                                </td>
                                <td>
                                    <input defaultValue={dataI.brand} onChange={handleChange} type='text' name='brand' />
                                </td>           
                                <td>
                                    <button className="btn" onClick={()=>{editPost(dataI.id)}} type="submit"><i className="bi bi-check2"></i></button>
                                    <button className="btn" onClick={()=> editTable(dataI.id, false)}><i className="bi bi-x-lg"></i></button>
                                </td>
                            </>
                        }
                    </tr>
                )
        })
    )
        
       
    }
    
        

    
    return (
        <>
            <div className="divHeader">
                <h1 className="h1Header">Total number of goods - {data.length}</h1>
            </div>
            <div className="add">
                <input type='text' placeholder="Title" name='title' onChange={addChange} />
                <input type='text' placeholder="Brand" name='brand' onChange={addChange} />
                <button type="button" onClick={addPost} className="btn btn-primary">Add Post</button> 
            </div>
            <input type='text'  onChange={e => setTimeout(()=>{
                setPageLimit(e.target.value)
            },2000) }/>
            <input type='text' placeholder="Search..." className="search" onChange={e => setQuery(e.target.value)} />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <Table bordered hover size="xs">

                            <thead>
                                <tr>
                                    {ThData()}
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                  {Arr()}  
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            
            <Modal
              modalActive={modalActive}
              setModalActive={() => setModalActive(false)}
              deletePost={deletePost}
              data={data} id={idModal}
            />
            <Pagination
                // countData={countData}
                setPageLimit={setPageLimit}
                setSkip={setSkip}
                limit={limit}
                skip={skip}
                pageLimit={+pageLimit}
                totalCountries={data.length}
                // paginate={paginate}
            />
        </>
    )
}








//------------------------------------------------------------------------------------------------------------------------------------------




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Modal from "../modal/modal";
// import Pagination from "./Pagination";
// import { toast } from 'react-toastify';


// const tableHeaders = ['id','title', 'brand', 'action']

// export default function Get() {
    
//     const [data, setData] = useState([]);
//     const [modalActive, setModalActive] = useState(false)
//     const [idModal, setIdModal] = useState('')
//     const [dataPage, setDataPage] = useState(1)
//     const countData = 8
//     const [query, setQuery] = useState('')
   
//     const [newData, setNewData] = useState(null)

//     const [addData, setAddData] = useState(null)
//     const navigate = useNavigate()


//     useEffect(() => {

//         getProducts()
//     }, []);

//     const getProducts = async () => {
//         try {
//             let data = await axios.get('https://dummyjson.com/products')

//             setData(data.data.products)

//         } catch (e) {
//             console.log(e)
//         }
//     }

//     const lastCountryIndex = dataPage * countData
//     const firstCountryIndex = lastCountryIndex - countData
//     const currentCountry = data.slice(firstCountryIndex, lastCountryIndex)

//     const paginate = pogeNumber => setDataPage(pogeNumber)

//     async function deletePost(id) {
//         try {

//             let delet = await axios.delete(`https://dummyjson.com/products/${id}`)
//             if (delet.status == '200') {
//                 setData(data.filter((data) => data.id != id))
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     } 
//        console.log(addData)


       
//     async function addPost(){
//         try{
//             let add = await axios.post('https://dummyjson.com/products/add',
//         {
//             title: addData.title,
//             brand: addData.brand
//         })
//             if(add.status == '200'){
//                 toast("Wow so easy!")
//                 console.log('kpav',add)
//                 setData([
//                     ...data,
//                     {
//                         ...data,
//                         title : addData.title,
//                         brand: addData.brand,
//                     }
//                 ])
//             }
            
        
//         }catch(e){
//             console.log(e)
//         }
        
//     }


//     async function editPost(id) {
//         try{
//             let edit = await axios.put(`https://dummyjson.com/products/${id}`,
//                         {
//                             title: newData.title,
//                             brand: newData.brand
//                         }
//                     )
                    
                    
//                     if(edit.status == '200'){
                  
                   
//                     setData((prev) => {
//                         const newState = prev.map(obj => {
//                             if(obj.id == id) {
//                                 obj.isEdit = false
//                                 return {...obj, title : newData.title, brand : newData.brand } 
//                             }   
//                            return obj
//                         })

                        

//                         return newState
//                     })

                 
                  
//                     }
//         } catch(e){
//             console.log(e)
//         }
//     }


//     function editTable(id) {
//         console.log('sdfdsf', id)
//         //setUpdateState(i)
//         setData(data.map(e => {
//             if(e.id == id){
//               e.isEdit = true
              
//             }
//             return e
//         }))
        
//     }



//     const handleChange = (e) => {

//         const { name, value } = e.target;
//         console.log(value)
//         setNewData((prev) => {
//             return { ...prev, [name]: value }
//         })
//     }



//    const addChange = (e)=> {
//     const {name,value} = e.target
//     setAddData((prev)=>{
//         return {...prev,[name]:value}
//     })
//    }




//     const arr = () => {
//         return (currentCountry.filter((search) =>
//             search.brand.toLowerCase().includes(query)

//         ).map((dataI, index) => {
//                 //sxal a poxel
//             return (
//                 <tr key={dataI.id}>
//                     <td>{dataI.id}</td>
//                     {dataI.isEdit != true ?
//                         <td>
//                             <img src={dataI.thumbnail} style={{ width: 55, height: 55 }} />
//                             {dataI.title}
//                         </td> :
//                         <td>
//                             <img src={dataI.thumbnail} style={{ width: 55, height: 55 }} />
//                             <input defaultValue={dataI.title} type='text' name='title' onChange={handleChange} />
//                         </td>}
//                     {dataI.isEdit != true ?
//                         <td>{dataI.brand}</td> :
//                         <td>
//                             <input defaultValue={dataI.brand} onChange={handleChange} type='text' name='brand' />
//                         </td>}
//                     {dataI.isEdit != true ?
//                         <td>
//                             <button onClick={() => {
//                                 navigate(`/body/${dataI.id}`)
//                             }} className="btn"><i className="bi bi-eye"></i></button>
//                             <button onClick={() => editTable(dataI.id)} className="btn"><i className="bi bi-pencil-square"></i></button>
//                             <button onClick={() => {
//                                 setIdModal(dataI.id)
//                                 setModalActive(true)
//                             }} className="btn"><i className="bi bi-trash3"></i></button>
//                         </td> :
//                         <td>
//                             <button onClick={()=>{editPost(dataI.id)}} type="submit"><i className="bi bi-check2"></i></button>
//                         </td>}
                        

//                 </tr>
//             )
//         })
//         )
//     }


    
//     return (
//         <>
//             <div className="divHeader">
//                 <h1 className="h1Header">Total number of goods - {data.length}</h1>
//             </div>
            
//             <input type='text' name='title' onChange={addChange} />
//             <input type='text' name='brand' onChange={addChange} />
//             <button type="button" onClick={addPost} className="btn btn-primary">add</button>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12">
//                         <table className="table table-bordered">

//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Title</th>
//                                     <th>Brand</th>
//                                     <th>Action</th>

//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {arr()}

//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <Modal
//               modalActive={modalActive}
//               setModalActive={() => setModalActive(false)}
//               deletePost={deletePost}
//               data={data} id={idModal}
//             />
//             <Pagination
//                 countData={countData}
//                 totalCountries={data.length}
//                 paginate={paginate}
//             />
//         </>
//     )
// }