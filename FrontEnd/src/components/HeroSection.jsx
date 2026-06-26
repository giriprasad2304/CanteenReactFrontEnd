import "../styles/HeroSection.css";
import { FaUtensils } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { FaBreadSlice } from "react-icons/fa6";
import { FaIceCream } from "react-icons/fa";

const HeroSection = () => {
  return (
    <>
      <section className="Hero_Section_Background">
        <div className="hero-section text-center">
          <h1 className="hero-heading">
            Fuel Up Your Cravings With{" "}
            <span className="highlight">Fresh, Fast & Flavorful</span> Meals
          </h1>
          <p className="hero-subtitle">
            Skip the queue. Order premium meals from CraveCanteen and have them
            ready when you arrive.
          </p>
          <div className="col-lg-6 mx-auto">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center input_group">
              <input
                type="text"
                className="form-control input_search_box"
                placeholder="Search Your Favorite Food"
              />
              <button
                type="button"
                className="btn btn-lg px-4 gap-3 input_search_btn"
              >
                Find Food
              </button>
            </div>
          </div>


        </div>
      </section>

      <section className="Category_Browse">
        <div className="section_name">
          <h1>Browse Category</h1>
          <p>Explore our diverse culinary offerings</p>
        </div>
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <a href="#" className="MenuCard_Browse">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaUtensils />
                    </h5>
                    <p className="card-text">Main Course</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-6 col-md-3">
              <a href="#" className="MenuCard_Browse">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <GiHotMeal />
                    </h5>
                    <p className="card-text">Starters</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-6 col-md-3">
              <a href="#" className="MenuCard_Browse">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaBreadSlice />
                    </h5>
                    <p className="card-text">Breakfast</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-6 col-md-3">
              <a href="#" className="MenuCard_Browse">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaIceCream />
                    </h5>
                    <p className="card-text">Desserts</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="Trending_items">
        <div className="section_name">
          <h1>Our Special Items</h1>
          <p>Handpicked favorites from our kitchen</p>
        </div>

        <div className="Special_items_list">
          <div className="card Special_items_card">
            <img src="..." className="card-img-top" alt="Special item" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div>
          </div>

          <div className="card Special_items_card">
            <img src="..." className="card-img-top" alt="Special item" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div>
          </div>

          <div className="card Special_items_card">
            <img src="..." className="card-img-top" alt="Special item" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div>
          </div>

          <div className="card Special_items_card">
            <img src="..." className="card-img-top" alt="Special item" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
