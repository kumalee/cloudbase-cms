import Link from 'next/link';
import '../../assets/layout-user.less';

const UserLayout = props => {
  const {
    children,
  } = props;
  return (
      <div className="container">
        <div className="content">
          <div className="top">
            <div className="header">
              <Link href="/">
                <img alt="logo" className="logo" src="/assets/logo.svg" />
              </Link>
              <span className="title">Li<span className="title-symbol">x</span>He Studio</span>
            </div>
            <div className="desc">专注于快捷建站，包括博客，企业门户网站，个人网站等。</div>
          </div>
          {children}
        </div>
      </div>
  );
};

export default UserLayout;
