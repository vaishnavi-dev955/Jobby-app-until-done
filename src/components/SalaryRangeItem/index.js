import './index.css'

const SalaryRangeItem = props => {
  const {SalaryRangeItemData, onSalaryRangeId} = props
  const {label, salaryRangeId} = SalaryRangeItemData

  const onChangeSalaryId = event => {
    onSalaryRangeId(event.target.id)
  }
  return (
    <li>
      <input
        type="radio"
        id={salaryRangeId}
        className="input-style2"
        onChange={onChangeSalaryId}
      />
      <label htmlFor={salaryRangeId} className="description2">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
