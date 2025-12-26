import { useEffect, useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export default function ViewReport() {
  const navigate = useNavigate();
  const { id } = useParams(); // MUST come from route /Viewreport/:id

  const [test, setTest] = useState(null);
  const [report, setReport] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------------------
  // FETCH BACKEND DATA
  // -----------------------------------------
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [testsRes, reportRes, winnerRes] = await Promise.all([
          fetch("/api/tests"),
          fetch(`/api/reports/${id}`),
          fetch(`/api/winner/${id}`)
        ]);

        const tests = await testsRes.json();
        const reportData = await reportRes.json();
        const winnerData = await winnerRes.json();

        const currentTest = tests.find(t => t.id === id);

        setTest(currentTest);
        setReport(reportData);
        setWinner(winnerData);
      } catch (err) {
        console.error("❌ Failed to load report", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // -----------------------------------------
  // LOADING STATE
  // -----------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96 text-gray-500 font-bold">
          Loading test report...
        </div>
      </div>
    );
  }

  if (!test || !report || !winner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96 text-red-500 font-bold">
          Report not found
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // BACKEND-DERIVED METRICS
  // -----------------------------------------
  const A = report.A;
  const B = report.B;

  const uplift = A.conversionRate > 0
    ? (((B.conversionRate - A.conversionRate) / A.conversionRate) * 100).toFixed(1)
    : "0.0";

  const chartData = [
    { name: "Variant A", rate: A.conversionRate },
    { name: "Variant B", rate: B.conversionRate }
  ];

  // -----------------------------------------
  // UI
  // -----------------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{test.testName}</h1>
            <p className="text-sm text-gray-600">
              Started {new Date(test.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card title="Winner" value={`Variant ${winner.winner}`} extra={`+${uplift}% lift`} />
          <Card title="Confidence" value={`${winner.confidence}%`} />
          <Card title="Total Visitors" value={test.visitors} />
        </div>

        {/* Chart */}
        <div className="bg-white border rounded p-6 mb-6">
          <h3 className="font-semibold mb-4">Conversion Rate Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Variant Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <VariantBlock
            name="Variant A"
            views={A.views}
            conversions={A.conversions}
            rate={A.conversionRate}
          />
          <VariantBlock
            name="Variant B"
            views={B.views}
            conversions={B.conversions}
            rate={B.conversionRate}
            winner={winner.winner === "B"}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/Pagename")}
            className="flex items-center gap-2 px-4 py-2 border rounded"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Implement Winner
            </button>
          </div>
        </div>
      </main>
        <Footer />
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function Card({ title, value, extra }) {
  return (
    <div className="bg-white border rounded p-5">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      {extra && <div className="text-green-600 text-sm">{extra}</div>}
    </div>
      
  );
}
  
function VariantBlock({ name, views, conversions, rate, winner }) {
  return (
    <div className="bg-white border rounded p-6">
      <h3 className="font-semibold mb-4">
        {name} {winner && <span className="text-green-600">(Winner)</span>}
      </h3>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div><div>Views</div><strong>{views}</strong></div>
        <div><div>Conversions</div><strong>{conversions}</strong></div>
        <div><div>Rate</div><strong>{rate.toFixed(2)}%</strong></div>
          
      </div>
    </div>
      
  );
}
