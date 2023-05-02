export default
function Input (props) {
  const { label, name, ...rest } = props

  return (
    <label> {label || name}
      <input
        name={name}
        {...rest}
      />
    </label>
  )
}
