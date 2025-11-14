// import React from 'react'

// const OnBoard = () => {
//   return (
//       <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-10 relative overflow-hidden">
//       {/* STEP INDICATOR */}
//       <div className="flex justify-center gap-3 mb-6">
//         <div
//           className={`w-4 h-4 rounded-full ${
//             step === 1 ? "bg-blue-600" : "bg-gray-300"
//           }`}
//         ></div>
//         <div
//           className={`w-4 h-4 rounded-full ${
//             step === 2 ? "bg-blue-600" : "bg-gray-300"
//           }`}
//         ></div>
//       </div>

//       {/* STEP 1 */}
//       {step === 1 && (
//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold">Your Details</h2>

//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Ronit Rai"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="+91 9876543210"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Current Occupation
//             </label>
//             <input
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Student / Working Professional"
//               value={occupation}
//               onChange={(e) => setOccupation(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={handleNext}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
//           >
//             Next Step →
//           </button>
//         </div>
//       )}

//       {/* STEP 2 */}
//       {step === 2 && (
//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold">Your Referral Link</h2>
//           <p className="text-gray-600">Share this link with your friends.</p>

//           <div className="flex items-center gap-2 border px-3 py-2 rounded-md">
//             <input
//               className="w-full bg-transparent"
//               value={referralLink}
//               readOnly
//             />
//             <button
//               onClick={copyToClipboard}
//               className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               Copy
//             </button>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
//           >
//             Finish 🎉
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default OnBoard
