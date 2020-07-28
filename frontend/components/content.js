import Logo from './logo'
import Menu from './menu'

export default function Content({ defaultKey = 'home', openKey, children }) {
  return (
    <div className="container mx-auto grid grid-cols-4 gap-1">
      <div className="col-span-1 pt-16 pl-16">
        <Logo />
        <Menu defaultKey={defaultKey} openKey={openKey} />
      </div>
      <div className="col-span-3 pt-16 pr-16">
        {children}
      </div>
    </div>
  )
}
