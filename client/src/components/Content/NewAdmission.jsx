// NewAdmission.jsx
import React, { useState } from "react";
import api from "../../utils/api";

const initialUser = {
  image: null,
  Fname: "",
  Mname: "",
  Lname: "",
  email: "",
  phno: "",
  bg: "",
  dob: "",
  gender: "",
  TempState: "",
  TempDist: "",
  TempMun: "",
  TempAddress: "",
  TempTol: "",
  PerState: "",
  PerDist: "",
  PerMun: "",
  PerAddress: "",
  PerTol: "",
  doctype: "",
  docno: "",
  IssueDistrict: "",
  IssueDate: "",
  docfile: null,
  marrital: "",
  Huswifname: "",
  famphno: "",
  famdocfile: null,
  mothname: "",
  mothphno: "",
  mothdocfile: null,
  fathname: "",
  fathphno: "",
  fathdocfile: null,
  grandfathname: "",
  grandfathno: "",
  grandfathdocfile: null,
  edu: "",
  termsaggree: false,
};

export default function NewAdmission() {
  const [user, setUser] = useState({ ...initialUser });
  const [temppicUrl, setTemppicUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  // Generic input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((u) => ({ ...u, [name]: type === "checkbox" ? checked : value }));
  };

  // File inputs (any file)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUser((u) => ({ ...u, [name]: file }));

    // if it's the profile image input, make preview
    if (name === "image") {
      const url = URL.createObjectURL(file);
      setTemppicUrl(url);
    }
  };

  // Validate basic fields
  const validate = () => {
    const errs = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{7,15}$/; // allow 7-15 digits (flexible)

    // required small set - adapt as needed
    const required = [
      "Fname",
      "Lname",
      "email",
      "phno",
      "dob",
      "gender",
      "TempState",
      "TempDist",
      "TempMun",
      "TempAddress",
      "TempTol",
      "PerState",
      "PerDist",
      "PerMun",
      "PerAddress",
      "PerTol",
      "doctype",
      "docno",
      "IssueDistrict",
      "IssueDate",
      "docfile",
      "marrital",
      "fathname",
      "grandfathname",
      "edu",
      "termsaggree",
    ];

    required.forEach((k) => {
      const val = user[k];
      if (val === null || val === undefined || val === "" || val === false) {
        errs.push(`${k} is required`);
      }
    });

    if (user.email && !emailPattern.test(user.email)) {
      errs.push("Email is not valid");
    }

    if (user.phno && !phonePattern.test(String(user.phno))) {
      errs.push("Phone number is not valid (7-15 digits)");
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Build FormData
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      const val = user[key];
      if (val === null || val === undefined || val === "") return;
      // if file, append file; else append value
      if (val instanceof File) {
        formData.append(key, val, val.name);
      } else {
        formData.append(key, val);
      }
    });

    try {
      setSubmitting(true);
      const response = await api.post("/api/newadmission", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // success handling: reset form and preview
      setUser({ ...initialUser });
      setTemppicUrl(null);
      setErrors([]);
      alert("Admission created successfully.");
    } catch (err) {
      console.error(err);
      setErrors(["Server error while submitting."]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#212528] rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">New Admission</h2>
          <div className="text-sm text-red-600">Fields marked with * are required</div>
        </header>

        {/* errors */}
        {errors.length > 0 && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3">
            <ul className="text-sm text-red-700 dark:text-red-200 space-y-1">
              {errors.map((er, i) => (
                <li key={i}>• {er}</li>
              ))}
            </ul>
          </div>
        )}

        {/* layout: two columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* left: main form fields (span 8 on md) */}
          <div className="md:col-span-8 space-y-6">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input name="Fname" value={user.Fname} onChange={handleChange} required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Middle Name
                </label>
                <input name="Mname" value={user.Mname} onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input name="Lname" value={user.Lname} onChange={handleChange} required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email <span className="text-red-600">*</span></label>
                <input type="email" name="email" value={user.email} onChange={handleChange} required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone <span className="text-red-600">*</span></label>
                <input type="tel" name="phno" value={user.phno} onChange={handleChange} required
                  placeholder="digits only"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Blood Group</label>
                <select name="bg" value={user.bg} onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {/* dob + gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Date of Birth <span className="text-red-600">*</span></label>
                <input type="date" name="dob" value={user.dob} onChange={handleChange} required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Gender <span className="text-red-600">*</span></label>
                <select name="gender" value={user.gender} onChange={handleChange} required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <option value="">Choose</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Temporary Address */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Temporary Address <span className="text-red-600">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input name="TempState" value={user.TempState} onChange={handleChange} placeholder="State" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="TempDist" value={user.TempDist} onChange={handleChange} placeholder="District" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="TempMun" value={user.TempMun} onChange={handleChange} placeholder="Sub/Metropolitan" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="TempAddress" value={user.TempAddress} onChange={handleChange} placeholder="Ward No" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="TempTol" value={user.TempTol} onChange={handleChange} placeholder="Tol" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
              </div>
            </section>

            {/* Permanent Address */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Permanent Address <span className="text-red-600">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input name="PerState" value={user.PerState} onChange={handleChange} placeholder="State" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="PerDist" value={user.PerDist} onChange={handleChange} placeholder="District" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="PerMun" value={user.PerMun} onChange={handleChange} placeholder="Sub/Metropolitan" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="PerAddress" value={user.PerAddress} onChange={handleChange} placeholder="Ward No" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="PerTol" value={user.PerTol} onChange={handleChange} placeholder="Tol" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
              </div>
            </section>

            {/* Document info */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Document Information <span className="text-red-600">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <select name="doctype" value={user.doctype} onChange={handleChange} required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <option value="">Select document type</option>
                  <option value="Citizenship">Citizenship</option>
                  <option value="Passport">Passport</option>
                </select>

                <input name="docno" value={user.docno} onChange={handleChange} placeholder="Document no" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="IssueDistrict" value={user.IssueDistrict} onChange={handleChange} placeholder="Issued district" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                <input name="IssueDate" type="date" value={user.IssueDate} onChange={handleChange} required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Upload Document (citizenship / passport) <span className="text-red-600">*</span></label>
                <input type="file" name="docfile" accept="image/*,application/pdf" onChange={handleFileChange} required />
                {user.docfile && <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">{user.docfile.name}</div>}
              </div>
            </section>

            {/* Family details */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Family Details <span className="text-red-600">*</span></h3>

              {/* spouse */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Husband / Wife</label>
                  <input name="Huswifname" value={user.Huswifname} onChange={handleChange} placeholder="Full name" className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Phone</label>
                  <input name="famphno" value={user.famphno} onChange={handleChange} placeholder="Phone" className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Upload Citizenship</label>
                  <input type="file" name="famdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                  {user.famdocfile && <div className="text-xs mt-1">{user.famdocfile.name}</div>}
                </div>
              </div>

              {/* mother */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Mother Name</label>
                  <input name="mothname" value={user.mothname} onChange={handleChange} placeholder="Full name" className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Phone</label>
                  <input name="mothphno" value={user.mothphno} onChange={handleChange} placeholder="Phone" className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Upload Citizenship</label>
                  <input type="file" name="mothdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                  {user.mothdocfile && <div className="text-xs mt-1">{user.mothdocfile.name}</div>}
                </div>
              </div>

              {/* father */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Father Name <span className="text-red-600">*</span></label>
                  <input name="fathname" value={user.fathname} onChange={handleChange} placeholder="Full name" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Phone</label>
                  <input name="fathphno" value={user.fathphno} onChange={handleChange} placeholder="Phone" className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Upload Citizenship</label>
                  <input type="file" name="fathdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                  {user.fathdocfile && <div className="text-xs mt-1">{user.fathdocfile.name}</div>}
                </div>
              </div>

              {/* grandfather */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Grandfather Name <span className="text-red-600">*</span></label>
                  <input name="grandfathname" value={user.grandfathname} onChange={handleChange} placeholder="Full name" required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Phone</label>
                  <input name="grandfathno" value={user.grandfathno} onChange={handleChange} placeholder="Phone" className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-200">Upload Citizenship</label>
                  <input type="file" name="grandfathdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                  {user.grandfathdocfile && <div className="text-xs mt-1">{user.grandfathdocfile.name}</div>}
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-md font-medium dark:text-white">Educational Details <span className="text-red-600">*</span></h3>
              <div className="mt-2">
                <select name="edu" value={user.edu} onChange={handleChange} required className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <option value="">Select highest qualification</option>
                  <option value="No">No formal education</option>
                  <option value="5">Grade 5</option>
                  <option value="8">Grade 8</option>
                  <option value="SLC">SLC</option>
                  <option value="+2">+2</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                </select>
              </div>
            </section>

            {/* terms */}
            <div className="flex items-start gap-3 mt-4">
              <input id="terms" name="termsaggree" type="checkbox" checked={user.termsaggree} onChange={handleChange} className="mt-1" required />
              <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                I agree with the <a className="text-blue-600" href="#">terms and conditions</a>.
              </label>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" disabled={submitting}
                className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
                {submitting ? "Submitting..." : "Register new account"}
              </button>
            </div>
          </div>

          {/* right: photo & quick meta (span 4) */}
          <aside className="md:col-span-4 space-y-6">
            <div className="sticky top-6">
              <div className="flex flex-col items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={
                      temppicUrl ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full text-center">
                  <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Upload Profile Photo</label>
                  <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="w-full text-left mt-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Quick info</div>
                  <div className="text-sm dark:text-white mt-2">
                    <div><strong>Name:</strong> {user.Fname} {user.Lname}</div>
                    <div><strong>Phone:</strong> {user.phno}</div>
                    <div><strong>Document:</strong> {user.docno || "-"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium dark:text-white">Uploaded files</h4>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {["docfile", "famdocfile", "mothdocfile", "fathdocfile", "grandfathdocfile"].map((k) => (
                    <li key={k}>
                      <span className="font-medium">{k}:</span>{" "}
                      {user[k] ? user[k].name : <span className="text-gray-400">none</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
