// Write your code here
// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getCovidData()
  }

  getUpdatedLast7DaysData = data => ({
    vaccineDate: data.vaccine_date,
    dose1: data.dose_1,
    dose2: data.dose_2,
  })

  getCovidData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinationDataApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedLast7DaysData = data.last_7_days_vaccination.map(eachData =>
        this.getUpdatedLast7DaysData(eachData),
      )
      this.setState({
        last7DaysVaccination: updatedLast7DaysData,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCovidData = () => {
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state

    return (
      <div>
        <div className="card-container">
          <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        </div>
        <div className="card-container">
          <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        </div>
        <div className="card-container">
          <VaccinationByAge vaccinationByAge={vaccinationByAge} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" width={80} height={50} />
    </div>
  )

  renderCovidDataPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <div className="logo-container">
              <img
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
              />
              <p className="logo-text">Co-WIN</p>
            </div>
            <h1 className="main-heading">CoWIN Vaccination in India</h1>
          </div>
          {this.renderCovidDataPage()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
