// NewAdmission.jsx
import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import AuthContext from "../Hooks/Context/AuthContext";

const initialUser = {
  VisitorId: null,
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
  const { visittoadmiss, setvisittoadmiss } = useContext(AuthContext);

  useEffect(() => {
    if (!visittoadmiss) return;

    setUser((prev) => ({
      ...prev,
      VisitorId: visittoadmiss._id || "",
      Fname: visittoadmiss.Fname || "",
      Mname: "",
      Lname: visittoadmiss.Lname || "",
      phno: visittoadmiss.Phone || "",
      gender: visittoadmiss.Gender?.toLowerCase() || "",
      TempAddress: visittoadmiss.TempAddress || "",
      PerAddress: visittoadmiss.PermAddress || "",
      edu: visittoadmiss.EducationQualification || "",
    }));
  }, [visittoadmiss]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((u) => ({ ...u, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUser((u) => ({ ...u, [name]: file }));

    if (name === "image") {
      const url = URL.createObjectURL(file);
      setTemppicUrl(url);
    }
  };

  const validate = () => {
    const errs = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{7,15}$/;

    const requiredFields = [
      "Fname","Lname","email","phno","dob","gender",
      "TempState","TempDist","TempMun","TempAddress","TempTol",
      "PerState","PerDist","PerMun","PerAddress","PerTol",
      "doctype","docno","IssueDistrict","IssueDate","docfile",
      "marrital","fathname","grandfathname","edu","termsaggree"
    ];

    requiredFields.forEach((k) => {
      const val = user[k];
      if (val === null || val === undefined || val === "" || val === false) {
        errs.push(`${k} is required`);
      }
    });

    if (user.email && !emailPattern.test(user.email)) errs.push("Email is not valid");
    if (user.phno && !phonePattern.test(String(user.phno))) errs.push("Phone number is not valid (7-15 digits)");

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

    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      const val = user[key];
      if (val === null || val === undefined || val === "") return;
      formData.append(key, val instanceof File ? val : val);
    });

    try {
      setSubmitting(true);
      await api.post("/api/newadmission", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser({ ...initialUser });
      setTemppicUrl(null);
      setvisittoadmiss(null);
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
    <div className="w-full h-[85vh] overflow-y-auto no-scrollbar bg-white dark:bg-[#212528] rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">New Admission</h2>
          <div className="text-sm text-red-600">Fields marked with * are required</div>
        </header>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3">
            <ul className="text-sm text-red-700 dark:text-red-200 space-y-1">
              {errors.map((er, i) => (
                <li key={i}>• {er}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-6">
            {/* Personal info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><label>First Name *</label><input name="Fname" value={user.Fname} onChange={handleChange} required className="p-2 border border-black rounded-md w-full" /></div>
              <div><label>Middle Name</label><input name="Mname" value={user.Mname} onChange={handleChange} className="p-2 border border-black rounded-md w-full" /></div>
              <div><label>Last Name *</label><input name="Lname" value={user.Lname} onChange={handleChange} required className="p-2 border border-black rounded-md w-full" /></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><label>Email *</label><input type="email" name="email" value={user.email} onChange={handleChange} required className="p-2 border border-black rounded-md w-full" /></div>
              <div><label>Phone *</label><input type="tel" name="phno" value={user.phno} onChange={handleChange} required className="p-2 border border-black rounded-md w-full" /></div>
              <div>
                <label>Blood Group</label>
                <select name="bg" value={user.bg} onChange={handleChange} className="p-2 border border-black rounded-md w-full">
                  <option value="">Select</option>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                  <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><label>Date of Birth *</label><input type="date" name="dob" value={user.dob} onChange={handleChange} required className="p-2 rounded-md w-full" /></div>
              <div><label>Gender *</label>
                <select name="gender" value={user.gender} onChange={handleChange} required className="p-2 rounded-md w-full">
                  <option value="">Choose</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                </select>
              </div>
              <div><label>Marital Status *</label>
                <select name="marrital" value={user.marrital} onChange={handleChange} required className="p-2 rounded-md w-full">
                  <option value="">Select</option><option value="Single">Single</option><option value="Married">Married</option>
                  <option value="Divorced">Divorced</option><option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>

            {/* Temporary Address */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Temporary Address *</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <input name="TempState" value={user.TempState} onChange={handleChange} placeholder="State" required className="p-2 border border-black rounded-md" />
                <input name="TempDist" value={user.TempDist} onChange={handleChange} placeholder="District" required className="p-2 border border-black rounded-md" />
                <input name="TempMun" value={user.TempMun} onChange={handleChange} placeholder="Sub/Metropolitan" required className="p-2 border border-black rounded-md" />
                <input name="TempAddress" value={user.TempAddress} onChange={handleChange} placeholder="Ward No" required className="p-2 border border-black rounded-md" />
                <input name="TempTol" value={user.TempTol} onChange={handleChange} placeholder="Tol" required className="p-2 border border-black rounded-md" />
              </div>
            </section>

            {/* Permanent Address */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Permanent Address *</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <input name="PerState" value={user.PerState} onChange={handleChange} placeholder="State" required className="p-2 border border-black rounded-md" />
                <input name="PerDist" value={user.PerDist} onChange={handleChange} placeholder="District" required className="p-2 border border-black rounded-md" />
                <input name="PerMun" value={user.PerMun} onChange={handleChange} placeholder="Sub/Metropolitan" required className="p-2 border border-black rounded-md" />
                <input name="PerAddress" value={user.PerAddress} onChange={handleChange} placeholder="Ward No" required className="p-2 border border-black rounded-md" />
                <input name="PerTol" value={user.PerTol} onChange={handleChange} placeholder="Tol" required className="p-2 border border-black rounded-md" />
              </div>
            </section>

            {/* Document Information */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Document Information *</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <select name="doctype" value={user.doctype} onChange={handleChange} required className="p-2 rounded-md">
                  <option value="">Select document type</option>
                  <option value="Citizenship">Citizenship</option>
                  <option value="Passport">Passport</option>
                </select>
                <input name="docno" value={user.docno} onChange={handleChange} placeholder="Document no" required className="p-2 border border-black rounded-md" />
                <input name="IssueDistrict" value={user.IssueDistrict} onChange={handleChange} placeholder="Issued district" required className="p-2 border border-black rounded-md" />
                <input type="date" name="IssueDate" value={user.IssueDate} onChange={handleChange} required className="p-2 rounded-md" />
              </div>
              <div>
                <label>Upload Document <span className="text-red-600">*</span></label>
                <input type="file" name="docfile" accept="image/*,application/pdf" onChange={handleFileChange} required />
                {user.docfile && <div className="text-xs mt-1">{user.docfile.name}</div>}
              </div>
            </section>

            {/* Family Details */}
            <section className="space-y-3">
              <h3 className="text-md font-medium dark:text-white">Family Details *</h3>
              
              {/* Spouse */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <input name="Huswifname" value={user.Huswifname} onChange={handleChange} placeholder="Husband/Wife Name" className="p-2 border border-black rounded-md" />
                <input name="famphno" value={user.famphno} onChange={handleChange} placeholder="Phone" className="p-2 border border-black rounded-md" />
                <input type="file" name="famdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                {user.famdocfile && <div className="text-xs mt-1">{user.famdocfile.name}</div>}
              </div>

              {/* Mother */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <input name="mothname" value={user.mothname} onChange={handleChange} placeholder="Mother Name" className="p-2 border border-black rounded-md" />
                <input name="mothphno" value={user.mothphno} onChange={handleChange} placeholder="Phone" className="p-2 border border-black rounded-md" />
                <input type="file" name="mothdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                {user.mothdocfile && <div className="text-xs mt-1">{user.mothdocfile.name}</div>}
              </div>

              {/* Father */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <input name="fathname" value={user.fathname} onChange={handleChange} placeholder="Father Name" required className="p-2 border border-black rounded-md" />
                <input name="fathphno" value={user.fathphno} onChange={handleChange} placeholder="Phone" className="p-2 border border-black rounded-md" />
                <input type="file" name="fathdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                {user.fathdocfile && <div className="text-xs mt-1">{user.fathdocfile.name}</div>}
              </div>

              {/* Grandfather */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <input name="grandfathname" value={user.grandfathname} onChange={handleChange} placeholder="Grandfather Name" required className="p-2 border border-black rounded-md" />
                <input name="grandfathno" value={user.grandfathno} onChange={handleChange} placeholder="Phone" className="p-2 border border-black rounded-md" />
                <input type="file" name="grandfathdocfile" onChange={handleFileChange} accept="image/*,application/pdf" />
                {user.grandfathdocfile && <div className="text-xs mt-1">{user.grandfathdocfile.name}</div>}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-md font-medium dark:text-white">Educational Details *</h3>
              <select name="edu" value={user.edu} onChange={handleChange} required className="p-2 rounded-md w-full mt-2">
                <option value="">Select highest qualification</option>
                <option>No formal education</option>
                <option>Grade 5</option>
                <option>Grade 8</option>
                <option>SLC</option>
                <option>+2</option>
                <option>Bachelor</option>
                <option>Master</option>
              </select>
            </section>

            {/* Terms */}
            <div className="flex items-start gap-3 mt-4">
              <input id="terms" name="termsaggree" type="checkbox" checked={user.termsaggree} onChange={handleChange} required />
              <label htmlFor="terms" className="text-sm">I agree to the terms and conditions.</label>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60">
                {submitting ? "Submitting..." : "Register New Admission"}
              </button>
            </div>
          </div>

          {/* Right aside for photo preview */}
          <aside className="md:col-span-4 space-y-6">
            <div className="sticky top-6">
              <div className="flex flex-col items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
                  <img src={temppicUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="preview" className="w-full h-full object-cover" />
                </div>
                <div className="w-full text-center">
                  <label>Upload Profile Photo</label>
                  <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
