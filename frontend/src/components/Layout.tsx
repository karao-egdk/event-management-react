function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="container min-h-screen mx-auto flex flex-col gap-5 py-10 px-2">
            {children}
        </section>
    );
}

export default Layout;
