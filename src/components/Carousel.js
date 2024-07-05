import React from 'react'

export default function Carousel() {
  return (
    <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel"style={{objectFit:"contain !important"}}>

        <div className="carousel-inner " id='carousel'>
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <form className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
              <button className="btn text-white bg-success" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active" >
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG" className="d-block h-10 w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://as2.ftcdn.net/v2/jpg/04/90/19/23/1000_F_490192375_qg0In7Wbt4dh5zx18yEazvzPYydN2YOO.jpg"
                 className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://static.toiimg.com/thumb/53110049.cms?width=1200&height=800" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
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
  )
}