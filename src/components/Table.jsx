export default function Table (props) {
  return (
    <table>
      <thead>
        <tr>{props.head}</tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
}
