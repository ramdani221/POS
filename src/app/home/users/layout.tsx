export default function UsersLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="d-sm-flex flex-column mb-4">
        <h1 className="h3 mb-2 text-gray-800">Users</h1>
        {children}
      </div>
    </section>
  );
}
