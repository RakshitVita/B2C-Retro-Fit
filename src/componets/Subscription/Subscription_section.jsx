import React, { useState } from 'react';
import './Subscription_section.scss';

//multiple plan cards objects
const plans = [
  {
    name: 'Intro',
    monthlyPrice: 20,
    yearlyPrice: 200,
    features: [
      'All limited links',
      'Own analytics platform',
      'Chat support',
      'Optimize hashtags',
      'Unlimited users',
    ],
  },
  {
    name: 'Base',
    monthlyPrice: 50,
    yearlyPrice: 500,
    features: [
      'All limited links',
      'Own analytics platform',
      'Chat support',
      'Optimize hashtags',
      'Unlimited users',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 100,
    yearlyPrice: 1000,
    features: [
      'All limited links',
      'Own analytics platform',
      'Chat support',
      'Optimize hashtags',
      'Unlimited users',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 200,
    yearlyPrice: 2000,
    features: [
      'All limited links',
      'Own analytics platform',
      'Chat support',
      'Optimize hashtags',
      'Unlimited users',
    ],
  },
];

const SubscriptionSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activePlan, setActivePlan] = useState('Pro');

  const getPrice = (plan) => billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;  //returns price according monthly or yearly

  return (
    <div className="subscription-container">
      <h2>Simple, transparent pricing</h2>
      <p>No contracts. No surprise fees.</p>
      
      <div className="toggle-switch">
        <button 
          className={billingCycle === 'monthly' ? 'active' : ''}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button 
          className={billingCycle === 'yearly' ? 'active' : ''}
          onClick={() => setBillingCycle('yearly')}
        >
          Yearly
        </button>
      </div>

      <div className="card-wrapper">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${plan.name === activePlan ? 'active' : ''} ${plan.mostPopular ? 'most-popular' : ''}`}
            onClick={() => setActivePlan(plan.name)}
          >
            {plan.mostPopular && <div className="badge">MOST POPULAR</div>}
            <h3>${getPrice(plan)} <span>/ {billingCycle}</span></h3>
            <h4>{plan.name}</h4>
            <p>For most businesses that want to optimize web queries</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <button className="choose-btn">Choose plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSection;
