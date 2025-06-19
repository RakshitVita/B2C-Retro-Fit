// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import TechnologyCard from './TechnologyCard';
import useAuthStore from '../../../Zustand_State/AuthStore';
import useUserStore from '../../../Zustand_State/UserStore';
import { RiLoader2Line } from 'react-icons/ri';


const Dashboard = () => {
    const [animationTriggered, setAnimationTriggered] = useState(false);

    // const userData = {
    //     profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    //     fullName: "John Anderson",
    //     email: "john.anderson@company.com"
    // };

    const{authUser}=useAuthStore();
      const { usageDetail, Languages ,isLoaSubscriction} = useUserStore();

  useEffect(() => {
    usageDetail();
  }, [usageDetail]);

  const usageData=Languages||[];

    // const usageData = [
    //     {
    //         icon: "🐍",
    //         id: "python",
    //         metric: [
    //             { purchased: 1000, remaining: 932, title: "Line of Code", used: 68 },
    //             { purchased: 5, remaining: 4, title: "Number of Files", used: 1 }
    //         ],
    //         name: "Python",
    //         usage: 14.705882352941176
    //     },
    //     {
    //         icon: "🧬",
    //         id: "informatica mapping",
    //         metric: [
    //             { purchased: 5, remaining: 5, title: "Code Unit", used: 0 }
    //         ],
    //         name: "Informatica Mapping",
    //         usage: 0
    //     },
    //     {
    //         icon: "🧬",
    //         id: "informatica workflow",
    //         metric: [
    //             { purchased: 5, remaining: 5, title: "Code Unit", used: 0 }
    //         ],
    //         name: "Informatica Workflow",
    //         usage: 0
    //     },
    //     {
    //         icon: "📊",
    //         id: "alteryx",
    //         metric: [
    //             { purchased: 5, remaining: 4, title: "Number of Files", used: 1 }
    //         ],
    //         name: "Alteryx",
    //         usage: 5.0
    //     },
    //     {
    //         icon: "📈",
    //         id: "overall_data",
    //         metric: [
    //             { purchased: 20, remaining: 18, title: "Overall Data", used: 2 }
    //         ],
    //         name: "Overall Data",
    //         usage: 10
    //     }
    // ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationTriggered(true);
        }, 700);
        return () => clearTimeout(timer);
    }, []);

      if ( isLoaSubscriction) {
        return (
          <div className="loader-fullscreen">
            <RiLoader2Line className="loader-icon" />
            <p>Loading...</p>
          </div>
        );
      }

    return (
        <div className="dashboard-container">
            {authUser && authUser.picture &&(
                <>
                            {/* Header */}
            <div className="dashboard-header">
                <div className="user-profile">
                    <img src={authUser.picture} alt="Profile" className="profile-picture" />
                    <div className="user-info">
                        <h1 className="user-name">{authUser.name}</h1>
                        <p className="user-email">{authUser.email}</p>
                    </div>
                </div>
                <div className="dashboard-title">
                    <h2>Usage Dashboard</h2>
                    <p>Monitor your technology usage and resource allocation</p>
                </div>
            </div>
                </>
            )}


            {/* Technology Grid */}
            <div className="technologies-grid">
                {usageData.map((tech, index) => (
                    <TechnologyCard
                        key={tech.id}
                        tech={tech}
                        index={index}
                        animationTriggered={animationTriggered}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
