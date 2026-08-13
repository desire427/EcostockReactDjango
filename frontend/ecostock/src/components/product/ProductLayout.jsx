import Sidebar from '../sidebar/sidebar.jsx'

function ProductLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  )
}

export default ProductLayout
