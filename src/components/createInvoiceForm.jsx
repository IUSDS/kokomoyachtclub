import React,{useState} from 'react'

const CreateInvoiceForm = () => {
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSuccessMessage(true);
  
      setTimeout(() => {
        setSuccessMessage(false);
        setUsername('');
        setAmount('');
      }, 3000);
    };
  
    const handleCancel = () => {
      setUsername('');
      setAmount('');
      setSuccessMessage(false);
    };
  
    return (
      <div className="max-w-xl md:mx-10 text-black mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          Create Invoice{' '}
          {successMessage && (
            <span className="ml-4 text-green-500 text-sm font-medium">
              ✓ Successfully Created
            </span>
          )}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
  
          <div className="flex flex-col space-y-1">
            <label className="font-medium">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
  
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-1 text-black border-black border rounded-md hover:bg-gray-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-1 text-black border-black border rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };
  

export default CreateInvoiceForm