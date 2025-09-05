type AppProps = {
  user: string; // user라는 props 추가
};

export default function Header({ user }: AppProps) {
    return (
        <header className="header">
            <div className="container header-inner">
            <div className="logo">
                {user} <span className="logo-accent primary">Class</span>
            </div>
            <nav>
                <a href="#featured">클래스</a>
                <a href="#how">이용안내</a>
                <a href="#contact">문의</a>
                <a className="btn btn-outline" href="#login">
                로그인
                </a>
            </nav>
            </div>
        </header>
    );
}