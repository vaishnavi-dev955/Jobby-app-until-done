import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10  LPA  and  above',
  },
  {
    salaryRangeId: '2000000',
    label: '20  LPA  and  above',
  },
  {
    salaryRangeId: '3000000',
    label: '30  LPA  and  above',
  },
  {
    salaryRangeId: '4000000',
    label: '40  LPA  and  above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    activeCheckBoxList: [],
    profileData: {},
    searchInput: '',
    salaryRangeId: '',
    apiStatus: apiConstants.initial,
    jobsData: [],
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobs()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const ApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(ApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileData: UpdatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  getJobs = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeCheckBoxList, searchInput, salaryRangeId} = this.state
    const type = activeCheckBoxList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const Options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, Options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedJobsData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobsData: UpdatedJobsData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  onUpdatingEmploymentTypeId = employmentId => {
    const {activeCheckBoxList} = this.state
    if (activeCheckBoxList.includes(employmentId)) {
      const UpdatedList = activeCheckBoxList.filter(
        eachItem => eachItem !== employmentId,
      )
      this.setState({activeCheckBoxList: UpdatedList}, this.getJobs)
    } else {
      this.setState(
        prevState => ({
          activeCheckBoxList: [...prevState.activeCheckBoxList, employmentId],
        }),
        this.getJobs,
      )
    }
  }

  onSalaryRangeId = salaryId => {
    this.setState({salaryRangeId: salaryId}, this.getJobs)
  }

  onChangeEvent = event => {
    this.setState({searchInput: event.target.value}, this.getJobs)
  }

  onSuccessProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="Profile-view">
        <img
          src={profileImageUrl}
          alt="profile logo"
          className="profile-style"
        />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  onFailureProfileView = () => (
    <button
      className="retry-button"
      type="button"
      onClick={this.onClickRetryButton}
    >
      Retry
    </button>
  )

  onClickRetryButton = () => {
    this.getProfileData()
  }

  onProgressLoaderView = () => {
    ;<div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  }

  onSuccessJobsView = () => {
    const {jobsData} = this.state
    return (
      <div>
        <ul>
          {jobsData.map(eachItem => (
            <JobItem JobItemDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  onFilteringJobs = () => {
    const {jobsData, searchInput} = this.state
    const FilteredJobs = jobsData.filter(eachItem =>
      eachItem.title.includes(searchInput.toLowerCase()),
    )
    this.setState({jobsData: FilteredJobs})
  }

  renderingProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.onSuccessProfileView()
      case apiConstants.failure:
        return this.onFailureProfileView()
      case apiConstants.inProgress:
        return this.onProgressLoaderView()
      default:
        return null
    }
  }

  onFailJobsView = () => (
    <>
      <div className="failure-img-button-container">
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-paragraph">
          we cannot seem to find the page you are looking for
        </p>
        <div className="jobs-failure-button-container">
          <button
            className="retry-button"
            type="button"
            onClick={this.onRetryJobs}
          >
            retry
          </button>
        </div>
      </div>
    </>
  )

  onRetryJobs = () => {
    this.getJobs()
  }

  renderingJobsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.onSuccessJobsView()
      case apiConstants.failure:
        return this.ononFailJobsView()
      case apiConstants.inProgress:
        return this.onProgressLoaderView()
      default:
        return null
    }
  }

  render() {
    const {
      activeCheckBoxList,
      searchInput,
      salaryRangeId,
      jobsData,
    } = this.state
    console.log(`salaryRangeId is ${salaryRangeId}`)
    console.log(activeCheckBoxList)
    console.log(jobsData)
    return (
      <div className="overall-container-jobs">
        <Header />
        <div className="Medium-view">
          <div className="container1">
            {this.renderingProfileView()}
            <hr className="hr-style" />
            <h1 className="Element-Type">Type of Employment</h1>
            <ul>
              {employmentTypesList.map(eachItem => (
                <EmploymentTypeItem
                  EmploymentTypeItemData={eachItem}
                  key={eachItem.employmentTypeId}
                  onUpdatingEmploymentTypeId={this.onUpdatingEmploymentTypeId}
                />
              ))}
            </ul>
            <hr className="hr-style" />
            <h1 className="Element-Type">Salary Range</h1>
            <ul>
              {salaryRangesList.map(eachItem => (
                <SalaryRangeItem
                  SalaryRangeItemData={eachItem}
                  key={eachItem.salaryRangeId}
                  onSalaryRangeId={this.onSalaryRangeId}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className="Input-container1">
              <input
                type="search"
                className="input-style4"
                placeholder="Search"
                onChange={this.onChangeEvent}
                value={searchInput}
              />
              <div className="search-container3">
                <button
                  type="button"
                  data-testid="searchButton"
                  className="Search-button-list"
                  onClick={this.onFilteringJobs}
                >
                  <BsSearch className="search-logo2" />
                </button>
              </div>
            </div>
            {this.renderingJobsViews()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
