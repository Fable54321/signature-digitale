import { Search } from "lucide-react";

const employeeList = [
  "John Doe",
  "Jane Smith",
  "Bob Johnson",
  "Alice Williams",
  "Michael Brown",
  "Emily Davis",
  "Sarah Taylor",
  "Kevin White",
];


const Admin = () => {
  return (
    <article className="flex flex-col items-center">
        <div className="w-[min(98%,600px)] flex flex-col items-center">
      <h2 className="text-[1.9em] mt-10 font-bold font-primary text-secondary text-center">Modification aux contrats non signés.</h2>
      <p className="text-[1.2em] text-center">Sélectionnez un employé pour leuquel le contrat non signé a besoin d'ajout ou de modification.</p>
      <div className="relative">
       <select className="border-2  border-secondary mt-2 text-[1.3em]" name="employee" id="employee">
        {employeeList.map((employee, index) => (
          <option key={index} value={employee}>
            {employee}
          </option>
        ))}

        
       </select>
       <Search className="absolute right-2 top-3 text-primary" size={25} />
      </div>
      </div>
    </article>
  )
}

export default Admin
