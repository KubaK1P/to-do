function NavButton({children, text}) {
    return (
        <button className="navButton">
        {children}
        {text}
        </button>

    );
}

export default NavButton;