import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Card from '../components/Card'
import Footer from '../components/Footer'

export default function Home() {


  const [search, setSearch] = useState('')

  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });


    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };



  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className = "bg-dark">
      <div> <Nav /></div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

          <div className="carousel-inner " id='carousel'>


            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-success" type="submit">Search</button>
              </div>
            </div>
            <div className="carousel-item" >
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG" className="d-block h-30 w-100  " style={{ filter: "brightness(50%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://as2.ftcdn.net/v2/jpg/04/90/19/23/1000_F_490192375_qg0In7Wbt4dh5zx18yEazvzPYydN2YOO.jpg"
                className="d-block h-10 w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
            </div>
            <div className="carousel-item active">
              <img src="https://static.toiimg.com/thumb/53110049.cms?width=1200&height=800" className="d-block h-30 w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

        </div>
      </div>
      <div className='container'>
        {
          foodCat && foodCat.length > 0 && foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className="fs-3 m-3 white-label">{data.CategoryName}</div>
              <hr/>
              {
                foodItems && foodItems.length > 0
                && foodItems.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((filterItems) => (

                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 white-label'>

                      <Card foodItem={filterItems}
                        foodName={filterItems.name}
                        item={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              }
            </div>
          ))
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}





