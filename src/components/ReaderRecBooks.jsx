export const ReaderRecBooks = ({group, idx}) => {

  console.log("group", group)
  return (
    <li key={idx}>
      <span>{idx}.</span>{" "}
      <span>{group?.loanGrp.age}</span>
      <span>{group?.loanGrp.genger}</span>
    </li>
  )
}