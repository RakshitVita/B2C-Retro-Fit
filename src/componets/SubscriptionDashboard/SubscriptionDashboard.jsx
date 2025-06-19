import React, { useEffect, useState } from "react";
import "./SubscriptionDashboard.css";
import useAuthStore from "../../../Zustand_State/AuthStore";
import useUserStore from "../../../Zustand_State/UserStore";
import CircularProgress from "../../ReusableComponents/CircularProgress/CircularProgress";

const SubscriptionDashboard = () => {

  const [selectedLang, setSelectedLang] = useState(null);
  const [loaderKey, setLoaderKey] = useState(0);

  const { authUser } = useAuthStore();
  const { usageDetail, Languages } = useUserStore();

  useEffect(() => {
    usageDetail();
  }, [usageDetail]);


const handleSelectLang = (langId) => {
  setSelectedLang((prev) => (prev === langId ? null : langId));
  setLoaderKey(Date.now()); // trigger re-render of loader
};

  let percent=0;

  if(Languages){

  const currentLang = Languages.find((lang) => lang.id === selectedLang);
  const firstMetric = currentLang?.metric?.[0];
  percent = firstMetric?.used && firstMetric?.purchased
    ? Math.round((firstMetric.used / firstMetric.purchased) * 100)
    : 0;
  }



  return (
    <div className="container">
      <div className="profile-card">
        {authUser && authUser.picture && (
          <>
            <img src={authUser.picture || "../public/assets/noProfirle.svg"} alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <div className="profile-name">{authUser.name}</div>
              <div className="profile-email">{authUser.email}</div>
            </div>
          </>
        )
        }



      </div>

      <h1 className="title">
        <img className="subscriptionimg" src="/assets/Subscription.png" alt="" />
        Subscription Usage Overview
      </h1>

      <div className="language-grid">
        {Languages && Languages.map((lang) => (
          <div
            key={lang.id}
            className="language-card"
            onClick={() => handleSelectLang(lang.id)}
          >
            {lang.icon} {lang.name}
          </div>
        ))}
      </div>


      {Languages && Languages
        .filter((lang) => lang.id === selectedLang && lang.metric)
        .map((lang) => (
          <div key={lang.id} className="subscription-card">
            <div className="subscription-header">{lang.icon} {lang.name} Subscription</div>
            <div className="metrics-row">
              {lang.metric.map((metric, idx) => {
                return (
                  <div className="metric-box" key={idx}>
                    <div className="metric-title">{metric.title}</div>
                    <div className="metric-values">
                      <div className="value-item">
                        <div className="value-number">{metric.purchased ?? "N/A"}</div>
                        <div className="value-label">Purchased</div>
                      </div>
                      <div className="value-item">
                        <div className={`value-number ${metric.used ? "used" : "na"}`}>
                          {metric.used ?? "N/A"}
                        </div>
                        <div className="value-label">Used</div>
                      </div>
                      <div className="value-item">
                        <div className={`value-number ${metric.remaining ? "remaining" : "na"}`}>
                          {metric.remaining ?? "N/A"}
                        </div>
                        <div className="value-label">Remaining</div>
                      </div>
                    </div>
                    {metric.used !== null && (
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${percent}%` }}
                        >
                          {percent}% Used
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
              <div class='metric-box-extra'>
                <CircularProgress  key={loaderKey} percent={70} />
              </div>
            </div>

          </div>
        ))}

      <div className="summary">
        <h2>📋 Quick Summary</h2>
        <div className="summary-grid">
          {Languages && Languages.map((lang) => (
            <div className="summary-item" key={lang.id}>
              <div className="summary-value">{lang.usage}%</div>
              <div className="summary-label">{lang.name} Usage</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
