export default function UsersLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="d-sm-flex flex-column mb-4 position-relative">
        <h1 className="h3 mb-2 text-gray-800">Sales</h1>
        {children}
      </div>
    </section>
  );
}
