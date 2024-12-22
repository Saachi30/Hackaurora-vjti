import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Activity,
  User,
  Calendar,
} from "lucide-react";
import Profile from "../../assets/profile.png";
const Labor = () => {
  const [laborers, setLaborers] = useState([
    {
      id: 1,
      name: "John Smith",
      avatar: Profile,

      tasks: [
        {
          id: 101,
          title: "Warehouse Loading",
          progress: 75,
          deadline: "2024-12-25",
          completed: false,
          paid: false,
        },
        {
          id: 102,
          title: "Inventory Sorting",
          progress: 100,
          deadline: "2024-12-23",
          completed: true,
          paid: false,
        },
      ],
      wage: 150,
      score: 95,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: Profile,
      tasks: [
        {
          id: 201,
          title: "Package Inspection",
          progress: 25,
          deadline: "2024-12-26",
          completed: false,
          paid: false,
        },
      ],
      wage: 120,
      score: 88,
    },
    {
      id: 3,
      name: "Chandler Bing",
      avatar: Profile,
      tasks: [
        {
          id: 202,
          title: "Package Inspection",
          progress: 5,
          deadline: "2024-12-26",
          completed: false,
          paid: false,
        },
      ],
      wage: 110,
      score: 88,
    },
  ]);

  const [userLaborScore, setUserLaborScore] = useState(75);

  const handlePayment = async (laborerId, taskId) => {
    try {
      // Simulate API call for payment
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLaborers((prevLaborers) =>
        prevLaborers.map((laborer) => {
          if (laborer.id === laborerId) {
            return {
              ...laborer,
              tasks: laborer.tasks.map((task) =>
                task.id === taskId ? { ...task, paid: true } : task
              ),
            };
          }
          return laborer;
        })
      );

      alert("Payment successful!");
    } catch (error) {
      alert("Payment failed. Please try again.");
    }
  };

  // Check for unpaid completed tasks and deduct score
  useEffect(() => {
    const checkUnpaidTasks = () => {
      let deduction = 0;

      laborers.forEach((laborer) => {
        laborer.tasks.forEach((task) => {
          if (task.completed && !task.paid) {
            deduction += 2; // Deduct 2 points per unpaid completed task
          }
        });
      });

      if (deduction > 0) {
        setUserLaborScore((prevScore) => Math.max(0, prevScore - deduction));
      }
    };

    const interval = setInterval(checkUnpaidTasks, 24 * 60 * 60 * 1000); // Check daily
    return () => clearInterval(interval);
  }, [laborers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Labor Management
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor tasks and manage payments
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Labor Score:</span>
            <span
              className={`font-bold ${
                userLaborScore < 70 ? "text-red-500" : "text-green-500"
              }`}
            >
              {userLaborScore}
            </span>
          </div>
        </div>

        {/* Laborers Grid */}
        <div className="grid gap-6">
          {laborers.map((laborer) => (
            <motion.div
              key={laborer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Laborer Header */}
              <div className="p-6 flex items-start justify-between border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <img
                    src={laborer.avatar}
                    alt={laborer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {laborer.name}
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>Worker ID: {laborer.id}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-blue-700 font-medium">
                    Wage Rate: ${laborer.wage}/day
                  </span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="p-6">
                {laborer.tasks.map((task) => (
                  <div key={task.id} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                      
                        <h3 className="font-medium text-gray-800">
                        ➤ {task.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Due: {task.deadline}</span>
                          </div>
                          <div className="flex items-center">
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                              <Clock
                                className={`w-4 h-4 mr-1 ${
                                  task.progress > 80
                                    ? "text-green-600"
                                    : task.progress < 10
                                    ? "text-red-600"
                                    : task.progress < 30
                                    ? "text-yellow-400"
                                    : "text-blue-600"
                                }`}
                              />
                            )}

                            <span>
                              {task.completed ? "Completed" : "In Progress"}
                            </span>
                          </div>
                        </div>
                      </div>
                      {task.completed && !task.paid && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePayment(laborer.id, task.id)}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          Pay Now
                        </motion.button>
                      )}
                      {task.paid && (
                        <span className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                          Paid
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          task.progress > 80
                            ? "bg-green-600/90"
                            : task.progress < 10
                            ? "bg-red-600/40"
                            : task.progress < 30
                            ? "bg-yellow-400/60"
                            : "bg-blue-600/70"
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-700">
                        {task.progress}%
                      </span>
                    </div>
 {/* Divider Line */}

        {/* <hr className="border-t border-gray-300 mt-4" /> */}
      
                    {/* Warning for Unpaid Completed Task */}
                    {task.completed && !task.paid && (
                      <div className="mt-2 flex items-center text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>
                          Payment pending - Your labor score will be affected
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Labor;
