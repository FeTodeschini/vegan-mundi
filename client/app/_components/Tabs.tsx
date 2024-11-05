import { ReactElement, ReactNode, useState } from 'react';
import Tab, { TabProps } from './Tab';
import "@/_styles/tabs.css";

interface TabsProps {
    children: ReactElement<TabProps>[];
}

export default function Tabs({ children }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="tabs-container">
            <div className="tabs">
                {children!.map((tab, index) => (
                    <button
                        key={index}
                        className={`regular-text tab-button ${activeTab === index ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.props.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {children![activeTab]}
            </div>
        </div>
    );
}
