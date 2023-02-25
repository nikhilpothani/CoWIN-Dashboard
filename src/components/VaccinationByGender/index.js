// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const renderLast7DaysData = () => {
    const {vaccinationByGender} = props

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationByGender}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#2d87bb" />
            <Cell name="Other" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="vaccination-container">
      <h1 className="heading">Vaccination by gender</h1>
      {renderLast7DaysData()}
    </div>
  )
}

export default VaccinationCoverage
