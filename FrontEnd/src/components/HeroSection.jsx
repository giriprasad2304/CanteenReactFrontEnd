import '../styles/HeroSection.css'

const HeroSection = () => {
    return (
      <div className="hero-section">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Fuel Up Your Cravings With Fresh, Fast, and Flavorful Meals 
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Skip the queue. Order premium meals from CraveCanteen and have them ready when you arrive
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center input_group">
              <input type="text" className="form-control input_search_box" placeholder="Search Your Favorite Food" />
              <button type="button" className="btn btn-primary btn-lg px-4 gap-3 input_search_btn">
                Find Food
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
export default HeroSection;