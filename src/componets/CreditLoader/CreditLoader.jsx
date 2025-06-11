import React from 'react'
import useUserStore from '../../../Zustand_State/UserStore';
import "./CreditLoader.css";

const CreditLoader = () => {
    const { credit_remaining, credit_usage } = useUserStore();
    const isDataAvailable = credit_remaining && Object.keys(credit_remaining).length > 0 && credit_usage;

    return (
        <div className="progress-container">
            {isDataAvailable ? (
                Object.keys(credit_remaining).map((lang) => {
                    const usedFiles = credit_usage[lang]?.files || 0;
                    const totalFiles = credit_remaining[lang]?.files || 1;
                    const usedCredit = credit_usage[lang]?.credit || 0;
                    const totalCredit = credit_remaining[lang]?.credit || 1;
                    const filesPercentage = (usedFiles / totalFiles) * 100;

                    return (
                        <div className="progress-row" key={lang}>
                            <div className="language-name">{lang}</div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${filesPercentage}%` }}
                                    title={`Files: ${usedFiles}/${totalFiles}`}
                                ></div>
                                <span className="files-count">{usedFiles} / {totalFiles}</span>
                            </div>
                            <div className="progress-count">
                                <span title="Credit">{usedCredit} / {totalCredit} credit</span>
                            </div>
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

