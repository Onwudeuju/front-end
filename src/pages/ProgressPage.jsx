// pages/ProgressPage.js
import React, { useEffect, useState } from "react";
import ladda from "../assets/amico.png";
import { useNavigate, useParams } from "react-router-dom";

const ProgressPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState([]);
  const [newProgress, setNewProgress] = useState("");
  // This is fetching tht particular goal by Id
  const fetchThatParticularGoalById = async () => {
    try {
      const fetchEachGoal = await fetch(
        `https://goal-backend-v8uh.onrender.com/api/goals/${id}`
      );
      if (fetchEachGoal.ok) {
        const fetchedGoal = await fetchEachGoal.json();
        setGoal(fetchedGoal);
        setNewProgress(fetchedGoal.progress);
      } else {
        console.error("Goal not Found");
      }
    } catch (error) {
      console.log("Error Fetching Goal", error);
    }
  };
  useEffect(() => {
    fetchThatParticularGoalById();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const patchedGoal = await fetch(
        `https://goal-backend-v8uh.onrender.com/api/goals/${id}/progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progress: Number(newProgress) }),
        }
      );
      if (patchedGoal.ok) {
        navigate("/allgoals");
      } else {
        console.error("Failed to update Progress");
      }
    } catch (error) {
      console.error("Error updating Progress", error);
    }
  };

  return (
    <div className="newgoal my-[48px] mx-[100px] flex items-start gap-5">
      <form className="new-forms text-left">
        <h2 className="font-bold text-4xl text-black m-0">Progress</h2>

        <div className="uper-form mt-6">
          <div className="goal-t mb-4">
            <h4 className="text-base font-normal text-black/70 break-words">
              {goal.title}
            </h4>
            <p className="text-base font-semibold text-black">
              Landing Page Design
            </p>
          </div>

          <div className="goal-d">
            <h4 className="text-base font-normal text-black/70">
              Goal Description
            </h4>
            <p className="text-base font-normal text-black leading-[19.5px] break-words">
              {goal.description}
            </p>
          </div>
        </div>

        <div className="lower-form flex flex-col items-start w-[656px] bg-[#0585cd29] p-[60px_50px] gap-[66px]">
          <input
            type="number"
            placeholder="Goal Progress"
            className="w-[329px] px-[10px] py-[15px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70"
            value={newProgress}
            onChange={(event) => {
              const num = Number(event.target.value);
              if (num < 0) {
                setNewProgress(0);
              } else if (num > 100) {
                setNewProgress(100);
              } else {
                setNewProgress(num);
              }
            }}
            min="0"
            max="100"
            required
          />

          <div className="progress w-[368px] flex flex-col items-start gap-3">
            <div className="progress-text flex items-start gap-[265px]">
              <p className="m-0 text-base font-normal text-black/80">
                Progress
              </p>
              <p className="m-0 text-base font-normal text-black/80">30%</p>
            </div>
            <div className="loader-con bg-[#d9d9d9] w-full h-3 rounded-[10px]">
              <div className="loader-bar h-3 rounded-[10px] w-[30%] bg-red-500/80"></div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#0585cd] px-4 py-4 rounded-[10px] text-white font-semibold text-xl cursor-pointer"
          >
            Update Progress
          </button>
        </div>
      </form>

      <span>
        <img src={ladda} alt="" />
      </span>
    </div>
  );
};
export default ProgressPage;
