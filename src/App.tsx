import UserFilter from "./components/UserFilter"
import UserTable from "./components/UsersTable"

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management Assignment</h1>
      <UserFilter />
      <UserTable />
    </div>
  )
}

export default App;
