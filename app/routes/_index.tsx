
export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 p-4 " style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h1 className="text-4xl font-bold mb-5">Home</h1>
      <a href="/login" target="_blank" className="text-blue-500 underline"> Go to Login Page</a>

    </div>
  );
}
