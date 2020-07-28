export default function IndexContent(props) {
  const { picture, name, desc } = props;
  return (
    <div className="">
      <img src={picture} alt="" />
      <div className="mt-4 text-sm text-right font-semibold">{name}</div>
      <div className="mt-1 text-xs text-right">{desc}</div>
    </div>
  )
}
