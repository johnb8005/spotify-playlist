function Layout({ children }: { children: any }) {
  return (
    <div className=" flex-fill bg-gray-900 text-white h-screen">
      <main className="">
        <div className="container">{children} </div>
      </main>
    </div>
  );
}
export default Layout;
