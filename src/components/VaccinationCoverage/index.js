// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const renderLast7DaysData = () => {
    const {last7DaysVaccination} = props
    const DataFormatter = number => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`
      }
      return number.toString()
    }

    return (
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={last7DaysVaccination} margin={{top: 5}}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="vaccination-container">
      <h1 className="heading">Vaccination Coverage</h1>
      {renderLast7DaysData()}
    </div>
  )
}

export default VaccinationCoverage
