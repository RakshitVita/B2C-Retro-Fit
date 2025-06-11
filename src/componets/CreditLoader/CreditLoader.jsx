import React from 'react'
import useUserStore from '../../../Zustand_State/UserStore';
import "./CreditLoader.css";

const CreditLoader = () => {
    const { credit_remaining, credit_usage } = useUserStore();
    const isDataAvailable = credit_remaining && credit_usage;

    return (
        <div className="progress-container">
            {isDataAvailable ? (
                Object.keys(credit_remaining).map((lang) => {
                    const used = credit_usage[lang]?.files || 0;
                    const total = credit_remaining[lang]?.files || 1;
                    const percentage = (used / total) * 100;

                    return (
                        <div className="progress-row" key={lang}>
                            <div className="language-name">{lang}</div>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <div className="progress-count">{used} / {total}</div>
                        </div>
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CreditLoader

