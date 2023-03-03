import './index.css'

const EmploymentTypeItem = props => {
  const {EmploymentTypeItemData, onUpdatingEmploymentTypeId} = props
  const {label, employmentTypeId} = EmploymentTypeItemData
  const onChangeEvent = event => {
    onUpdatingEmploymentTypeId(event.target.id)
  }
  return (
    <li>
      <input
        type="checkbox"
        className="input-style1"
        onChange={onChangeEvent}
        id={employmentTypeId}
      />

      <label className="description" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeItem
