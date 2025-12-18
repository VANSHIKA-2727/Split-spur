import { useEffect, useState } from 'react';
import { TrendingUp, ArrowLeft, Share2 } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from "react-router-dom";

export default function SplitsurDashboard() {
  const navigate = useNavigate();
  const { id } = useParams(); // test id from route
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------------------
  // FETCH TEST
  // -----------------------------------------
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await fetch(`/api/tests/${id}`);
        const data = await res.json();
        setTest(data);
      } catch (err) {
        console.error("Failed to load test", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [id]);

  if (loading || !test) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center h-96 text-gray-500 font-bold">
        Loading test report...
      </div>
    </div>
  );
}


  // -----------------------------------------
  // DERIVED METRICS (TEMP)
  // -----------------------------------------
  const totalVisitors = test.visitors || 0;
  const variantAVisitors = Math.floor(totalVisitors / 2);
  const variantBVisitors = totalVisitors - variantAVisitors;

  const variantAConversions = Math.floor(variantAVisitors * 0.036);
  const variantBConversions = Math.floor(variantBVisitors * 0.042);

  const rateA = ((variantAConversions / variantAVisitors) * 100).toFixed(1);
  const rateB = ((variantBConversions / variantBVisitors) * 100).toFixed(1);

  const uplift = (((rateB - rateA) / rateA) * 100).toFixed(1);
  const confidence = 75;

  const conversionData = [
    { date: 'Week 1', variantA: 3.2, variantB: 3.6 },
    { date: 'Week 2', variantA: 3.4, variantB: 3.8 },
    { date: 'Week 3', variantA: 3.5, variantB: 4.0 },
    { date: 'Week 4', variantA: 3.6, variantB: 4.2 },
  ];

  const deviceData = [
    { device: 'Mobile', variantB: 4.1, variantA: 3.5 },
    { device: 'Desktop', variantB: 4.6, variantA: 3.9 },
    { device: 'Tablet', variantB: 3.9, variantA: 3.3 },
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
            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
              Test Completed
            </span>
          </div>
        </div>

        {/* Winner Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card title="Winner" value="Variant B" extra={`+${uplift}% lift`} />
          <Card title="Confidence" value={`${confidence}%`} />
          <Card title="Total Visitors" value={totalVisitors} />
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h3 className="font-semibold mb-4">Conversion Rate Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="variantB" stroke="#10b981" name="Variant B" />
              <Line dataKey="variantA" stroke="#6b7280" name="Control" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <VariantBlock
            name="Control (Variant A)"
            visitors={variantAVisitors}
            conversions={variantAConversions}
            rate={rateA}
          />
          <VariantBlock
            name="Winner (Variant B)"
            visitors={variantBVisitors}
            conversions={variantBConversions}
            rate={rateB}
            winner
          />
        </div>

        {/* Device Chart */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h3 className="font-semibold mb-4">Performance by Device</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deviceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="variantB" fill="#10b981" />
              <Bar dataKey="variantA" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
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

function VariantBlock({ name, visitors, conversions, rate, winner }) {
  return (
    <div className="bg-white border rounded p-6">
      <h3 className="font-semibold mb-4">
        {name} {winner && <span className="text-green-600">(Winner)</span>}
      </h3>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div><div>Visitors</div><strong>{visitors}</strong></div>
        <div><div>Conversions</div><strong>{conversions}</strong></div>
        <div><div>Rate</div><strong>{rate}%</strong></div>
      </div>
    </div>
  );
}
