// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const renderLast7DaysData = () => {
    const {vaccinationByAge} = props

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
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
      <h1 className="heading">Vaccination by age</h1>
      {renderLast7DaysData()}
    </div>
  )
}

export default VaccinationCoverage
