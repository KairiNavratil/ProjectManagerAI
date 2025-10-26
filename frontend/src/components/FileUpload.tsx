import { useState } from "react";

interface FileUploadProps {
  uploadUrl: string;
  projectName: string;
  description: string;
  progress: number;
  teamSize: number;
}

export default function FileUpload({
  uploadUrl,
  projectName,
  description,
  progress,
  teamSize,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      // 1️⃣ Create the project
      const createProjectRes = await fetch(
        `https://ybxymtsxfobgxnqskxok.supabase.co/functions/v1/addProject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: projectName,
            description: description,
            progress: progress,
            teamSize: teamSize,
          }),
        }
      );

      if (!createProjectRes.ok) throw new Error("Failed to create project");

      // 2️⃣ Get the project ID
      const getProjectRes = await fetch(
        `https://ybxymtsxfobgxnqskxok.supabase.co/functions/v1/getProjectId?name=${projectName}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!getProjectRes.ok) throw new Error("Failed to get project ID");

      const projectData = await getProjectRes.json();
      const projectId = projectData.id;

      if (!projectId) throw new Error("Project ID not found");

      console.log(projectId);

      // 3️⃣ Upload the file
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch(`${uploadUrl}?project_id=${projectId}`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadRes.ok) {
          setMessage("Project created and file uploaded successfully!");
        } else {
          setMessage(
            `File upload failed: ${
              uploadData.error || JSON.stringify(uploadData)
            }`
          );
        }
      } else {
        setMessage("Project created, no file uploaded.");
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message || err}`);
      console.error(err);
    }
  };

 return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Upload Project File</h2>

      <div className="mb-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        {/* {file && (
          <p className="mt-2 text-gray-700 text-sm">Selected file: {file.name}</p>
        )} */}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file}
        className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
          file 
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {"Upload File"}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}

