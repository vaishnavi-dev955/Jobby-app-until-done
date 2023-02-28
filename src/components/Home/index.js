import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="main-container">
    <Header />
    <div className="Home-container">
      <h1 className="Home-heading">
        Find The Job That Fits
        <br />
        Your Life
      </h1>
      <p className="Home-paragraph">
        Millions of people are searching for
        <br />
        jobs, salary information, company
        <br />
        reviews. Find the job that fits <br />
        your abilities and potential
      </p>
      <button type="button" className="Find-jobs-button">
        Find Jobs
      </button>
    </div>
  </div>
)

export default Home
